import { useState } from 'react';
import { CORE_VALUES, COMP_NAME } from '../brandData';
import { ShieldCheck, Flame, Users, BookOpen, Compass, ExternalLink } from 'lucide-react';

export default function BrandDashboard() {
  const [activeValueId, setActiveValueId] = useState<string | null>(null);

  const iconsMap: Record<string, any> = {
    reliability: ShieldCheck,
    innovation: Flame,
    consistency: Users,
  };

  return (
    <div className="space-y-12 text-left" id="brand-dashboard-section">
      {/* Visual Identity Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-stone-900 bg-gradient-to-br from-[#FFEBE5] via-[#FFF8F3] to-[#E3F5F4] p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)]">
        {/* Abstract sun circle detail */}
        <div className="absolute top-8 right-8 w-16 h-16 md:w-24 md:h-24 rounded-full bg-amber-400 opacity-20 blur-xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-semibold text-amber-800">
            <Compass className="w-3.5 h-3.5" />
            <span>Foundational Identity Hub</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-space text-stone-900 tracking-tight leading-tight">
            Perfecting Software with the Calm of the Shore.
          </h1>

          <p className="text-stone-700 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
            Inspired by the ease, warmth, and reliable consistency of a refreshing seaside beach picnic, <strong className="text-stone-900">{COMP_NAME}</strong> designs digital infrastructure that removes user anxiety. We build products that are bulletproof by design, delightful in performance, and reliable under any tide.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#color-palette-section"
              className="px-5 py-2.5 text-xs font-bold font-space text-[#FAF6F0] bg-stone-900 hover:bg-stone-805 rounded-xl border border-stone-950 shadow-[2px_2px_0px_0px_rgba(255,107,74,1)] transition-all transform hover:translate-y-[-1px] inline-flex items-center gap-2"
            >
              Explore Color Codes
            </a>
            <a
              href="#ai-copywriter-section"
              className="px-5 py-2.5 text-xs font-bold font-space text-stone-800 bg-white hover:bg-stone-50 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all transform hover:translate-y-[-1px] inline-flex items-center gap-2"
            >
              Launch AI Copywriter
            </a>
          </div>
        </div>
      </div>

      {/* Brand Narrative / Beach Picnic Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border-2 border-stone-900 p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 font-mono">
              <BookOpen className="w-4 h-4" />
              <span>Our Creative Genesis</span>
            </div>
            <h2 className="text-2xl font-bold font-space text-stone-900 leading-tight">
              Why a Beach Picnic Represents Software Excellence
            </h2>
            <div className="text-stone-600 text-xs md:text-sm leading-relaxed space-y-4 font-sans">
              <p>
                In the classical tech world, software is frequently styled to look sterile, dark, and hostile—decorated with telemetry meters, cold wireframes, and robotic codes. We believe human tools should celebrate human collaboration.
              </p>
              <p>
                Our founders, <strong>Joe & Serena</strong> (modeled in our corporate avatar systems), realized that a perfect afternoon beach gathering is actually an outstanding system of engineering. A picnic blanket coordinates diverse nourishments perfectly, the cooling waters guarantee reliable safety under the sun, and the vibrant coral accents bring life and optimism to the gathering. 
              </p>
              <p>
                We build products that capture this beautiful state of <strong>effortless harmony</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-4 text-center">
            <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-stone-150">
              <span className="block text-xl font-bold text-[#FF6B4A] font-space">Innovative</span>
              <span className="text-[10px] text-stone-500 uppercase font-semibold">Vision</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-stone-150">
              <span className="block text-xl font-bold text-[#0D9488] font-space">Reliable</span>
              <span className="text-[10px] text-stone-500 uppercase font-semibold">Tidal Uptime</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-stone-150">
              <span className="block text-xl font-bold text-amber-500 font-space">Consistent</span>
              <span className="text-[10px] text-stone-500 uppercase font-semibold">Visual Grids</span>
            </div>
          </div>
        </div>

        {/* Fictional Founders / Dual Characters Showcase */}
        <div className="lg:col-span-5 bg-[#FAF6F0] border-2 border-stone-900 p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col justify-between">
          <div className="space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B4A] font-mono">
              Brand Persona & Avatars
            </span>
            <h3 className="text-xl font-bold font-space text-stone-900 leading-tight">
              Meet Joe & Serena
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Our vector artwork captures two central brand characters: <strong>Joe</strong> (wearing warm solar orange, symbolizing bold developer productivity and innovation) and <strong>Serena</strong> (wearing vibrant, welcoming sunset tones, symbolizing clean product design and consistent orchestration).
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <div className="w-8 h-8 rounded-full bg-[#FF6B4A] flex items-center justify-center text-white font-bold leading-none font-space text-sm">
                  J
                </div>
                <div className="flex-1 text-xs">
                  <strong className="text-stone-900 font-space block">Joe — The Developer Lead</strong>
                  <span className="text-stone-500">Represents the solar spark of new code templates and responsive engineering.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <div className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#FF6B4A] flex items-center justify-center text-stone-800 font-bold leading-none font-space text-sm">
                  S
                </div>
                <div className="flex-1 text-xs">
                  <strong className="text-stone-900 font-space block">Serena — The UI/UX Director</strong>
                  <span className="text-stone-500">Represents product harmony, welcoming colors, and perfect layout typography.</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-stone-500 mt-6 pt-3 border-t border-stone-200 text-center italic">
            "Our software should feel as direct as sunshine."
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-space text-stone-900">The 3 Structural Pillars</h3>
          <span className="text-xs font-mono text-stone-500">Click a pillar to inspect brand rules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = iconsMap[val.id] || Compass;
            const isOpen = activeValueId === val.id;

            return (
              <div
                key={val.id}
                onClick={() => setActiveValueId(isOpen ? null : val.id)}
                className={`p-6 rounded-2xl border-2 border-stone-900 text-left cursor-pointer transition-all ${
                  isOpen
                    ? 'bg-white shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]'
                    : 'bg-[#FAF6F0] hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`p-2.5 rounded-xl border border-stone-950 ${
                    val.id === 'reliability' ? 'bg-teal-50 text-teal-600' :
                    val.id === 'innovation' ? 'bg-orange-50 text-[#FF6B4A]' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <Icon className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                    {val.id === 'reliability' ? 'Safety' : val.id === 'innovation' ? 'Vision' : 'harmony'}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-space text-stone-900 mt-4">{val.title}</h4>
                <p className="text-xs text-stone-500 italic mt-1 font-sans">{val.metaphor}</p>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed font-sans">{val.description}</p>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-3 animate-fadeIn">
                    <div className="text-[10px]">
                      <span className="font-bold text-stone-500 block uppercase">Beach Narrative Reference:</span>
                      <span className="text-stone-700 font-sans">{val.artworkContext}</span>
                    </div>

                    <div className="text-[10px]">
                      <span className="font-bold text-stone-500 block uppercase">Approved Slogans:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {val.keyPhrases.map((phrase, i) => (
                          <span key={i} className="bg-stone-150 text-stone-800 px-2 py-0.5 rounded text-[9px] font-mono border border-stone-200">
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
