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

# Init Gemini
genai.configure(api_key=GOOGLE_API_KEY)

# Flask app with CORS for dev and prod
app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://asinraja-portfolio.vercel.app"
])

# Load website text from a file
def load_website_text(path):
    with open(path, "r", encoding="utf-8") as file:
        return file.read()

# Load PDF resume
def extract_resume_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

resume_text = extract_resume_text("Resume.pdf")
website_text = load_website_text("details.txt")

full_text = resume_text + "\n" + website_text

# Chunking
def chunk_text(text, max_len=500):
    return [text[i:i+max_len] for i in range(0, len(text), max_len)]

text_chunks = chunk_text(full_text)

# Generate Gemini embeddings
def get_gemini_embedding(text):
    result = genai.embed_content(
        model="models/embedding-001",
        content=text,
        task_type="RETRIEVAL_DOCUMENT",
        title="Asin Resume Chunk"
    )
    return np.array(result['embedding'], dtype=np.float32)

# Build FAISS index
embeddings = [get_gemini_embedding(chunk) for chunk in text_chunks]
dimension = len(embeddings[0])
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# RAG retrieval
def get_context(question, top_k=3):
    question_embedding = get_gemini_embedding(question)
    distances, indices = index.search(np.array([question_embedding]), top_k)
    return "\n\n".join([text_chunks[i] for i in indices[0]])

# Groq API call
def ask_groq(context, question):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": "You are a chatbot that knows everything about Asin Raja's Resume and website. Keep All messages smaller & Shorter,crisp,Try to answer properly based on users question."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}
        ]
    }
    res = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
    return res.json()["choices"][0]["message"]["content"]

@app.route("/ping", methods=["GET"])
def ping():
    return "pong", 200


# Chat API route
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"reply": "Please enter a question."}), 400

    context = get_context(message)
    answer = ask_groq(context, message)
    return jsonify({"reply": answer})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
