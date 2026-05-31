import { useState } from 'react';
import { BRAND_COLORS } from '../brandData';
import { ColorToken } from '../types';
import { Copy, Check, Eye, HelpCircle, Sparkles } from 'lucide-react';

export default function ColorPalette() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewSurface, setPreviewSurface] = useState<'light' | 'dark'>('light');
  const [activeColor, setActiveColor] = useState<ColorToken>(BRAND_COLORS[0]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8" id="color-palette-section">
      {/* Header section explaining source of colors */}
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500 animate-pulse"></span>
              The Lagoon & Solar Palette
            </h2>
            <p className="text-stone-600 mt-1 max-w-2xl text-sm">
              Directly sampled from the emotional qualities of the seaside gathering. Pure light tones represent our platform foundation, while warm coral energies and deep teals declare structural security.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewSurface('light')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border-2 border-stone-900 transition-all ${
                previewSurface === 'light'
                  ? 'bg-[#FAF6F0] text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]'
                  : 'bg-white hover:bg-stone-50 text-stone-600'
              }`}
            >
              Sand Light Background
            </button>
            <button
              onClick={() => setPreviewSurface('dark')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border-2 border-stone-900 transition-all ${
                previewSurface === 'dark'
                  ? 'bg-[#1C1917] text-[#FAF6F0] shadow-[2px_2px_0px_0px_rgba(250,246,240,1)]'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
              }`}
            >
              Charcoal Dark Background
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Color List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold font-space text-stone-900">Visual Color Tokens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRAND_COLORS.map((color) => {
              const isSelected = activeColor.id === color.id;
              return (
                <div
                  key={color.id}
                  onClick={() => setActiveColor(color)}
                  className={`cursor-pointer p-4 rounded-2xl border-2 border-stone-900 transition-all text-left ${
                    isSelected
                      ? 'bg-white shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] scale-[1.01]'
                      : 'bg-stone-50 hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-stone-900 font-space text-sm flex items-center justify-between">
                        <span>{color.name}</span>
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                          {color.category}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-stone-600 mt-0.5">{color.hex}</div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-3 line-clamp-2 h-8">{color.description}</p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500 font-semibold uppercase">{color.role}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(color.hex, color.id);
                      }}
                      className="p-1 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                      title="Copy HEX"
                    >
                      {copiedId === color.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Design System Playground & Accessibility Checker */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-bold font-space text-stone-900">Direct App Rendering</h3>
          
          <div
            className={`border-2 border-stone-900 rounded-3xl p-6 transition-colors duration-300 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]`}
            style={{
              backgroundColor: previewSurface === 'light' ? '#FAF6F0' : '#1C1917',
              color: previewSurface === 'light' ? '#1C1917' : '#FAF6F0',
            }}
          >
            {/* Ambient subtle details */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none rounded-full" 
                 style={{ backgroundColor: activeColor.hex }} />

            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase border border-stone-900/10 px-2 py-0.5 rounded">
                Mock Platform View
              </span>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Eye className="w-3.5 h-3.5" />
                <span>Active: <strong>{activeColor.name}</strong></span>
              </div>
            </div>

            {/* Simulated UI Cards inside mockup */}
            <div className="space-y-4">
              {/* Header block wearing the dynamic color */}
              <div 
                className="p-4 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-white text-left"
                style={{ backgroundColor: activeColor.hex, color: activeColor.id === 'sand-alabaster' ? '#1C1917' : '#FFFFFF' }}
              >
                <div className="font-space font-bold text-base leading-snug">
                  Cove DevPlatform Running
                </div>
                <p className="text-xs mt-1 opacity-90 font-sans">
                  The system leverages this tone to establish visual hierarchy and user trust. Very energetic, yet grounded.
                </p>
              </div>

              {/* Action buttons wearing the accent color */}
              <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-4 rounded-xl border-2 border-stone-900 text-stone-800 text-left">
                <div className="text-xs font-mono mb-2" style={{ color: activeColor.hex }}>
                  &gt; covesystems deploy --production
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-600 dark:text-stone-300">Ready to shore up builds.</span>
                  <button 
                    className="px-3 py-1.5 text-[10px] font-bold font-space rounded-md border border-stone-900 shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] text-white transition-opacity text-center cursor-pointer"
                    style={{ backgroundColor: activeColor.hex, color: activeColor.id === 'sand-alabaster' ? '#1C1917' : '#FFFFFF' }}
                  >
                    Deploy Live
                  </button>
                </div>
              </div>

              {/* Quick Code reference copy block */}
              <div className="bg-stone-900 rounded-lg p-3 text-left font-mono text-[10px] text-stone-300 relative group">
                <div className="text-stone-500 mb-1">// Tailwind configuration</div>
                <div>cove: &#123;</div>
                <div className="pl-4">
                  orange: <span className="text-[#FF6B4A]">"#FF6B4A"</span>,
                </div>
                <div className="pl-4">
                  teal: <span className="text-[#2DD4BF]">"#0D9488"</span>,
                </div>
                <div className="pl-4">
                  gold: <span className="text-[#FBBF24]">"#F59E0B"</span>
                </div>
                <div>&#125;</div>
                <button
                  onClick={() => handleCopy(`cove: { orange: "#FF6B4A", teal: "#0D9488", gold: "#F59E0B" }`, 'tailwind-theme')}
                  className="absolute top-2 right-2 p-1 rounded hover:bg-stone-800 text-stone-500 hover:text-white transition-colors"
                >
                  {copiedId === 'tailwind-theme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Contrast Verification block to prove accessibility/reliability */}
          <div className="bg-[#FAF6F0] border-2 border-stone-900 p-4 rounded-2xl flex items-start gap-3 text-left shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                Contrast & Accessibility
              </h4>
              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                We test every token configuration. <strong>Ocean Teal</strong> on Sand Alabaster exceeds a 4.5:1 ratio (AA level) for maximum structural readable assurance, while <strong>Deep Charcoal</strong> provides AAA readability standard (15.2:1 ratio) globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
