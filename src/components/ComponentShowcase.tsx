import { useState, useEffect } from 'react';
import { Sun, Shield, Terminal, ArrowUpRight, CheckCircle2, Play, RefreshCw, Layers } from 'lucide-react';

export default function ComponentShowcase() {
  const [metricType, setMetricType] = useState<'uptime' | 'requests'>('uptime');
  const [simState, setSimState] = useState<'idle' | 'building' | 'deploying' | 'complete'>('idle');
  const [simLogs, setSimLogs] = useState<string[]>(["[core] Node initialized on cove-platform-a."]);

  // Handle mock log streams
  const triggerSimulation = () => {
    if (simState !== 'idle') return;
    
    setSimState('building');
    setSimLogs(prev => [...prev, "[build] Packaging asset bundles with esbuild...", "[build] Transpiling types with tsx..."]);
    
    setTimeout(() => {
      setSimState('deploying');
      setSimLogs(prev => [...prev, "[network] Routing safe sand traffic path to Port 3000.", "[auth] Verifying SHA certification with security boundaries..."]);
      
      setTimeout(() => {
        setSimState('complete');
        setSimLogs(prev => [...prev, "[tidal-engine] Successfully shored up deployment! Live container online.", "[system] Health check verification: 200 OK."]);
      }, 1500);
    }, 1500);
  };

  const resetSimulation = () => {
    setSimState('idle');
    setSimLogs(["[core] Node initialized on cove-platform-a."]);
  };

  // Fake chart points
  const uptimeData = [99.98, 99.99, 99.97, 99.99, 99.98, 99.99, 99.98];
  const requestsData = [45, 78, 62, 110, 95, 142, 118];

  const currentChartPoints = metricType === 'uptime' ? uptimeData : requestsData;
  const maxVal = Math.max(...currentChartPoints);
  const minVal = Math.min(...currentChartPoints);
  const range = maxVal - minVal || 1;

  // Custom SVG path drawing
  const width = 600;
  const height = 180;
  const padding = 20;

  const pointsString = currentChartPoints.map((val, idx) => {
    const x = padding + (idx / (currentChartPoints.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 text-left" id="demo-showcase-section">
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <div>
          <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF6B4A]" />
            Cove Systems Component Showcase
          </h2>
          <p className="text-stone-600 mt-1 max-w-2xl text-sm">
            Watch our design system live. This interactive playground demonstrates how Sol Orange and Ocean Teal coordinate to build robust, highly reassuring developer experiences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Mock Landing Page Component */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FAF6F0] border-2 border-stone-900 rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
            
            {/* Mock Header Menu */}
            <div className="bg-white px-6 py-4 border-b-2 border-stone-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF6B4A] flex items-center justify-center font-bold text-white text-xs border border-stone-950">
                  C
                </span>
                <span className="font-space font-bold text-stone-900 text-sm">cove.io</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
                <span className="hover:text-stone-900 cursor-pointer">Platform</span>
                <span className="hover:text-stone-900 cursor-pointer">Reliability</span>
                <span className="px-2.5 py-1 rounded bg-[#0D9488]/10 text-[#0D9488] font-space text-[10px] uppercase font-bold border border-[#0D9488]/20">
                  99.98% Uptime
                </span>
              </div>
            </div>

            {/* Mock Landing Page Body */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 px-3 py-1 rounded-full">
                  Sol Release v2.4.0
                </span>
                <h3 className="text-3xl font-bold font-space text-stone-900 tracking-tight leading-tight max-w-md">
                  High-speed builds. <br />
                  <span className="text-[#0D9488]">Ocean-consistent Safety.</span>
                </h3>
                <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
                  Stop deploying in fear. Cove organizes your dynamic container clusters, guaranteeing automatic load shoring and elegant resource allocations.
                </p>
              </div>

              {/* Call to action cluster showing button styling */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-5 py-2.5 bg-[#FF6B4A] hover:bg-[#e45331] text-white text-xs font-bold font-space rounded-xl border border-stone-950 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all transform hover:translate-y-[-1px] cursor-pointer inline-flex items-center gap-1">
                  Start Picnic Account <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold font-space rounded-xl border border-stone-300 shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] cursor-pointer">
                  Request Sand Demo
                </button>
              </div>

              {/* Features inline list */}
              <div className="pt-6 border-t border-stone-200/60 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-stone-900 font-space">Tidal Autoscaling</strong>
                    <span className="text-[10px] text-stone-505 block leading-normal">Expand nodes smoothly, like returning sea sands.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-stone-900 font-space">Hearth Fire security</strong>
                    <span className="text-[10px] text-stone-505 block leading-normal">Rest assured inside highly persistent firewalls.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Mock Live Telemetry Center / Deployment Sandbox */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-[#FAF6F0] rounded-3xl p-6 border-2 border-stone-950 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#FF6B4A]" />
                <span className="text-xs font-space font-bold tracking-tight">Deployment Console</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* Custom Interactive SVG Line Chart */}
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-stone-400">
                  {metricType === 'uptime' ? 'Ocean Core Uptime Status' : 'API Request Velocity'}
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setMetricType('uptime')}
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                      metricType === 'uptime' ? 'bg-[#0D9488] text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    Uptime
                  </button>
                  <button
                    onClick={() => setMetricType('requests')}
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                      metricType === 'requests' ? 'bg-[#FF6B4A] text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    Reqs
                  </button>
                </div>
              </div>

              {/* Peak Chart representation */}
              <div className="bg-stone-950 p-2 rounded-xl border border-stone-800 relative h-[180px]">
                <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#262626" strokeDasharray="3" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#262626" strokeDasharray="3" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#262626" strokeDasharray="3" />

                  {/* Draw points */}
                  <polyline
                    fill="none"
                    stroke={metricType === 'uptime' ? '#0D9488' : '#FF6B4A'}
                    strokeWidth="3"
                    points={pointsString}
                  />

                  {/* Draw area gradient underneath */}
                  <polygon
                    fill={metricType === 'uptime' ? 'rgba(13, 148, 136, 0.15)' : 'rgba(255, 107, 74, 0.15)'}
                    points={`20,160 ${pointsString} 580,160`}
                  />

                  {/* Point circles */}
                  {currentChartPoints.map((val, idx) => {
                    const x = padding + (idx / (currentChartPoints.length - 1)) * (width - padding * 2);
                    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={metricType === 'uptime' ? '#2DD4BF' : '#FF886E'}
                        stroke="#1C1917"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>

                {/* Relative stats summary */}
                <div className="absolute bottom-3 left-4 flex gap-4 text-[10px] font-mono">
                  <div>
                    <span className="text-stone-500">PEAK: </span>
                    <span className="text-emerald-400">{maxVal}{metricType === 'uptime' ? '%' : ' req/s'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">AVG: </span>
                    <span className="text-[#FAF6F0]">
                      {(currentChartPoints.reduce((a, b) => a + b, 0) / currentChartPoints.length).toFixed(2)}
                      {metricType === 'uptime' ? '%' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sandbox Simulation */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-stone-400 uppercase">Simulator Logs</span>
                <span className="text-stone-500 text-[10px]">Interactive sand state</span>
              </div>

              {/* Terminal Logs View */}
              <div className="bg-stone-950 border border-stone-850 p-3 rounded-xl h-[120px] overflow-y-auto font-mono text-[10px] text-stone-300 space-y-1.5">
                {simLogs.map((log, i) => (
                  <div key={i} className="flex">
                    <span className="text-stone-600 mr-2 shrink-0 select-none">&gt;</span>
                    <span className={`${log.includes('Successfully') ? 'text-emerald-400 font-semibold' : ''}`}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={triggerSimulation}
                  disabled={simState !== 'idle'}
                  className={`flex-1 py-2 text-xs font-bold font-space rounded-xl border border-stone-950 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    simState === 'idle'
                      ? 'bg-[#FF6B4A] hover:bg-[#e45331] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {simState === 'idle' && "Run Cove Deploy"}
                  {simState === 'building' && "Packaging..."}
                  {simState === 'deploying' && "Routing Safe Ports..."}
                  {simState === 'complete' && "Ready"}
                </button>

                {(simState === 'complete' || simState === 'deploying') && (
                  <button
                    onClick={resetSimulation}
                    className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-950 rounded-xl cursor-pointer"
                    title="Reset Sandbox"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
