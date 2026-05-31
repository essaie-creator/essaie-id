import { useState } from 'react';
import { INSTANT_COPY_TEMPLATES } from '../brandData';
import { Copy, Check, Sparkles, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';

export default function AiCopywriter() {
  const [copyType, setCopyType] = useState<'hero_title' | 'slogan' | 'value_statement' | 'pitch' | 'social_post'>('slogan');
  const [tone, setTone] = useState<string>('optimistic');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [brandLogs, setBrandLogs] = useState<any[]>([]);
  const [errorDetails, setErrorDetails] = useState<{ message: string; isMissingKey: boolean } | null>(null);

  // Fallback copy library based on selections
  const fallbackPresets: Record<string, string[]> = {
    hero_title: [
      "Software as reliable as the tide, as brilliant as the sun.",
      "Engineered for deep calm. Built for bright momentum.",
      "Cove Systems: High performance shored up on absolute consistency."
    ],
    slogan: [
      "Consistent tools. Warm interfaces.",
      "Software built for the sunshine.",
      "Calm scaling under any computational tide."
    ],
    value_statement: [
      "We design resilient application infrastructures that act as dependable harbors, ensuring systems stay consistently operational during peak hours.",
      "By combining state-of-the-art developer platform components with welcoming, elegant design structures, we make cloud orchestration direct and delightful.",
      "Cove Systems is a developer platforms provider committed to stability and innovation, balancing technical safety with human potential."
    ],
    pitch: [
      "Hello! We are Cove Systems. Traditional developer platforms feel like grey terminals—sterile, dark, and anxious. We build high-speed cloud infrastructure styled with the absolute warmth and reliable rhythm of the beach shore. Our platforms ensure uptime of 99.98% while making system orchestration as peaceful as a sunlit picnic with team members.",
      "Most software teams suffer from high server-state complexity. Cove Systems stabilizes application environments through natural, easy-to-read layout components. Built on robust modular code systems, we make certain that your scaling demands are shored up safely under any load spike.",
      "Cove Systems makes cloud networking simple and optimistic. Designed in deep turquoise teals of security and solar oranges of innovation, our software tooling makes developers feel supported. We automate cluster scaling with a reassuring touch—bringing natural clarity back to complex cloud states."
    ],
    social_post: [
      "⛵ Your developers shouldn't have to navigate stormy waters. Shore up your next deployment container with the tidal consistency of Cove.io! #CoveSystems #DelightfulDev",
      "🍊 Say goodbye to sterile tech grids. We've designed Cove Systems developer tools to be as visible and refreshing as sunshine. Let's make engineering welcoming again. #CoveLabs #DesignSystem",
      "🍉 Systems running out of juice during load peaks? Cove holds the line. Effortless orchestration inspired by the perfect beach picnic gathering. #WebOperations #ConsistentUptime"
    ]
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateBrandCopy = async () => {
    setLoading(true);
    setErrorDetails(null);

    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: copyType, prompt, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to connect with AI model.");
      }

      // Prepend to brand logs
      setBrandLogs(prev => [
        {
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: copyType,
          tone,
          promptUsed: prompt || "Default identity template",
          content: data.text,
          isAiGenerated: true
        },
        ...prev
      ]);
    } catch (err: any) {
      console.error(err);
      // Determine if key is missing or standard network error
      const isMissing = err.message.includes("GEMINI_API_KEY") || (err.message && err.message.toLowerCase().includes("api key"));
      
      setErrorDetails({
        message: err.message || "Something went wrong. Let's fall back to our verified Cove Brand Kit guidelines.",
        isMissingKey: isMissing
      });

      // Inject verified fallback presets so user has a perfect experience
      const samples = fallbackPresets[copyType] || fallbackPresets.slogan;
      const index = Math.floor(Math.random() * samples.length);
      const selectedCopy = samples[index];

      // Add as preset log items
      setBrandLogs(prev => [
        {
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: copyType,
          tone,
          promptUsed: prompt || "Standard brand book preset",
          content: selectedCopy,
          isAiGenerated: false
        },
        ...prev
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left" id="ai-copywriter-section">
      {/* Informative Header */}
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF6B4A]" />
          Gemini AI Brand Copywriter
        </h2>
        <p className="text-stone-600 mt-1 max-w-3xl text-sm leading-relaxed">
          Need custom advertising copy, tagline variations, or value propositions aligned with the Cove Systems beach identity? Inject context or prompt constraints, and our integrated Gemini 3.5 engine will write 3 polished copy directions for your landing pages, socials, or value dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Generation Inputs */}
        <div className="lg:col-span-5 bg-[#FAF6F0] p-6 rounded-3xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#0D9488] font-mono">
            Orchestration Panel
          </h3>

          {/* Copy type selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">Brand Copy Format:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'slogan', label: 'Slogan / Tagline' },
                { id: 'hero_title', label: 'Landing Hero Title' },
                { id: 'value_statement', label: 'Value Statement' },
                { id: 'pitch', label: 'Elevator Pitch (30s)' },
                { id: 'social_post', label: 'Social Media Post' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCopyType(item.id as any)}
                  className={`px-3 py-2 text-xs font-bold font-space text-left rounded-xl border transition-all cursor-pointer ${
                    copyType === item.id
                      ? 'bg-stone-900 text-[#FAF6F0] border-stone-950 shadow-[1px_1px_0px_0px_rgba(255,107,74,1)]'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-250'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-750 block">Persona Tone Sub-Weight:</label>
            <div className="flex gap-2">
              {[
                { id: 'optimistic', label: '☀️ Optimistic & Warm' },
                { id: 'expert', label: '🐳 Expert & Calming' },
                { id: 'bold', label: '🔥 Bold & Innovative' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTone(item.id)}
                  className={`flex-1 py-1.5 text-[10px] font-bold font-space rounded-lg border cursor-pointer transition-all ${
                    tone === item.id
                      ? 'bg-[#FF6B4A]/10 text-[#FF6B4A] border-[#FF6B4A]/30 font-semibold shadow-sm'
                      : 'bg-white text-stone-600 border-stone-250 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt context details */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Additional Context or Keywords <span className="text-stone-400 font-normal">(Optional)</span>:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. emphasize cloud database clustering, or write copy aimed at product managers..."
              className="w-full h-24 px-3 py-2.5 bg-white text-xs text-stone-800 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateBrandCopy}
            disabled={loading}
            className={`w-full py-3 text-xs font-bold font-space text-white rounded-xl border border-stone-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loading 
                ? 'bg-stone-700 cursor-not-allowed' 
                : 'bg-[#FF6B4A] hover:bg-[#e45331]'
            }`}
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Shoring Up Copy..." : "Generate Brand Copy with Gemini"}
          </button>
        </div>

        {/* Right: Output Board */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 font-mono">
              Generation Outputs
            </h3>
            <span className="text-xs font-mono text-stone-400">Stable, fallback-ready</span>
          </div>

          {/* Alert block for missing keys showing safe, proper warning */}
          {errorDetails && (
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border-2 border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700 leading-relaxed">
                {errorDetails.isMissingKey ? (
                  <p>
                    <strong>Gemini API Key is not yet configured.</strong> No worries! We've automatically loaded our verified, pre-computed design book presets below for you. To customize with real-time AI generation, assign your <strong>GEMINI_API_KEY</strong> in the <strong>Settings &gt; Secrets</strong> tab of the AI Studio control panel.
                  </p>
                ) : (
                  <p>
                    <strong>Network Status Update:</strong> {errorDetails.message}. Reverting to local brand specifications.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* If no outputs generated yet, show pre-loaded instruction cards */}
          {brandLogs.length === 0 ? (
            <div className="bg-stone-50 border-2 border-stone-200 border-dashed rounded-3xl p-10 text-center space-y-4">
              <div className="inline-flex p-3 bg-amber-50 border border-amber-200 text-amber-500 rounded-full">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="font-space font-bold text-stone-800">Your Copies Will Appear Here</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Trigger the generator panel on the left to create live brand variants. We'll automatically verify tone authenticity and brand glossary enforcement!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {brandLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="bg-white border-2 border-stone-900 rounded-2xl p-5 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] space-y-4 relative group"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono border font-bold uppercase ${
                        log.isAiGenerated 
                          ? 'bg-teal-50 text-teal-700 border-teal-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {log.isAiGenerated ? 'Gemini AI' : 'Brand Preset'}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">{log.timestamp}</span>
                    </div>

                    <div className="text-[10px] text-stone-500 font-mono">
                      Format: <strong className="text-stone-800 uppercase">{log.type}</strong>
                    </div>
                  </div>

                  {/* Copy Content Area */}
                  <div className="text-xs md:text-sm text-stone-800 font-sans leading-relaxed text-left whitespace-pre-wrap font-medium">
                    {log.content}
                  </div>

                  {/* Copy Prompt Info */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 italic">
                      Context: "{log.promptUsed}"
                    </span>

                    <button
                      onClick={() => handleCopyText(log.content, log.id)}
                      className="px-2.5 py-1 text-[10px] font-bold font-space rounded border border-stone-300 hover:border-stone-900 hover:bg-stone-50 transition-colors inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      {copiedId === log.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === log.id ? 'Copied' : 'Copy Option'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
