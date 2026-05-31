import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BrandDashboard from './components/BrandDashboard';
import ColorPalette from './components/ColorPalette';
import TypographySpecimen from './components/TypographySpecimen';
import ComponentShowcase from './components/ComponentShowcase';
import AiCopywriter from './components/AiCopywriter';
import SocialMediaKit from './components/SocialMediaKit';
import { Compass, Palette, Type, Layers, Sparkles, AlertCircle, Quote, Image as ImageIcon } from 'lucide-react';

type TabType = 'dashboard' | 'palette' | 'typography' | 'components' | 'copywriter' | 'social_kit';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const navigationItems = [
    { id: 'dashboard', label: 'Brand Book', icon: Compass, color: 'text-stone-900' },
    { id: 'palette', label: 'Color Tokens', icon: Palette, color: 'text-[#0D9488]' },
    { id: 'typography', label: 'Typography', icon: Type, color: 'text-[#FF6B4A]' },
    { id: 'components', label: 'UI Showcase', icon: Layers, color: 'text-[#F59E0B]' },
    { id: 'social_kit', label: 'Social Media Kit', icon: ImageIcon, color: 'text-emerald-600' },
    { id: 'copywriter', label: 'Gemini Copywriter', icon: Sparkles, color: 'text-purple-600' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <BrandDashboard />;
      case 'palette':
        return <ColorPalette />;
      case 'typography':
        return <TypographySpecimen />;
      case 'components':
        return <ComponentShowcase />;
      case 'social_kit':
        return <SocialMediaKit />;
      case 'copywriter':
        return <AiCopywriter />;
      default:
        return <BrandDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C1917] font-sans antialiased flex flex-col">
      {/* Top Brand Notification Header */}
      <div className="bg-[#FF6B4A] text-white py-2 px-4 text-center text-xs font-mono font-medium border-b-2 border-stone-900 tracking-wider flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
        <span>COVE SYSTEMS — VISUAL DESIGN BOOK v2.4.0 • INSPIRED BY LIGHT, SEASHORE & HARMONY</span>
      </div>

      {/* Main Corporate Header */}
      <header className="bg-white border-b-2 border-stone-900 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand Cluster */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B4A] flex items-center justify-center border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              <span className="font-space font-extrabold text-white text-lg tracking-tighter">C</span>
            </div>
            <div className="text-left">
              <span className="font-space font-extrabold text-stone-900 text-lg leading-none block tracking-wide uppercase">
                Cove Systems
              </span>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-semibold block mt-0.5">
                Core Design System
              </span>
            </div>
          </div>

          {/* Interactive Navigation System */}
          <nav className="flex flex-wrap items-center gap-1.5 self-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-space transition-all duration-150 inline-flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-[#FAF6F0] border-stone-950 shadow-[2px_2px_0px_0px_rgba(255,107,74,1)] scale-[1.01]'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                  <span>{item.label}</span>
                  {item.id === 'copywriter' && (
                    <span className="bg-purple-100 text-purple-700 text-[8px] uppercase px-1.5 rounded-full font-sans border border-purple-200">
                      AI Build
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-12">
        
        {/* Dynamic rendering with motion fade-in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="focus:outline-none"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Global Design System Footer */}
        <footer className="pt-12 border-t border-stone-200 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex p-2 bg-[#FAF6F0] rounded-xl border border-stone-150">
              <Quote className="w-5 h-5 text-stone-400" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif max-w-md mx-auto italic">
              "We believe technical systems should be as welcoming as a warm summer evening on the shoreline, removing developer anxiety and establishing perfect system flow."
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between text-[10px] text-stone-400 border-t border-stone-100 pt-6">
            <p>© 2026 Cove Systems Inc. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2 md:mt-0 font-mono">
              <span className="hover:text-stone-700 cursor-pointer">Security Ledger</span>
              <span className="text-stone-350">•</span>
              <span className="hover:text-stone-700 cursor-pointer">Accessibility Checklist</span>
              <span className="text-stone-350">•</span>
              <span className="hover:text-stone-700 cursor-pointer">Ocean Spec v4.2.1</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
