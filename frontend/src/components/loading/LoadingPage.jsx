import React, { useState, useEffect, useMemo } from 'react';

const PortfolioLoadingPage = ({ duration = 5000, onComplete }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [activeEdges, setActiveEdges] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingAccuracy, setTrainingAccuracy] = useState(0);
  const [validationAccuracy, setValidationAccuracy] = useState(0);
  const [loss, setLoss] = useState(2.5);
  const [loadingText, setLoadingText] = useState('SYSTEM BOOTSTRAP...');

  // --- Neural Network Structure Definition (Memoized) ---
  const layers = useMemo(() => [
    { id: 'input', nodes: 5, x: 100, label: 'Input Layer' },
    { id: 'conv1', nodes: 8, x: 250, label: 'Conv2D' },
    { id: 'relu1', nodes: 8, x: 400, label: 'ReLU' },
    { id: 'pool1', nodes: 6, x: 550, label: 'MaxPool' },
    { id: 'dense', nodes: 4, x: 700, label: 'Dense' },
    { id: 'output', nodes: 2, x: 850, label: 'Output' }
  ], []);

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

  // --- Node and Edge Generation (Memoized) ---
  const nodes = useMemo(() => {
    const generatedNodes = [];
    layers.forEach((layer, layerIndex) => {
      const totalHeight = layer.nodes * 35;
      const startY = 200 - totalHeight / 2;
      for (let i = 0; i < layer.nodes; i++) {
        generatedNodes.push({
          id: `${layer.id}-${i}`,
          x: layer.x,
          y: startY + i * 35,
          layerIndex,
        });
      }
    });
    return generatedNodes;
  }, [layers]);

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

  // --- Neural Network Pulse Animation (Starts Immediately with Loading) ---
  useEffect(() => {
    if (!isMounted) return;

    const triggerPulse = () => {
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
              }, 700);
            }, nodeIndex * 30);
          });
        }, layerIndex * 250);
      });
    };

    triggerPulse();
    
    const pulseInterval = setInterval(triggerPulse, 2200);

    return () => clearInterval(pulseInterval);
  }, [isMounted, layers, nodes, edges]);

  return (
    <div 
      className={`min-h-screen bg-black text-gray-300 font-mono flex flex-col items-center justify-center p-4 overflow-hidden relative select-none transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/50"></div>
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <div className="absolute inset-0 z-2 animate-pulse bg-black/10"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        {/* Neural Network Visualization */}
        <div className={`w-full h-[400px] mb-8 flex justify-center items-center`}>
            <svg width="1000" height="400" className="overflow-visible">
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
                  key={edge.id} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
                  stroke={activeEdges.has(edge.id) ? '#06b6d4' : '#1e3a8a'}
                  strokeWidth={activeEdges.has(edge.id) ? '1.5' : '0.5'}
                  className="transition-all duration-300"
                  style={{
                    // The opacity now snaps to its initial value based on isMounted
                    opacity: isMounted ? (activeEdges.has(edge.id) ? 1 : 0.3) : 0,
                  }}
                />
              ))}
              {/* Nodes */}
              {nodes.map(node => (
                <circle
                  key={node.id} cx={node.x} cy={node.y}
                  r={activeNodes.has(node.id) ? '8' : '5'}
                  fill={activeNodes.has(node.id) ? '#06b6d4' : '#312e81'}
                  stroke={activeNodes.has(node.id) ? '#67e8f9' : '#4f46e5'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{ 
                    // The initial scale/opacity transition is removed. Pulsing is handled by the className.
                    filter: activeNodes.has(node.id) ? 'url(#glow)' : 'none',
                    opacity: isMounted ? 1 : 0,
                  }}
                />
              ))}
              {/* Labels */}
              {layers.map((layer, index) => (
                <text 
                  key={layer.id} x={layer.x} y={350} textAnchor="middle" fill="#475569" 
                  className="text-xs font-bold uppercase tracking-wider transition-opacity duration-500"
                  style={{ 
                    // The staggered delay is removed. Opacity is handled by the className and parent container.
                    opacity: isMounted ? 1 : 0,
                  }}
                >
                  {layer.label}
                </text>
              ))}
            </svg>
        </div>

        {/* Loading Progress and Text */}
        <div className={`w-full max-w-2xl bg-black/30 border border-gray-700 rounded-lg p-4 backdrop-blur-sm transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cyan-400 flex items-center">
              {loadingText}
              <span className="animate-ping ml-2 h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
            </span>
            <span className="text-sm font-bold text-cyan-400">{loadingProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full shadow-[0_0_10px_#06b6d4]"
              style={{ width: `${loadingProgress}%`, transition: 'width 0.2s ease-out' }}
            />
          </div>
        </div>
        
        {/* Training Metrics */}
        <div className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-center w-full max-w-4xl transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-black/20 p-3 rounded-md border border-gray-800">
                <div className="text-xl md:text-2xl font-bold text-blue-400">{currentEpoch}/50</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Epochs</div>
            </div>
            <div className="bg-black/20 p-3 rounded-md border border-gray-800">
                <div className="text-xl md:text-2xl font-bold text-green-400">{(trainingAccuracy * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Train Acc</div>
            </div>
            <div className="bg-black/20 p-3 rounded-md border border-gray-800">
                <div className="text-xl md:text-2xl font-bold text-yellow-400">{(validationAccuracy * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Val Acc</div>
            </div>
            <div className="bg-black/20 p-3 rounded-md border border-gray-800">
                <div className="text-xl md:text-2xl font-bold text-red-400">{loss.toFixed(3)}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Loss</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLoadingPage;