import React, { useState, useEffect, useMemo } from 'react';
import './LoadingPage.css';

const PortfolioLoadingPage = ({ duration = 3000, onComplete }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [activeEdges, setActiveEdges] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingAccuracy, setTrainingAccuracy] = useState(0);
  const [validationAccuracy, setValidationAccuracy] = useState(0);
  const [loss, setLoss] = useState(2.5);
  const [loadingText, setLoadingText] = useState('SYSTEM BOOTSTRAP...');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Neural Network Structure Definition (Responsive) ---
  const layers = useMemo(() => {
    if (isMobile) {
      return [
        { id: 'input', nodes: 3, x: 80, label: 'Input' },
        { id: 'hidden', nodes: 4, x: 200, label: 'Hidden' },
        { id: 'output', nodes: 2, x: 320, label: 'Output' }
      ];
    } else {
      return [
        { id: 'input', nodes: 5, x: 100, label: 'Input Layer' },
        { id: 'conv1', nodes: 8, x: 250, label: 'Conv2D' },
        { id: 'relu1', nodes: 8, x: 400, label: 'ReLU' },
        { id: 'pool1', nodes: 6, x: 550, label: 'MaxPool' },
        { id: 'dense', nodes: 4, x: 700, label: 'Dense' },
        { id: 'output', nodes: 2, x: 850, label: 'Output' }
      ];
    }
  }, [isMobile]);

  const loadingSteps = useMemo(() => [
    'INITIATING NEURAL ARCHITECTURE...',
    'LOADING PRE-TRAINED WEIGHTS...',
    'CONFIGURING OPTIMIZATION PIPELINE...',
    'ALLOCATING GPU MEMORY...',
    'CALIBRATING MODEL PARAMETERS...',
    'PREPARING DATA LOADERS...',
    'COMMENCING TRAINING SEQUENCE...',
    'FINALIZING INTERFACE...'
  ], []);

  // --- Node and Edge Generation (Responsive) ---
  const nodes = useMemo(() => {
    const generatedNodes = [];
    const baseY = isMobile ? 150 : 200;
    const nodeSpacing = isMobile ? 30 : 35;
    
    layers.forEach((layer, layerIndex) => {
      const totalHeight = layer.nodes * nodeSpacing;
      const startY = baseY - totalHeight / 2;
      for (let i = 0; i < layer.nodes; i++) {
        generatedNodes.push({
          id: `${layer.id}-${i}`,
          x: layer.x,
          y: startY + i * nodeSpacing,
          layerIndex,
        });
      }
    });
    return generatedNodes;
  }, [layers, isMobile]);

  const edges = useMemo(() => {
    const generatedEdges = [];
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayerNodes = nodes.filter(n => n.layerIndex === i);
      const nextLayerNodes = nodes.filter(n => n.layerIndex === i + 1);
      
      currentLayerNodes.forEach(from => {
        nextLayerNodes.forEach(to => {
          generatedEdges.push({
            id: `${from.id}-${to.id}`, from: from.id, to: to.id,
            x1: from.x, y1: from.y, x2: to.x, y2: to.y,
            sourceLayerIndex: from.layerIndex
          });
        });
      });
    }
    return generatedEdges;
  }, [nodes, layers]);

  // --- Initial Mount Animation ---
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // --- Main Loading Progress Logic ---
  useEffect(() => {
    if (!isMounted) return;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setLoadingProgress(progress);
      
      const epochs = Math.floor((progress / 100) * 50);
      setCurrentEpoch(epochs);
      
      const baseAccuracy = Math.min(0.6 + (progress / 100) * 0.35, 0.95);
      const noise = (Math.random() - 0.5) * 0.05;
      setTrainingAccuracy(Math.max(0, baseAccuracy + noise));
      setValidationAccuracy(Math.max(0, baseAccuracy - 0.05 + noise));
      
      const currentLoss = Math.max(0.1, 2.5 - (progress / 100) * 2.2);
      setLoss(currentLoss);
      
      const stepIndex = Math.floor((progress / 100) * (loadingSteps.length));
      if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setLoadingText("INITIALIZATION COMPLETE. REDIRECTING...");
        if (onComplete) {
          setTimeout(onComplete, 1200);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isMounted, duration, onComplete, loadingSteps]);

  // --- Neural Network Pulse Animation (Responsive timing) ---
  useEffect(() => {
    if (!isMounted) return;

    const triggerPulse = () => {
      const layerDelay = isMobile ? 150 : 250;
      const nodeDelay = isMobile ? 20 : 30;
      const activeDuration = isMobile ? 500 : 700;
      
      layers.forEach((layer, layerIndex) => {
        setTimeout(() => {
          const layerNodes = nodes.filter(n => n.layerIndex === layerIndex);
          
          layerNodes.forEach((node, nodeIndex) => {
            setTimeout(() => {
              setActiveNodes(prev => new Set(prev).add(node.id));
              const outgoingEdges = edges.filter(e => e.from === node.id);
              outgoingEdges.forEach(edge => setActiveEdges(prev => new Set(prev).add(edge.id)));
              
              setTimeout(() => {
                setActiveNodes(prev => {
                  const newSet = new Set(prev); newSet.delete(node.id); return newSet;
                });
                outgoingEdges.forEach(edge => {
                  setActiveEdges(prev => {
                    const newSet = new Set(prev); newSet.delete(edge.id); return newSet;
                  });
                });
              }, activeDuration);
            }, nodeIndex * nodeDelay);
          });
        }, layerIndex * layerDelay);
      });
    };

    triggerPulse();
    
    const pulseInterval = setInterval(triggerPulse, isMobile ? 1800 : 2200);

    return () => clearInterval(pulseInterval);
  }, [isMounted, layers, nodes, edges, isMobile]);

  // Dynamic SVG dimensions based on screen size
  const svgDimensions = useMemo(() => {
    if (isMobile) {
      return { width: 400, height: 300 };
    } else {
      return { width: 1000, height: 400 };
    }
  }, [isMobile]);

  return (
    <div className={`loading-container ${isMounted ? 'mounted' : ''}`}>
      {/* Background Effects */}
      <div className="bg-gradient"></div>
      <div className="bg-grid"></div>
      <div className="bg-pulse"></div>
      
      <div className="content-wrapper">
        {/* Neural Network Visualization */}
        <div className="neural-network-container">
          <svg 
            width={svgDimensions.width} 
            height={svgDimensions.height} 
            className="neural-network-svg"
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Edges */}
            {edges.map(edge => (
              <line
                key={edge.id} 
                x1={edge.x1} 
                y1={edge.y1} 
                x2={edge.x2} 
                y2={edge.y2}
                className={`edge ${activeEdges.has(edge.id) ? 'active' : ''}`}
                style={{
                  opacity: isMounted ? (activeEdges.has(edge.id) ? 1 : 0.3) : 0,
                }}
              />
            ))}
            {/* Nodes */}
            {nodes.map(node => (
              <circle
                key={node.id} 
                cx={node.x} 
                cy={node.y}
                r={activeNodes.has(node.id) ? (isMobile ? '6' : '8') : (isMobile ? '4' : '5')}
                className={`node ${activeNodes.has(node.id) ? 'active' : ''}`}
                style={{ 
                  filter: activeNodes.has(node.id) ? 'url(#glow)' : 'none',
                  opacity: isMounted ? 1 : 0,
                }}
              />
            ))}
            {/* Labels */}
            {layers.map((layer, index) => (
              <text 
                key={layer.id} 
                x={layer.x} 
                y={isMobile ? 270 : 350} 
                textAnchor="middle" 
                className={`layer-label ${isMobile ? 'mobile' : ''}`}
                style={{ 
                  opacity: isMounted ? 1 : 0,
                }}
              >
                {layer.label}
              </text>
            ))}
          </svg>
        </div>

        {/* Loading Progress and Text */}
        <div className={`loading-panel ${isMounted ? 'mounted' : ''}`}>
          <div className="loading-header">
            <span className="loading-text">
              {loadingText}
              <span className="loading-indicator"></span>
            </span>
            <span className="loading-percentage">{loadingProgress.toFixed(1)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
        
        {/* Training Metrics */}
        <div className={`metrics-grid ${isMounted ? 'mounted' : ''}`}>
          <div className="metric-card">
            <div className="metric-value epochs">{currentEpoch}/50</div>
            <div className="metric-label">Epochs</div>
          </div>
          <div className="metric-card">
            <div className="metric-value train-acc">{(trainingAccuracy * 100).toFixed(1)}%</div>
            <div className="metric-label">Train Acc</div>
          </div>
          <div className="metric-card">
            <div className="metric-value val-acc">{(validationAccuracy * 100).toFixed(1)}%</div>
            <div className="metric-label">Val Acc</div>
          </div>
          <div className="metric-card">
            <div className="metric-value loss">{loss.toFixed(3)}</div>
            <div className="metric-label">Loss</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLoadingPage;
