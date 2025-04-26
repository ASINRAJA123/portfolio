from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pdfplumber
import google.generativeai as genai
import faiss
import numpy as np
import requests
from dotenv import load_dotenv

load_dotenv()

# ENV variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Gemini
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://asinraja-portfolio.vercel.app"
])

# Load and process files
def load_text_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

# Combine text
resume_text = extract_text_from_pdf("Resume.pdf")
website_text = load_text_file("details.txt")
combined_text = resume_text + "\n" + website_text

# Chunk text
def chunk_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

text_chunks = chunk_text(combined_text)

# Gemini embeddings
def get_gemini_embedding(text):
    response = genai.embed_content(
        model="models/embedding-001",
        content=text,
        task_type="RETRIEVAL_DOCUMENT",
        title="Asin Raja Resume and Details"
    )
    return np.array(response["embedding"], dtype=np.float32)

# Build FAISS index
embeddings = [get_gemini_embedding(chunk) for chunk in text_chunks]
dimension = embeddings[0].shape[0]
index = faiss.IndexFlatL2(dimension)
index.add(np.vstack(embeddings))

# RAG retrieval
def retrieve_relevant_context(question, top_k=3):
    question_embedding = get_gemini_embedding(question)
    distances, indices = index.search(np.array([question_embedding]), top_k)
    relevant_chunks = [text_chunks[i] for i in indices[0] if i < len(text_chunks)]
    return "\n\n".join(relevant_chunks)

# Groq LLaMA call
def ask_groq(context, question):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a helpful chatbot that knows everything about Asin Raja, "
                    "his resume, and his portfolio details. Answer ONLY based on the provided context. "
                    "If a LinkedIn ID is requested and not found, politely offer any available contact details instead."
                )
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nUser Question: {question}"
            }
        ]
    }
    response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

@app.route("/ping", methods=["GET"])
def ping():
    return "pong", 200

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        message = data.get("message", "")
        if not message.strip():
            return jsonify({"reply": "Please enter a valid question."}), 400
        
        context = retrieve_relevant_context(message)
        if not context.strip():
            return jsonify({"reply": "Sorry, I couldn't find information related to your query."}), 404

        answer = ask_groq(context, message)
        return jsonify({"reply": answer})
    
    except Exception as e:
        return jsonify({"reply": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
