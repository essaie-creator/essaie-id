import { useState } from 'react';
import { Type, ArrowUpDown, ChevronRight, Hash } from 'lucide-react';

export default function TypographySpecimen() {
  const [testText, setTestText] = useState("Cove Systems — Software built for the sunshine.");
  const [fontSize, setFontSize] = useState<number>(32);
  const [letterSpacing, setLetterSpacing] = useState<string>("tracking-tight");

  const fontScales = [
    { name: "Display Hero (Space Grotesk)", size: "text-5xl md:text-6xl font-bold font-font-space tracking-tight text-stone-900", cssUnit: "64px / 4rem", usage: "Landing page hero statement" },
    { name: "Heading Primary (Space Grotesk)", size: "text-2xl md:text-3xl font-bold font-font-space tracking-tight text-stone-900", cssUnit: "30px / 1.875rem", usage: "Content section titles" },
    { name: "System Interface Body (Inter)", size: "text-base font-normal font-sans text-stone-700 leading-relaxed", cssUnit: "16px / 1rem", usage: "General reading paragraphs and inputs" },
    { name: "Telemetry Code/Stats (JetBrains Mono)", size: "text-sm font-semibold font-mono text-stone-600", cssUnit: "14px / 0.875rem", usage: "Engine telemetry, code references, unit outputs" }
  ];

  return (
    <div className="space-y-8" id="typography-section">
      {/* Overview Card */}
      <div className="bg-[#FAF6F0] border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
          <Type className="w-5 h-5 text-teal-600" />
          The Typographic Stack
        </h2>
        <p className="text-stone-600 mt-1 max-w-3xl text-sm leading-relaxed">
          Consistent grids rely on clean font pairing. We pair the geometric innovation of <strong>Space Grotesk</strong> with the industrial neutrality of <strong>Inter</strong> and the logical precision of <strong>JetBrains Mono</strong> to deliver software layout layouts that read clearly across mobile, desktop, and terminal screens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Specimen Interactive Renderer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 font-mono">
                <Hash className="w-4 h-4" /> Interactive Tester
              </h3>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                  <span>Size: <strong>{fontSize}px</strong></span>
                  <input
                    type="range"
                    min="16"
                    max="64"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-24 accent-[#FF6B4A]"
                  />
                </div>

                <select
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                  className="px-2 py-1 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                >
                  <option value="tracking-tighter">Tighter (-0.05em)</option>
                  <option value="tracking-tight">Tight (-0.025em)</option>
                  <option value="tracking-normal">Normal (0em)</option>
                  <option value="tracking-wide">Wide (0.025em)</option>
                </select>
              </div>
            </div>

            {/* Custom Text input */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-stone-500">Input Custom Headline to Test Font Specs:</label>
              <input
                type="text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Type anything..."
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-900 text-stone-900 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all font-mono text-sm bg-stone-50/50"
              />
            </div>

            {/* Live specimens preview based on slider */}
            <div className="space-y-6 pt-2 text-left">
              {/* Space Grotesk Row */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-[#FF6B4A] font-bold">
                  <span>Space Grotesk (Display Specimen)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]"></span>
                </div>
                <div 
                  className={`font-font-space font-bold text-stone-900 leading-tight break-words transition-all`}
                  style={{ fontSize: `${fontSize}px`, letterSpacing: letterSpacing === 'tracking-tight' ? '-0.025em' : letterSpacing === 'tracking-tighter' ? '-0.05em' : letterSpacing === 'tracking-wide' ? '0.025em' : '0em' }}
                >
                  {testText}
                </div>
              </div>

              {/* Inter Row */}
              <div className="space-y-1 pt-2 border-t border-stone-50">
                <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-[#0D9488] font-bold">
                  <span>Inter (Body Interface)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>
                </div>
                <div 
                  className={`font-sans font-normal text-stone-700 leading-relaxed break-words`}
                  style={{ fontSize: `${Math.max(14, fontSize - 12)}px`, letterSpacing: 'normal' }}
                >
                  {testText}
                </div>
              </div>

              {/* JetBrains Mono Row */}
              <div className="space-y-1 pt-2 border-t border-stone-50">
                <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-amber-600 font-bold">
                  <span>JetBrains Mono (System Telemetry / Logs)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                </div>
                <div 
                  className={`font-mono text-stone-600 leading-relaxed break-words`}
                  style={{ fontSize: `${Math.max(12, fontSize - 16)}px` }}
                >
                  {testText}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Immutable Font Scale Definitions */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 font-mono text-left">
            Design Hierarchy Guide
          </h3>
          <div className="space-y-4">
            {fontScales.map((scale, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF6F0] p-4 rounded-xl border border-stone-200 text-left space-y-2 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 font-space">{scale.name}</span>
                  <span className="text-[10px] font-mono text-stone-500 font-medium px-2 py-0.5 bg-white rounded border border-stone-150">
                    {scale.cssUnit}
                  </span>
                </div>
                <p className={`${scale.size} overflow-hidden text-ellipsis whitespace-nowrap opacity-90`}>
                  Cove Systems Core Specimen
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 pt-1 border-t border-stone-200/50">
                  <ChevronRight className="w-3 h-3 text-stone-400" />
                  <span>Usage: {scale.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
