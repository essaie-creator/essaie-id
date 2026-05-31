import React, { useState, useRef, useEffect, RefObject } from 'react';
import { BRAND_COLORS } from '../brandData';
import { Download, Sparkles, Image as ImageIcon, Settings, Sliders, Type, HelpCircle, Layers, Check, UserCheck, Flame, Zap, AlertCircle, History, Bookmark, Trash2, Camera, User, Users, Sun, Sunset, Palmtree, RefreshCw, Undo, Eye } from 'lucide-react';
import JSZip from 'jszip';

interface GraphicPreset {
  id: string;
  name: string;
  type: 'thumbnail' | 'banner' | 'avatar';
  title: string;
  subtitle: string;
  ctaText: string;
  bgColor: string;
  accentColor: string;
  stickerType: 'joe-shocked' | 'joe-laser' | 'serena-excited' | 'serena-calm' | 'watermelon-shocked' | 'retro-badge';
  stickerScale: number;
  stickerX: number;
  stickerY: number;
  borderStyle: 'retro' | 'glow' | 'minimal';
}

const PRESETS: GraphicPreset[] = [
  {
    id: 'yt-shock-deploy',
    name: "⚡ YT Thumbnail: Shock Deploy",
    type: 'thumbnail',
    title: "I DEPLOYED TO PORT 3000 ENGINE!",
    subtitle: "And the Servers Didn't Crash once...",
    ctaText: "99.98% FLOW",
    bgColor: "#FF6B4A", // Sol Orange
    accentColor: "#F59E0B", // Sunset Gold
    stickerType: 'joe-shocked',
    stickerScale: 1.4,
    stickerX: 75,
    stickerY: 55,
    borderStyle: 'retro',
  },
  {
    id: 'yt-laser-reliability',
    name: "🔥 YT Thumbnail: Tidal Max Speed",
    type: 'thumbnail',
    title: "10x RELIABILITY SECRETS!",
    subtitle: "No more stale cache clusters",
    ctaText: "TURBO LIVE",
    bgColor: "#0D9488", // Ocean Teal
    accentColor: "#FF6B4A", // Sol Orange
    stickerType: 'joe-laser',
    stickerScale: 1.35,
    stickerX: 80,
    stickerY: 50,
    borderStyle: 'glow',
  },
  {
    id: 'li-banner-warm',
    name: "⛱️ Professional LinkedIn Banner",
    type: 'banner',
    title: "Cove Systems — Scalable, Coastal Cloud Logic.",
    subtitle: "Architecting serene high-performance software systems.",
    ctaText: "EXPLORE COVE.IO",
    bgColor: "#FAF6F0", // Sand Alabaster
    accentColor: "#0D9488", // Ocean Teal
    stickerType: 'serena-calm',
    stickerScale: 1.1,
    stickerX: 85,
    stickerY: 50,
    borderStyle: 'minimal',
  },
  {
    id: 'tw-banner-neon',
    name: "🐳 Innovative Twitter Header",
    type: 'banner',
    title: "SOFTWARE BUILT FOR THE SUNSHINE.",
    subtitle: "Unbreakable. Consistent. Joyful.",
    ctaText: "GET STARTED",
    bgColor: "#1C1917", // Deep Charcoal
    accentColor: "#FF6B4A", // Sol Orange
    stickerType: 'serena-excited',
    stickerScale: 1.2,
    stickerX: 82,
    stickerY: 50,
    borderStyle: 'retro',
  },
  {
    id: 'profile-joe',
    name: "🎯 Solar Joe Avatar Preset",
    type: 'avatar',
    title: "JOE",
    subtitle: "COVE LEAD DEVS",
    ctaText: "SAND-99",
    bgColor: "#FF6B4A",
    accentColor: "#1C1917",
    stickerType: 'joe-shocked',
    stickerScale: 1.9,
    stickerX: 50,
    stickerY: 58,
    borderStyle: 'retro',
  },
  {
    id: 'profile-serena',
    name: "🍉 Calm Serena Avatar Preset",
    type: 'avatar',
    title: "SERENA",
    subtitle: "UX ARCHITECT",
    ctaText: "TILES",
    bgColor: "#FAF6F0",
    accentColor: "#0D9488",
    stickerType: 'serena-calm',
    stickerScale: 1.7,
    stickerX: 52,
    stickerY: 54,
    borderStyle: 'minimal',
  }
];

export default function SocialMediaKit() {
  const [selectedPreset, setSelectedPreset] = useState<GraphicPreset>(PRESETS[0]);
  const [title, setTitle] = useState(PRESETS[0].title);
  const [subtitle, setSubtitle] = useState(PRESETS[0].subtitle);
  const [ctaText, setCtaText] = useState(PRESETS[0].ctaText);
  const [bgColor, setBgColor] = useState(PRESETS[0].bgColor);
  const [accentColor, setAccentColor] = useState(PRESETS[0].accentColor);
  const [stickerType, setStickerType] = useState(PRESETS[0].stickerType);
  const [stickerScale, setStickerScale] = useState(PRESETS[0].stickerScale);
  const [stickerX, setStickerX] = useState(PRESETS[0].stickerX);
  const [stickerY, setStickerY] = useState(PRESETS[0].stickerY);
  const [borderStyle, setBorderStyle] = useState(PRESETS[0].borderStyle);
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png'>('png');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [zippingState, setZippingState] = useState<'idle' | 'generating' | 'done' | 'error'>('idle');

  // Active primary application tab inside the Suite panel
  const [activeTab, setActiveTab] = useState<'designer' | 'character_creator'>('designer');

  // Stored state for the last 3 user designs (snapshots) in history
  const [history, setHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('cove_design_history_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Master design state variables for our Beach Picnic Sticker & Creator Studio
  const [studioCharacter, setStudioCharacter] = useState<'joe' | 'serena' | 'duo' | 'watermelon_cute' | 'picnic_props'>('joe');
  const [studioExpression, setStudioExpression] = useState<'shock' | 'laser' | 'laugh' | 'calm' | 'smile'>('smile');
  const [studioHandheld, setStudioHandheld] = useState<'burger' | 'watermelon' | 'soda' | 'fork' | 'sunglasses' | 'none'>('burger');
  const [studioScenery, setStudioScenery] = useState<'noon' | 'sunset' | 'night' | 'striped' | 'none'>('noon');
  const [studioBandanaColor, setStudioBandanaColor] = useState('#FF6B4A');
  const [studioTeeColor, setStudioTeeColor] = useState('#FF6B4A');
  const [studioAccessories, setStudioAccessories] = useState<string[]>(['sunglasses', 'earrings', 'palm_leaves']);

  const saveSnapshot = (optionalName?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const snap = {
      id: `snap-${Date.now()}`,
      name: optionalName || `Design Snapshot (${timeStr})`,
      timestamp: timeStr,
      title,
      subtitle,
      ctaText,
      bgColor,
      accentColor,
      stickerType,
      stickerScale,
      stickerX,
      stickerY,
      borderStyle,
      presetType: selectedPreset.type,
      studioCharacter,
      studioExpression,
      studioHandheld,
      studioScenery,
      studioBandanaColor,
      studioTeeColor,
      studioAccessories
    };

    setHistory((prev) => {
      // Filter out duplicate identical titles for clean lists
      const filtered = prev.filter(item => item.title !== snap.title || item.stickerType !== snap.stickerType || item.bgColor !== snap.bgColor);
      const updated = [snap, ...filtered].slice(0, 3);
      localStorage.setItem('cove_design_history_v3', JSON.stringify(updated));
      return updated;
    });
  };

  const loadSnapshot = (snap: any) => {
    if (!snap) return;
    setTitle(snap.title || '');
    setSubtitle(snap.subtitle || '');
    setCtaText(snap.ctaText || '');
    setBgColor(snap.bgColor || '#FF6B4A');
    setAccentColor(snap.accentColor || '#FAF6F0');
    setStickerType(snap.stickerType || 'joe-shocked');
    setStickerScale(snap.stickerScale || 1.0);
    setStickerX(snap.stickerX || 50);
    setStickerY(snap.stickerY || 50);
    setBorderStyle(snap.borderStyle || 'retro');
    
    // load studio configs
    if (snap.studioCharacter) setStudioCharacter(snap.studioCharacter);
    if (snap.studioExpression) setStudioExpression(snap.studioExpression);
    if (snap.studioHandheld) setStudioHandheld(snap.studioHandheld);
    if (snap.studioScenery) setStudioScenery(snap.studioScenery);
    if (snap.studioBandanaColor) setStudioBandanaColor(snap.studioBandanaColor);
    if (snap.studioTeeColor) setStudioTeeColor(snap.studioTeeColor);
    if (snap.studioAccessories) setStudioAccessories(snap.studioAccessories);
    
    // revert preset type
    const matchingPreset = PRESETS.find(p => p.type === snap.presetType);
    if (matchingPreset) setSelectedPreset(matchingPreset);
  };

  const removeSnapshot = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cove_design_history_v3', JSON.stringify(updated));
      return updated;
    });
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Apply selected preset values
  const applyPreset = (preset: GraphicPreset) => {
    setSelectedPreset(preset);
    setTitle(preset.title);
    setSubtitle(preset.subtitle);
    setCtaText(preset.ctaText);
    setBgColor(preset.bgColor);
    setAccentColor(preset.accentColor);
    setStickerType(preset.stickerType);
    setStickerScale(preset.stickerScale);
    setStickerX(preset.stickerX);
    setStickerY(preset.stickerY);
    setBorderStyle(preset.borderStyle);
  };

  // Get current dimensions based on preset type
  const getDims = () => {
    if (selectedPreset.type === 'thumbnail') return { w: 1280, h: 720, label: "1280 x 720 (YouTube HD)", aspect: "aspect-[16/9]" };
    if (selectedPreset.type === 'banner') return { w: 1200, h: 400, label: "1200 x 400 (Profile Banner)", aspect: "aspect-[3/1]" };
    return { w: 500, h: 500, label: "500 x 500 (Profile Avatar / Stamp)", aspect: "aspect-square max-w-[360px]" };
  };

  const { w, h, label, aspect } = getDims();

  // Unified SVG Layout Render Engine - supports scalable dimensions for multiple sizes
  const renderCoveSvg = (
    type: 'thumbnail' | 'banner' | 'avatar',
    sw: number,
    sh: number,
    id?: string,
    customRef?: React.RefObject<SVGSVGElement | null>
  ) => {
    return (
      <svg
        ref={customRef}
        id={id}
        viewBox={`0 0 ${sw} ${sh}`}
        width={sw}
        height={sh}
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`solGlow-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="50%" stopColor="#FAF6F0" opacity="0" />
            <stop offset="100%" stopColor="#FAF6F0" opacity="0" />
          </linearGradient>
          
          <linearGradient id={`neonGlowGrad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={bgColor} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>

          <pattern id={`dotGrid-${type}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2.5" fill="#1C1917" opacity="0.12" />
          </pattern>

          <filter id={`shadowFilter-${type}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="8" dy="8" stdDeviation="0" floodColor="#1C1917" />
          </filter>
        </defs>

        {/* Base color background */}
        <rect width={sw} height={sh} fill={bgColor} />

        {/* Optional Grid overlay representing clean engineering layout */}
        <rect width={sw} height={sh} fill={`url(#dotGrid-${type})`} />

        {/* Stylized background circular solar disk representing brand theme */}
        <circle cx={sw * 0.25} cy={sh * 0.5} r={sh * 0.45} fill={accentColor} opacity="0.18" />
        <circle cx={sw * 0.7} cy={sh * 1.1} r={sh * 0.6} fill="#FF6B4A" opacity="0.12" />

        {/* Dynamic solar orange/beach abstract geometric slices */}
        <polygon points={`0,${sh} ${sw * 0.4},${sh} 0,${sh * 0.4}`} fill={accentColor} opacity="0.25" />
        <polygon points={`${sw},0 ${sw * 0.6},0 ${sw},${sh * 0.35}`} fill="#FF6B4A" opacity="0.15" />

        {/* Dynamic expression sticker overlay placement */}
        <g transform={`translate(${sw * (stickerX / 100)}, ${sh * (stickerY / 100)}) scale(${stickerScale * (sh / 320)})`}>
          {renderSvgStickerJSX(stickerType)}
        </g>

        {/* Custom typography rendering */}
        {type === 'thumbnail' ? (
          <g>
            <text
              x={20}
              y={sh * 0.38}
              fill="#1C1917"
              stroke="#1C1917"
              strokeWidth="18"
              strokeLinecap="round"
              fontSize={sh * 0.08}
              fontWeight="900"
              fontFamily='"Space Grotesk", "Inter", sans-serif'
              wordSpacing="2"
            >
              {title}
            </text>
            <text
              x={20}
              y={sh * 0.38}
              fill="#FAF6F0"
              fontSize={sh * 0.08}
              fontWeight="900"
              fontFamily='"Space Grotesk", "Inter", sans-serif'
            >
              {title}
            </text>

            <text
              x={20}
              y={sh * 0.52}
              fill="#1C1917"
              stroke="#FAF6F0"
              strokeWidth="6"
              paintOrder="stroke"
              fontSize={sh * 0.045}
              fontWeight="700"
              fontFamily='"Space Grotesk", sans-serif'
            >
              {subtitle}
            </text>

            <g transform={`translate(20, ${sh * 0.64})`}>
              <rect
                width={ctaText.length * 15 + 30}
                height={40}
                rx="10"
                fill={accentColor}
                stroke="#1C1917"
                strokeWidth="5"
                filter={`url(#shadowFilter-${type})`}
              />
              <text
                x={(ctaText.length * 15 + 30) / 2}
                y={25}
                textAnchor="middle"
                fill="#1C1917"
                fontSize="14"
                fontWeight="900"
                fontFamily='"JetBrains Mono", monospace'
              >
                {ctaText}
              </text>
            </g>
          </g>
        ) : type === 'banner' ? (
          <g>
            <rect x="25" y="30" width={110} height={26} rx="6" fill="#1C1917" />
            <text x="80" y="47" textAnchor="middle" fill="#FAF6F0" fontSize="11" fontWeight="800" fontFamily='"JetBrains Mono", monospace' letterSpacing="1">
              COVE.IO
            </text>

            <text
              x={35}
              y={sh * 0.44}
              fill="#1C1917"
              fontSize={sh * 0.085}
              fontWeight="900"
              fontFamily='"Space Grotesk", sans-serif'
              style={{ fill: bgColor === '#1C1917' ? '#FAF6F0' : '#1C1917' }}
            >
              {title}
            </text>

            <text
              x={35}
              y={sh * 0.62}
              fill="#57534E"
              fontSize={sh * 0.042}
              fontWeight="500"
              fontFamily='"Inter", sans-serif'
              style={{ fill: bgColor === '#1C1917' ? '#A8A29E' : '#57534E' }}
            >
              {subtitle}
            </text>

            <g transform={`translate(35, ${sh * 0.74})`}>
              <rect width={ctaText.length * 9 + 20} height={25} rx="6" fill="#0D9488" stroke="#1C1917" strokeWidth="3" />
              <text x={(ctaText.length * 9 + 20) / 2} y={16} textAnchor="middle" fill="#FAF6F0" fontSize="10" fontWeight="800" fontFamily='"JetBrains Mono", monospace'>
                {ctaText}
              </text>
            </g>
          </g>
        ) : (
          <g>
            <circle cx={sw / 2} cy={sh / 2} r={(sh / 2) - 25} fill="none" stroke={accentColor} strokeWidth="6" strokeDasharray="10, 8" />
            
            <rect x="40" y={sh - 60} width={sw - 80} height={35} rx="10" fill="#1C1917" stroke="#FAF6F0" strokeWidth="4" />
            <text
              x={sw / 2}
              y={sh - 38}
              textAnchor="middle"
              fill="#FAF6F0"
              fontSize="14"
              fontWeight="900"
              fontFamily='"Space Grotesk", sans-serif'
              letterSpacing="2"
            >
              {title} • {ctaText}
            </text>
          </g>
        )}

        {/* Accent Border Styles on top layer */}
        {borderStyle === 'retro' && (
          <rect x="0" y="0" width={sw} height={sh} fill="none" stroke="#1C1917" strokeWidth="20" />
        )}
        {borderStyle === 'glow' && (
          <rect x="0" y="0" width={sw} height={sh} fill="none" stroke={accentColor} strokeWidth="12" opacity="0.85" />
        )}
        {borderStyle === 'minimal' && (
          <rect x="0" y="0" width={sw} height={sh} fill="none" stroke="#1C1917" strokeWidth="4" />
        )}
      </svg>
    );
  };

  // Trigger high resolution PNG download using Canvas-on-SVG-render pipeline
  const handleDownload = () => {
    if (!svgRef.current) return;

    const svgString = new XMLSerializer().serializeToString(svgRef.current);
    
    if (downloadFormat === 'svg') {
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cove-branding-${selectedPreset.type}-${Date.now()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);

            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `cove-${selectedPreset.type}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }

    saveSnapshot();
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Bundle generation of all sizes as a ZIP file
  const handleDownloadAllZip = async () => {
    setZippingState('generating');
    try {
      const zip = new JSZip();
      const svgTypes: ('thumbnail' | 'banner' | 'avatar')[] = ['thumbnail', 'banner', 'avatar'];
      
      if (downloadFormat === 'svg') {
        for (const type of svgTypes) {
          const svgEl = document.getElementById(`offscreen-${type}`) as any;
          if (!svgEl) throw new Error(`Missing offscreen SVG for ${type}`);
          
          const svgString = new XMLSerializer().serializeToString(svgEl);
          zip.file(`cove-${type}-${Date.now()}.svg`, svgString);
        }
        
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cove-all-brand-assets-${Date.now()}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        saveSnapshot();
        setZippingState('done');
        setTimeout(() => setZippingState('idle'), 4000);
      } else {
        const rasterizePromises = svgTypes.map((type) => {
          return new Promise<void>((resolve, reject) => {
            const svgEl = document.getElementById(`offscreen-${type}`) as any;
            const canvasEl = document.getElementById(`canvas-${type}`) as HTMLCanvasElement | null;
            if (!svgEl || !canvasEl) {
              return reject(new Error(`Elements for ${type} missing`));
            }
            
            const svgString = new XMLSerializer().serializeToString(svgEl);
            const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            img.onload = () => {
              const ctx = canvasEl.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
                ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
                
                canvasEl.toBlob((blob) => {
                  if (blob) {
                    zip.file(`cove-${type}-${Date.now()}.png`, blob);
                    URL.revokeObjectURL(url);
                    resolve();
                  } else {
                    URL.revokeObjectURL(url);
                    reject(new Error(`Failed to convert canvas to blob for ${type}`));
                  }
                }, "image/png");
              } else {
                URL.revokeObjectURL(url);
                reject(new Error(`Failed to get canvas context for ${type}`));
              }
            };
            img.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error(`Failed to load SVG as Image for rasterization of ${type}`));
            };
            img.src = url;
          });
        });
        
        await Promise.all(rasterizePromises);
        
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cove-all-brand-assets-${Date.now()}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        saveSnapshot();
        setZippingState('done');
        setTimeout(() => setZippingState('idle'), 4000);
      }
    } catch (err) {
      console.error(err);
      setZippingState('error');
      setTimeout(() => setZippingState('idle'), 4000);
    }
  };

  // Render function for Beach Picnic Sticker & Creator Studio
  const renderStudioStickerJSX = () => {
    return (
      <g>
        {/* Gradients */}
        <defs>
          <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient id="nightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="burgerBun" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <pattern id="basketCheck" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#EF4444" />
            <rect x="5" y="5" width="5" height="5" fill="#EF4444" />
            <rect x="5" width="5" height="5" fill="#FAF6F0" />
            <rect y="5" width="5" height="5" fill="#FAF6F0" />
          </pattern>
        </defs>

        {/* 1. Backdrop Scenery */}
        {studioScenery === 'noon' && (
          <g>
            {/* Sunny Sky Disk */}
            <circle cx="0" cy="0" r="95" fill="#E0F2FE" stroke="#1C1917" strokeWidth="6" />
            <circle cx="35" cy="-35" r="30" fill="#FDE047" stroke="#1C1917" strokeWidth="5" />
            <path d="M-60,-5 C-50,-15 -35,-15 -25,-5 C-15,-15 0,-15 10,-5" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            {/* Distant palm tiny outline sketch */}
            <path d="M-85,30 C-75,10 -60,20 -50,45" fill="none" stroke="#047857" strokeWidth="3" />
          </g>
        )}

        {studioScenery === 'sunset' && (
          <g>
            <circle cx="0" cy="0" r="95" fill="url(#sunsetGrad)" stroke="#1C1917" strokeWidth="6" />
            {/* Glowing gold sun sinking */}
            <circle cx="0" cy="20" r="35" fill="#FEF08A" stroke="#1C1917" strokeWidth="5" />
            <line x1="-80" y1="20" x2="80" y2="20" stroke="#1C1917" strokeWidth="4" />
            <line x1="-60" y1="35" x2="60" y2="35" stroke="#1C1917" strokeWidth="3" />
          </g>
        )}

        {studioScenery === 'night' && (
          <g>
            <circle cx="0" cy="0" r="95" fill="url(#nightGrad)" stroke="#1C1917" strokeWidth="6" />
            {/* Crescent moon yellow */}
            <path d="M40,-40 C40,-20 20,0 0,0 C15,-5 25,-20 25,-40 C25,-50 20,-55 15,-60 C30,-55 40,-50 40,-40 Z" fill="#FEF08A" stroke="#1C1917" strokeWidth="4" />
            {/* Twinkle stars */}
            <circle cx="-40" cy="-30" r="2" fill="#FAF6F0" />
            <circle cx="-15" cy="-50" r="3" fill="#FDE047" />
            <circle cx="-60" cy="10" r="2" fill="#FAF6F0" />
            <circle cx="50" cy="20" r="2.5" fill="#FAF6F0" />
          </g>
        )}

        {studioScenery === 'striped' && (
          <g>
            <rect x="-95" y="-95" width="190" height="190" rx="40" fill="#F59E0B" stroke="#1C1917" strokeWidth="6" />
            {/* Colorful layout picnic stripes aligned with mat */}
            <rect x="-95" y="-60" width="190" height="25" fill="#EF4444" />
            <rect x="-95" y="-15" width="190" height="25" fill="#FAF6F0" />
            <rect x="-95" y="30" width="190" height="25" fill="#0D9488" />
            {/* Outline grid overlay on stripes */}
            <rect x="-95" y="-95" width="190" height="190" rx="40" fill="none" stroke="#1C1917" strokeWidth="6" />
          </g>
        )}

        {/* Palm leaves overlays (always cool for beach side effects) */}
        {studioAccessories.includes('palm_leaves') && (
          <g opacity="0.9">
            <path d="M-105,-85 C-90,-100 -50,-105 -20,-115 C-45,-95 -50,-65 -65,-70 Z" fill="#047857" stroke="#1C1917" strokeWidth="3" />
            <path d="M105,-85 C90,-100 50,-105 20,-115 C45,-95 50,-65 65,-70 Z" fill="#047857" stroke="#1C1917" strokeWidth="3" />
          </g>
        )}

        {/* 2. Base Character Render Block */}
        {studioCharacter === 'joe' && (
          <g transform="translate(0, 5)">
            {/* Neck */}
            <rect x="-24" y="30" width="48" height="60" fill="#CD7F5D" rx="10" stroke="#1C1917" strokeWidth="8" />
            <path d="M-24,60 C-10,75 10,75 24,60" fill="none" stroke="#9A593E" strokeWidth="6" />

            {/* Ear Ring */}
            {studioAccessories.includes('earrings') && (
              <circle cx="-50" cy="5" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" />
            )}

            {/* Head Silhouette */}
            <path d="M-50,-20 C-50,-80 -30,-90 0,-90 C30,-90 50,-80 50,-20 C50,40 30,50 0,50 C-30,50 -50,40 -50,-20 Z" fill="#E69C73" stroke="#1C1917" strokeWidth="8" />

            {/* Spiky Cool Hair */}
            <path d="M-55,-60 L-72,-105 L-40,-95 L-42,-124 L-15,-105 L-10,-132 L15,-110 L25,-128 L38,-95 L58,-98 L45,-65 L55,-50" fill="#1C1917" stroke="#1C1917" strokeWidth="6" />
            
            {/* Side Shaved Razor Slits */}
            <path d="M-45,-25 L-30,-25" stroke="#FAF6F0" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M-43,-15 L-33,-15" stroke="#FAF6F0" strokeWidth="4.5" strokeLinecap="round" />

            {/* Orange Tee shirt shoulders */}
            <path d="M-58,74 C-42,65 -20,68 0,68 C20,68 42,65 58,74 L70,120 L-70,120 Z" fill={studioTeeColor} stroke="#1C1917" strokeWidth="8" />

            {/* Sunglasses hanging casually */}
            <path d="M-12,74 L12,74" stroke="#1C1917" strokeWidth="6" />
            <rect x="-24" y="78" width="18" height="14" rx="4" fill="#0F172A" stroke="#1C1917" strokeWidth="4" />
            <rect x="6" y="78" width="18" height="14" rx="4" fill="#0F172A" stroke="#1C1917" strokeWidth="4" />

            {/* Facial expression layer rendering */}
            {renderStudioExpression(studioExpression, -20, 20)}
          </g>
        )}

        {studioCharacter === 'serena' && (
          <g transform="translate(0, 5)">
            {/* Back Hair */}
            <path d="M-62,-40 C-102,-30 -115,65 -75,115 C-33,145 33,145 75,115 C115,65 102,-30 62,-40 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="7" />
            
            {/* Neck */}
            <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />

            {/* Ear Ring */}
            {studioAccessories.includes('earrings') && (
              <g>
                <circle cx="-47" cy="5" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" />
                <circle cx="47" cy="5" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" />
              </g>
            )}

            {/* Head Face Silhouette */}
            <path d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z" fill="#DF9269" stroke="#1C1917" strokeWidth="8" />

            {/* Halter Top shoulders with dynamic strap */}
            <path d="M-40,75 C-15,55 15,55 40,75 L52,120 L-52,120 Z" fill="#BE123C" stroke="#1C1917" strokeWidth="8" />
            <path d="M-15,75 L-2,44" stroke="#1C1917" strokeWidth="6" />
            <path d="M15,75 L2,44" stroke="#1C1917" strokeWidth="6" />

            {/* Orange Bandana Headdress */}
            {studioAccessories.includes('bandana') && (
              <g>
                <path d="M-48,-55 C-30,-75 30,-75 48,-55 C52,-45 52,-40 48,-44 C30,-64 -30,-64 -48,-44 C-52,-40 -52,-45 -48,-55 Z" fill={studioBandanaColor} stroke="#1C1917" strokeWidth="6" />
                {/* Cute bandana knot/ears */}
                <path d="M-35,-70 C-55,-95 -15,-90 -25,-72 Z" fill={studioBandanaColor} stroke="#1C1917" strokeWidth="5" />
                <path d="M-22,-70 C-18,-100 15,-92 -2,-71 Z" fill={studioBandanaColor} stroke="#1C1917" strokeWidth="5" />
              </g>
            )}

            {/* Facial expression layer rendering */}
            {renderStudioExpression(studioExpression, -18, 18)}
          </g>
        )}

        {studioCharacter === 'duo' && (
          <g>
            {/* Red Mat background */}
            <path d="M-90,60 L90,60 L70,110 L-70,110 Z" fill="#EF4444" stroke="#1C1917" strokeWidth="6" />
            <path d="M-70,60 L-50,110" stroke="#FAF6F0" strokeWidth="4" />
            <path d="M0,60 L0,110" stroke="#FEF08A" strokeWidth="4" />
            <path d="M70,60 L50,110" stroke="#FAF6F0" strokeWidth="4" />

            {/* Left Joe character */}
            <g transform="translate(-32, 10) scale(0.85)">
              <rect x="-16" y="30" width="32" height="40" fill="#A15D3F" rx="6" stroke="#1C1917" strokeWidth="6" />
              <path d="M-35,-15 C-35,-60 -20,-70 0,-70 C20,-70 35,-60 35,-15 C35,25 20,32 0,32 C-20,32 -35,25 -35,-15 Z" fill="#E69C73" stroke="#1C1917" strokeWidth="6" />
              <path d="M-40,-45 L-50,-70 L-25,-65 L-27,-85 L-5,-70 L-2,-90 L15,-70 L25,-85 L32,-60 L45,-62 L35,-40" fill="#1C1917" stroke="#1C1917" strokeWidth="5" />
              <path d="M-35,60 C-20,50 20,50 35,60 L45,100 L-45,100 Z" fill={studioTeeColor} stroke="#1C1917" strokeWidth="6" />
              {renderStudioExpression(studioExpression, -14, 14)}
            </g>

            {/* Right Serena character */}
            <g transform="translate(32, 12) scale(0.85)">
              <path d="M-45,-30 C-75,-20 -85,45 -55,80 C-20,100 20,100 55,80 C75,45 65,-20 45,-30 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="5" />
              <rect x="-16" y="30" width="32" height="40" fill="#9A593E" rx="6" stroke="#1C1917" strokeWidth="6" />
              <path d="M-35,-15 C-35,-60 -20,-70 0,-70 C20,-70 35,-60 35,-15 C35,25 20,32 0,32 C-20,32 -35,25 -35,-15 Z" fill="#DF9269" stroke="#1C1917" strokeWidth="6" />
              <path d="M-40,60 C-20,50 20,50 35,60 L45,100 L-45,100 Z" fill="#EF4444" stroke="#1C1917" strokeWidth="6" />
              <path d="M-38,-45 C-20,-60 20,-60 38,-45" fill="none" stroke={studioBandanaColor} strokeWidth="6" />
              {renderStudioExpression(studioExpression === 'shock' ? 'smile' : studioExpression, -14, 14)}
            </g>

            {/* Picnic Item Overlay inside Duo (Watermelon slice on the middle grass mat) */}
            <g transform="translate(0, 70) scale(0.6)">
              <path d="M-30,-10 C-30,25 30,25 30,-10 Z" fill="#047857" stroke="#1C1917" strokeWidth="6" />
              <path d="M-22,-10 C-22,18 22,18 22,-10 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="4" />
              <circle cx="-10" cy="2" r="1.5" fill="#1C1917" />
              <circle cx="10" cy="2" r="1.5" fill="#1C1917" />
            </g>
          </g>
        )}

        {studioCharacter === 'watermelon_cute' && (
          <g transform="translate(0, 10)">
            {/* Watermelon Wedge */}
            <path d="M-85,-25 C-85,55 85,55 85,-25 Z" fill="#10B981" stroke="#1C1917" strokeWidth="8" />
            <path d="M-72,-25 C-72,43 72,43 72,-25 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="6" />

            {/* Little black seeds scattered around representing true watermelon textures */}
            <path d="M-50,-5 L-48,-10 L-52,-10 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />
            <path d="M50,-5 L52,-10 L48,-10 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />
            <path d="M-25,18 L-23,13 L-27,13 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />
            <path d="M25,18 L27,13 L23,13 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />

            {/* Rosy cheeks */}
            <circle cx="-42" cy="0" r="10" fill="#EF4444" opacity="0.4" />
            <circle cx="42" cy="0" r="10" fill="#EF4444" opacity="0.4" />

            {/* Facial expressions positioned on the Melon center */}
            {renderStudioExpression(studioExpression, -22, 22)}
          </g>
        )}

        {studioCharacter === 'picnic_props' && (
          <g transform="translate(0, 10)">
            {/* Woven Picnic Basket */}
            <rect x="-65" y="0" width="130" height="75" rx="14" fill="#6B4F27" stroke="#1C1917" strokeWidth="8" />
            <path d="M-65,25 L65,25" stroke="#1c1917" strokeWidth="5" />
            <path d="M-65,50 L65,50" stroke="#1c1917" strokeWidth="5" />
            <path d="M-30,0 L-30,75" stroke="#1c1917" strokeWidth="4" />
            <path d="M30,0 L30,75" stroke="#1c1917" strokeWidth="4" />
            
            {/* Basket Handle */}
            <path d="M-55,0 C-55,-45 55,-45 55,0" fill="none" stroke="#6B4F27" strokeWidth="10" />
            <path d="M-55,0 C-55,-45 55,-45 55,0" fill="none" stroke="#1C1917" strokeWidth="4" />

            {/* Red / White Picnic Mat cloth popping out */}
            <path d="M-40,5 C-55,-25 -10,-35 0,5 Z" fill="url(#basketCheck)" stroke="#1C1917" strokeWidth="4" />
            <path d="M-10,5 C5,-30 45,-25 35,5 Z" fill="url(#basketCheck)" stroke="#1C1917" strokeWidth="4" />

            {/* Tiny delicious burger on top representing picnic abundance! */}
            <g transform="translate(0, -32) scale(0.6)">
              <rect x="-30" y="5" width="60" height="8" rx="2" fill="#FAF6F0" stroke="#1C1917" strokeWidth="4" />
              <path d="M-24,5 Q0,-12 24,5 Z" fill="#F59E0B" stroke="#1C1917" strokeWidth="4" />
              <path d="M-26,5 L26,5" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
              <rect x="-22" y="10" width="44" height="6" fill="#78350F" stroke="#1C1917" strokeWidth="4" />
              <rect x="-25" y="15" width="50" height="6" rx="2" fill="#FBBF24" stroke="#1C1917" strokeWidth="3" />
            </g>
          </g>
        )}

        {/* 3. Handheld Accessory/Prop Layer */}
        {renderStudioHandheldProp(studioHandheld)}

        {/* 4. Active Sunglasses Accessory Wear overlay */}
        {studioAccessories.includes('sunglasses') && studioCharacter !== 'watermelon_cute' && studioCharacter !== 'picnic_props' && (
          <g transform={studioCharacter === 'duo' ? 'translate(-25, 0) scale(0.7)' : 'translate(0, 5)'}>
            {/* Cool designer beach shades */}
            <path d="M-36,-22 L36,-22" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
            <rect x="-32" y="-20" width="26" height="20" rx="6" fill="#0D9488" stroke="#1C1917" strokeWidth="5" />
            <rect x="6" y="-20" width="26" height="20" rx="6" fill="#0D9488" stroke="#1C1917" strokeWidth="5" />
            {/* Sunglasses lens highlight shine */}
            <path d="M-28,-14 L-20,-6" stroke="#FAF6F0" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
            <path d="M10,-14 L18,-6" stroke="#FAF6F0" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
          </g>
        )}
      </g>
    );
  };

  // Render Sub-Facial Expressions
  const renderStudioExpression = (ex: string, lx: number, rx: number) => {
    switch (ex) {
      case 'smile':
        return (
          <g>
            <path d={`M${lx},-22 Q${lx + 5},-12 ${lx + 10},-22`} fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
            <path d={`M${rx - 10},-22 Q${rx - 5},-12 ${rx},-23`} fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
            <path d="M-15,6 Q0,22 15,6 Z" fill="#EF4444" stroke="#1C1917" strokeWidth="5" />
            <path d="M-11,8 L11,8" stroke="#FAF6F0" strokeWidth="4" />
          </g>
        );
      case 'shock':
        return (
          <g>
            <circle cx={lx + 4} cy="-22" r="13" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />
            <circle cx={rx - 4} cy="-22" r="13" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />
            <circle cx={lx + 4} cy="-22" r="4" fill="#1C1917" />
            <circle cx={rx - 4} cy="-22" r="4" fill="#1C1917" />
            <path d="M-20,-38 C-15,-42 -5,-40 -5,-38" fill="none" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
            <path d="M20,-38 C15,-42 5,-40 5,-38" fill="none" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
            
            {/* Screaming gaping mouth */}
            <path d="M-22,8 C-22,-6 22,-6 22,8 C22,28 12,38 0,38 C-12,38 -22,28 -22,8 Z" fill="#1C1917" />
            <path d="M-15,28 C-8,18 8,18 15,28" fill="#FF6B4A" />
            <path d="M-16,8 L16,8" stroke="#FAF6F0" strokeWidth="6" strokeLinecap="round" />
          </g>
        );
      case 'laser':
        return (
          <g>
            <circle cx={lx + 4} cy="-20" r="10" fill="#FAF6F0" stroke="#1C1917" strokeWidth="5" />
            <circle cx={rx - 4} cy="-20" r="10" fill="#FAF6F0" stroke="#1C1917" strokeWidth="5" />
            
            {/* Glowing neon laser shafts */}
            <line x1={lx + 4} y1="-20" x2="-230" y2="-45" stroke="#EF4444" strokeWidth="18" opacity="0.8" strokeLinecap="round" />
            <line x1={lx + 4} y1="-20" x2="-230" y2="-45" stroke="#FAF6F0" strokeWidth="6" strokeLinecap="round" />
            <circle cx={lx + 4} cy="-20" r="7" fill="#FF885E" />

            <line x1={rx - 4} y1="-20" x2="230" y2="-45" stroke="#EF4444" strokeWidth="18" opacity="0.8" strokeLinecap="round" />
            <line x1={rx - 4} y1="-20" x2="230" y2="-45" stroke="#FAF6F0" strokeWidth="6" strokeLinecap="round" />
            <circle cx={rx - 4} cy="-20" r="7" fill="#FF885E" />

            {/* Confident battle grin */}
            <path d="M-18,12 Q0,26 18,12" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          </g>
        );
      case 'laugh':
        return (
          <g>
            {/* Squinty Laughing Eyes < and > */}
            <path d={`M${lx - 4},-26 L${lx + 6},-20 L${lx - 4},-14`} fill="none" stroke="#1C1917" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
            <path d={`M${rx + 4},-26 L${rx - 6},-20 L${rx + 4},-14`} fill="none" stroke="#1C1917" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M-22,2 C-22,24 22,24 22,2 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="4" />
            <path d="M-12,14 C-5,6 5,6 12,14" fill="#FF6B4A" />
            <path d="M-18,2 L18,2" stroke="#FAF6F0" strokeWidth="4" />
          </g>
        );
      case 'calm':
        return (
          <g>
            {/* Peaceful Happy Sleep Curved Arcs */}
            <path d={`M${lx},-23 Q${lx + 5},-28 ${lx + 10},-23`} fill="none" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${rx - 10},-23 Q${rx - 5},-28 ${rx},-23`} fill="none" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
            <path d="M-12,8 Q0,16 12,8" fill="none" stroke="#1C1917" strokeWidth="5" strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  };

  // Render Props Handheld Item Layer
  const renderStudioHandheldProp = (prop: string) => {
    switch (prop) {
      case 'burger':
        return (
          <g transform="translate(48, 48) scale(0.9)">
            {/* Multi-layered vector burger */}
            <path d="M-24,0 Q0,-18 24,0 Z" fill="url(#burgerBun)" stroke="#1C1917" strokeWidth="4" />
            <path d="M-27,-1 L27,-1" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
            {/* Cheese */}
            <path d="M-24,3 L-12,10 L12,3 L24,3 Z" fill="#FBBF24" />
            {/* Meat Patty */}
            <rect x="-24" y="4" width="48" height="6" fill="#78350F" stroke="#1C1917" strokeWidth="3" />
            {/* Bottom Bun */}
            <path d="M-24,10 L24,10 L20,16 L-20,16 Z" fill="url(#burgerBun)" stroke="#1C1917" strokeWidth="4" />
            {/* Sparkles */}
            <path d="M-30,-20 L-25,-15" stroke="#FF6B4A" strokeWidth="3" />
            <path d="M30,-20 L25,-15" stroke="#FF6B4A" strokeWidth="3" />
          </g>
        );
      case 'watermelon':
        return (
          <g transform="translate(45, 52) scale(0.9)">
            {/* Watermelon slice with seed detail */}
            <path d="M-30,-5 C-30,22 30,22 30,-5 Z" fill="#047857" stroke="#1C1917" strokeWidth="5" />
            <path d="M-24,-5 C-24,16 24,16 24,-5 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="4" />
            {/* Tiny seeds */}
            <circle cx="-10" cy="2" r="1.5" fill="#1C1917" />
            <circle cx="8" cy="2" r="1.5" fill="#1C1917" />
            <circle cx="0" cy="-2" r="1.5" fill="#1C1917" />
          </g>
        );
      case 'soda':
        return (
          <g transform="translate(50, 42) scale(0.9)">
            {/* Orange sparkling beach soda bottle with water condensation specs */}
            <rect x="-10" y="2" width="20" height="42" rx="6" fill="#F97316" stroke="#1C1917" strokeWidth="4" />
            {/* Label with dynamic water waves */}
            <rect x="-10" y="16" width="20" height="15" fill="#3B82F6" />
            <text x="0" y="27" textAnchor="middle" fill="#FAF6F0" fontSize="8" fontWeight="bold">COVE</text>
            {/* White drinking straw */}
            <path d="M2,2 L10,-15 L22,-18" stroke="#FAF6F0" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M2,2 L10,-15 L22,-18" stroke="#EF4444" strokeWidth="4" strokeDasharray="3,3" fill="none" strokeLinecap="round" />
          </g>
        );
      case 'fork':
        return (
          <g transform="translate(48, 48) scale(0.95)">
            {/* Precise fork alignment like in prompt picture */}
            <path d="M-15,25 L15,-10" stroke="#9A3412" strokeWidth="4" strokeLinecap="round" />
            {/* Shiny metallic prongs */}
            <path d="M10,-15 L25,-30 M15,-10 L30,-25 M5,-20 L20,-35" stroke="#A8A29E" strokeWidth="3" strokeLinecap="round" />
            <line x1="12" y1="-12" x2="22" y2="-22" stroke="#A8A29E" strokeWidth="6" />
          </g>
        );
      case 'sunglasses':
        return (
          <g transform="translate(45, 52) scale(0.85)">
            <rect x="-24" y="-10" width="20" height="15" rx="4" fill="#0D9488" stroke="#1C1917" strokeWidth="4" />
            <rect x="4" y="-10" width="20" height="15" rx="4" fill="#0D9488" stroke="#1C1917" strokeWidth="4" />
            <path d="M-4,-4 L4,-4" stroke="#1C1917" strokeWidth="4" />
          </g>
        );
      default:
        return null;
    }
  };

  // Helper vectors for rendering stickers inside JSX
  // Direct vector JSX definition for stickers
  const renderSvgStickerJSX = (type: string) => {
    switch (type) {
      case 'custom-creator':
        return renderStudioStickerJSX();
      case 'joe-shocked':
        return (
          <g>
            {/* Background comic spike backglow */}
            <path d="M-100,-100 L-40,-50 L-80,0 L-20,20 L-60,80 L0,40 L30,90 L60,20 L100,50 L40,-10 L80,-60 L10,-30 Z" fill="#F59E0B" opacity="0.35" transform="scale(1.7)" />
            
            {/* Neck */}
            <rect x="-24" y="30" width="48" height="60" fill="#CD7F5D" rx="10" stroke="#1C1917" strokeWidth="8" />
            <path d="M-24,60 C-10,75 10,75 24,60" fill="none" stroke="#9A593E" strokeWidth="6" strokeLinecap="round" />
            
            {/* Ear Ring */}
            <circle cx="-50" cy="5" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" />
            
            {/* Head Silhouette */}
            <path d="M-50,-20 C-50,-80 -30,-90 0,-90 C30,-90 50,-80 50,-20 C50,40 30,50 0,50 C-30,50 -50,40 -50,-20 Z" fill="#E69C73" stroke="#1C1917" strokeWidth="8" />
            
            {/* Spiky Cool Hair (Joe) */}
            <path d="M-55,-60 L-70,-100 L-40,-95 L-42,-120 L-15,-105 L-10,-130 L15,-110 L25,-128 L38,-95 L58,-98 L45,-65 L55,-50" fill="#1C1917" stroke="#1C1917" strokeWidth="6" strokeLinejoin="miter" />
            {/* Side shaved detail line */}
            <path d="M-45,-25 L-30,-25" stroke="#FAF6F0" strokeWidth="4" strokeLinecap="round" />
            <path d="M-43,-15 L-33,-15" stroke="#FAF6F0" strokeWidth="4" strokeLinecap="round" />

            {/* Shocked Open Eyes */}
            <circle cx="-20" cy="-25" r="18" fill="#FAF6F0" stroke="#1C1917" strokeWidth="7" />
            <circle cx="20" cy="-25" r="18" fill="#FAF6F0" stroke="#1C1917" strokeWidth="7" />
            
            {/* Tiny Shocked Pupils */}
            <circle cx="-20" cy="-25" r="6" fill="#1C1917" />
            <circle cx="20" cy="-25" r="6" fill="#1C1917" />
            <path d="M-30,-50 C-25,-55 -15,-55 -10,-50" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
            <path d="M10,-50 C15,-55 25,-55 30,-50" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />

            {/* Huge Shocked Gaping Mouth (MrBeast shock style) */}
            <path d="M-32,5 C-32,-15 32,-15 32,5 C32,32 15,45 0,45 C-15,45 -32,32 -32,5 Z" fill="#1C1917" />
            {/* Teeth block */}
            <path d="M-22,-2 L22,-2" stroke="#FAF6F0" strokeWidth="8" strokeLinecap="round" />
            {/* Tongue */}
            <path d="M-15,35 C-10,25 10,25 15,35" fill="#FF6B4A" />

            {/* Rosy exciting blush circles */}
            <circle cx="-38" cy="5" r="8" fill="#FF6B4A" opacity="0.3" />
            <circle cx="38" cy="5" r="8" fill="#FF6B4A" opacity="0.3" />

            {/* Beach Sunglasses hanging casually */}
            <path d="M-12,58 L-4,58 C0,58 4,58 12,58" stroke="#1C1917" strokeWidth="6" />
            <rect x="-24" y="62" width="18" height="14" rx="4" fill="#0D9488" stroke="#1C1917" strokeWidth="4" />
            <rect x="6" y="62" width="18" height="14" rx="4" fill="#0D9488" stroke="#1C1917" strokeWidth="4" />
          </g>
        );

      case 'joe-laser':
        return (
          <g>
            {/* Neck */}
            <rect x="-24" y="30" width="48" height="60" fill="#CD7F5D" rx="10" stroke="#1C1917" strokeWidth="8" />
            {/* Head */}
            <path d="M-50,-20 C-50,-80 -30,-90 0,-90 C30,-90 50,-80 50,-20 C50,40 30,50 0,50 C-30,50 -50,40 -50,-20 Z" fill="#E69C73" stroke="#1C1917" strokeWidth="8" />
            
            {/* Hair */}
            <path d="M-55,-60 L-70,-100 L-40,-95 L-42,-120 L-15,-105 L-10,-130 L15,-110 L25,-128 L38,-95 L58,-98 L45,-65 L55,-50" fill="#1C1917" stroke="#1C1917" strokeWidth="6" />

            {/* Glowing Laser Eyes! (Classic high energy meme thumbnails) */}
            <circle cx="-20" cy="-25" r="14" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />
            <circle cx="20" cy="-25" r="14" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />

            {/* Laser beams shooting sideways */}
            <path d="M-20,-25 L-220,-45" stroke="#FF6B4A" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
            <path d="M-20,-25 L-220,-45" stroke="#FAF6F0" strokeWidth="8" strokeLinecap="round" />
            <circle cx="-20" cy="-25" r="10" fill="#FF886E" />

            <path d="M20,-25 L220,-45" stroke="#FF6B4A" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
            <path d="M20,-25 L220,-45" stroke="#FAF6F0" strokeWidth="8" strokeLinecap="round" />
            <circle cx="20" cy="-25" r="10" fill="#FF886E" />

            {/* Confidence grin */}
            <path d="M-25,12 Q0,32 25,12" fill="none" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
            
            {/* Eyebrows determined angry pose */}
            <path d="M-30,-42 L-10,-35" stroke="#1C1917" strokeWidth="7" strokeLinecap="round" />
            <path d="M10,-35 L30,-42" stroke="#1C1917" strokeWidth="7" strokeLinecap="round" />
          </g>
        );

      case 'serena-excited':
        return (
          <g>
            {/* Flowy Star Sparks behind background */}
            <path d="M-90,-50 L-110,-40 L-95,-30 L-100,-10 L-85,-25 L-65,-20 L-80,-35 L-70,-55 Z" fill="#F59E0B" />
            <path d="M90,-70 L110,-80 L95,-90 L100,-110 L85,-95 L65,-100 L80,-85 L70,-65 Z" fill="#0D9488" />

            {/* Neck */}
            <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />
            
            {/* Long Beautiful Flowy Back Hair (Serena) */}
            <path d="M-60,-40 C-100,-30 -110,60 -70,110 C-30,140 30,140 70,110 C110,60 100,-30 60,-40 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="6" />

            {/* Head Face Silhouette */}
            <path d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z" fill="#DF9269" stroke="#1C1917" strokeWidth="8" />

            {/* Orange Bandana Headdress Tied with Bow */}
            <path d="M-48,-55 C-30,-75 30,-75 48,-55 C52,-45 52,-40 48,-44 C30,-64 -30,-64 -48,-44 C-52,-40 -52,-45 -48,-55 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="6" />
            {/* Cute bandana knot/ears */}
            <path d="M-35,-70 C-55,-95 -15,-90 -25,-72 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="5" />
            <path d="M-22,-70 C-18,-100 15,-92 -2,-71 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="5" />

            {/* Excited Twinkly Starry Eyes */}
            <path d="M-28,-22 L-16,-22" stroke="#1C1917" strokeWidth="11" strokeLinecap="round" />
            <path d="M-22,-28 L-22,-16" stroke="#1C1917" strokeWidth="11" strokeLinecap="round" />
            <circle cx="-22" cy="-22" r="5" fill="#FAF6F0" />

            <path d="M16,-22 L28,-22" stroke="#1C1917" strokeWidth="11" strokeLinecap="round" />
            <path d="M22,-28 L22,-16" stroke="#1C1917" strokeWidth="11" strokeLinecap="round" />
            <circle cx="22" cy="-22" r="5" fill="#FAF6F0" />

            {/* Happy Curved Eyebrows */}
            <path d="M-32,-40 C-25,-48 -15,-45 -12,-38" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
            <path d="M12,-38 C15,-45 25,-48 32,-40" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />

            {/* Giant Laughing Open Shout Mouth */}
            <path d="M-24,2 C-24,-10 24,-10 24,2 C24,24 15,35 0,35 C-15,35 -24,24 -24,2 Z" fill="#1C1917" />
            {/* Tongue */}
            <path d="M-15,26 C-8,15 8,15 15,26" fill="#FF6B4A" />

            {/* Cute Blush circles */}
            <circle cx="-34" cy="5" r="9" fill="#FF6B4A" opacity="0.45" />
            <circle cx="34" cy="5" r="9" fill="#FF6B4A" opacity="0.45" />

            {/* Hoop Earring details */}
            <circle cx="-47" cy="5" r="12" fill="none" stroke="#F59E0B" strokeWidth="6" />
          </g>
        );

      case 'serena-calm':
        return (
          <g>
            {/* Neck */}
            <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />
            {/* Back Hair */}
            <path d="M-60,-40 C-100,-30 -110,60 -70,110 C-30,140 30,140 70,110 C110,60 100,-30 60,-40 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="6" />
            {/* Head Face */}
            <path d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z" fill="#DF9269" stroke="#1C1917" strokeWidth="8" />

            {/* Bandana */}
            <path d="M-48,-55 C-30,-75 30,-75 48,-55 C52,-45 52,-40 48,-44 C30,-64 -30,-64 -48,-44 C-52,-40 -52,-45 -48,-55 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="6" />
            {/* Bandana ears */}
            <path d="M-35,-70 C-55,-95 -15,-90 -25,-72 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="5" />

            {/* Peaceful, Closed Happy Eyes */}
            <path d="M-30,-22 Q -20,-12 -12,-22" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
            <path d="M12,-22 Q 20,-12 30,-22" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />

            {/* Gentle smile */}
            <path d="M-15,10 Q 0,22 15,10" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />

            {/* Cute Hoop Earring */}
            <circle cx="-47" cy="5" r="12" fill="none" stroke="#F59E0B" strokeWidth="6" />

            {/* Sparkles of calm peace */}
            <circle cx="-50" cy="-45" r="3" fill="#0D9488" />
            <circle cx="50" cy="-45" r="3" fill="#F59E0B" />
          </g>
        );

      case 'watermelon-shocked':
        return (
          <g>
            {/* Watermelon shape border */}
            <path d="M-90,-30 C-90,60 90,60 90,-30 Z" fill="#0D9488" stroke="#1C1917" strokeWidth="10" />
            {/* inner red flesh */}
            <path d="M-74,-30 C-74,44 74,44 74,-30 Z" fill="#FF6B4A" stroke="#1C1917" strokeWidth="6" />
            
            {/* Shocked big eyes (like cartoon stickers) */}
            <circle cx="-25" cy="-5" r="16" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />
            <circle cx="25" cy="-5" r="16" fill="#FAF6F0" stroke="#1C1917" strokeWidth="6" />
            <circle cx="-25" cy="-5" r="6" fill="#1C1917" />
            <circle cx="25" cy="-5" r="6" fill="#1C1917" />

            {/* Gaping tiny oval scream mouth */}
            <ellipse cx="0" cy="18" rx="12" ry="16" fill="#1C1917" />

            {/* Little black seeds scattered around */}
            <circle cx="-45" cy="5" r="3" fill="#1C1917" />
            <circle cx="45" cy="5" r="3" fill="#1C1917" />
            <circle cx="-15" cy="-20" r="3" fill="#1C1917" />
            <circle cx="15" cy="-20" r="3" fill="#1C1917" />
          </g>
        );

      case 'retro-badge':
        return (
          <g>
            {/* Seal background star shape */}
            <path d="M-80,-20 L-60,-60 L-20,-80 L20,-80 L60,-60 L80,-20 L80,20 L60,60 L20,80 L-20,80 L-60,60 L-80,20 Z" fill="#F59E0B" stroke="#1C1917" strokeWidth="10" />
            <circle cx="0" cy="0" r="60" fill="#FAF6F0" stroke="#1C1917" strokeWidth="8" />
            <circle cx="0" cy="0" r="50" fill="none" stroke="#FF6B4A" strokeWidth="4" strokeDasharray="6,4" />
            
            {/* Bold Trust Text inside seal */}
            <text x="0" y="-12" textAnchor="middle" fill="#1C1917" fontSize="13" fontWeight="900" fontFamily='"Space Grotesk", sans-serif' letterSpacing="1">
              COVE
            </text>
            <text x="0" y="8" textAnchor="middle" fill="#0D9488" fontSize="14" fontWeight="800" fontFamily='"JetBrains Mono", monospace'>
              99.98%
            </text>
            <text x="0" y="26" textAnchor="middle" fill="#1C1917" fontSize="10" fontWeight="900" fontFamily='sans-serif'>
              GUARANTEED
            </text>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 text-left" id="social-media-kit-section">
      {/* Intro Hero Block */}
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 animate-bounce" />
              Cove Systems Social Media & Thumbnail Suite
            </h2>
            <p className="text-stone-600 mt-1 max-w-2xl text-sm leading-relaxed">
              Generate pixel-perfect banners, profile cards, and <strong>high-click YouTube-ready thumbnails</strong> with MrBeast-inspired face shocked expressions, warm solar background color blends, and clean typography layouts. Just configure the parameters below and trigger a high-definition download!
            </p>
          </div>
          <div className="flex items-center gap-1.5 self-center">
            <span className="text-xs font-mono font-bold text-stone-500">FORMAT:</span>
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-bold font-space border-2 border-stone-900 bg-[#FAF6F0] rounded-xl focus:outline-none"
            >
              <option value="png">PNG Rasterized (High-Res)</option>
              <option value="svg">SVG Vector Layout</option>
            </select>
          </div>
        </div>
      </div>

      {/* Universal Workspace Tab Selector */}
      <div className="flex border-b-2 border-stone-900 gap-1 overflow-x-auto scrollbar-none pb-0.5">
        <button
          onClick={() => setActiveTab('designer')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-space rounded-t-xl border-t-2 border-r-2 border-l-2 border-stone-900 transition-all cursor-pointer transition-colors duration-150 shrink-0 ${
            activeTab === 'designer'
              ? 'bg-stone-900 text-white shadow-[0px_2.5px_0px_0px_rgba(28,25,23,1)]'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border-stone-900'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-500" />
          <span>⚡ Campaign Assets & Cards Designer</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('character_creator');
            setStickerType('custom-creator'); // Auto-bridge custom sticker selection in template
          }}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-space rounded-t-xl border-t-2 border-r-2 border-l-2 border-stone-900 transition-all cursor-pointer transition-colors duration-150 shrink-0 ${
            activeTab === 'character_creator'
              ? 'bg-stone-900 text-white shadow-[0px_2.5px_0px_0px_rgba(28,25,23,1)]'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border-stone-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>🍉 Beach Picnic Sticker & Creator Studio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Dynamic Controls Panel */}
        <div className="lg:col-span-5 bg-[#FAF6F0] border-2 border-stone-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
          {activeTab === 'designer' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B4A] font-mono flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> Layout Configurator
                </h3>
                <span className="text-[10px] font-mono bg-[#E0F2FE] border border-sky-300 text-sky-800 px-2 py-0.5 rounded font-bold">
                  Card Presets
                </span>
              </div>
    
              {/* Quick presets selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">Launch a Campaign Preset:</label>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto border border-stone-200 p-2 rounded-xl bg-white/70">
              {PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white font-bold'
                        : 'hover:bg-stone-100 text-stone-600'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className="text-[9px] uppercase font-mono py-0.5 px-1.5 bg-stone-200 text-stone-800 rounded font-bold">
                      {preset.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* Texts inputs */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> Core Headline (Max Impact):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                placeholder="Core title..."
                className="w-full px-3 py-2 text-xs font-bold border-2 border-stone-900 bg-white rounded-xl focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] font-space"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-750 block">Sub-statement:</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Subtitle or feature..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 bg-white rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-750 block">CTA Badge Text:</label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value.toUpperCase())}
                  placeholder="e.g. JOIN LIVE"
                  className="w-full px-3 py-2 text-xs border border-stone-300 bg-white rounded-lg focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Color overrides */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Canvas Background:</label>
              <div className="flex gap-1.5 items-center bg-white p-1.5 border border-stone-300 rounded-xl">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-stone-500 uppercase">{bgColor}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Accent Secondary:</label>
              <div className="flex gap-1.5 items-center bg-white p-1.5 border border-stone-300 rounded-xl">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-stone-500 uppercase">{accentColor}</span>
              </div>
            </div>
          </div>

          {/* Select and position active expression sticker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-750 block">Choose Brand Expression Sticker:</label>
              <span className="text-[9px] uppercase font-mono text-stone-400">MrBeast inspired</span>
            </div>
            
            <select
              value={stickerType}
              onChange={(e) => setStickerType(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border-2 border-stone-900 bg-white rounded-xl focus:outline-none font-space font-medium"
            >
              <option value="custom-creator">🎨 [STUDIO] My Custom Sticker Character & Scenery</option>
              <option value="joe-shocked">⚡ Joe — Hyper-Shocked (MrBeast Mouth Shock)</option>
              <option value="joe-laser">🔥 Joe — Determined Laser Eyes</option>
              <option value="serena-excited">⛱️ Serena — Excited Sparkle Shout!</option>
              <option value="serena-calm">🍉 Serena — Coastal Calm Serenity</option>
              <option value="watermelon-shocked">🍉 Cartoon — Screaming Watermelon</option>
              <option value="retro-badge">💎 Logo — Cove Guarantee Stamp</option>
            </select>

            {/* Sticker positioning controls */}
            <div className="space-y-1 pt-1.5">
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>Sticker Width Scale (<strong>{stickerScale.toFixed(2)}x</strong>)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={stickerScale}
                onChange={(e) => setStickerScale(Number(e.target.value))}
                className="w-full accent-[#FF6B4A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1.5">
              <div>
                <span className="text-[11px] text-stone-600 block">Horizon X (<strong>{stickerX}%</strong>)</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={stickerX}
                  onChange={(e) => setStickerX(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
              <div>
                <span className="text-[11px] text-stone-600 block">Vertical Y (<strong>{stickerY}%</strong>)</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={stickerY}
                  onChange={(e) => setStickerY(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
            </div>
          </div>

          {/* Border style selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-stone-705 block">Border Graphic Accent:</span>
            <div className="flex gap-2">
              {[
                { id: 'retro', label: 'Thick Retro' },
                { id: 'glow', label: 'Neon Glow' },
                { id: 'minimal', label: 'Minimal Flat' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setBorderStyle(style.id as any)}
                  className={`flex-1 py-1.5 text-[10px] font-bold font-space rounded-xl border transition-all cursor-pointer ${
                    borderStyle === style.id
                      ? 'bg-stone-900 text-white border-stone-950 shadow-[1px_1px_0px_0px_rgba(255,107,74,1)]'
                      : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-250'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Edits History Rail */}
          <div className="space-y-2 border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-indigo-500" />
                ⏳ Recent Edits History (Last 3)
              </label>
              <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold uppercase">
                Save on Download
              </span>
            </div>
            
            {history.length === 0 ? (
              <div className="bg-white/40 border-2 border-dashed border-stone-300 rounded-xl p-3 text-center text-[10px] text-stone-500 leading-normal">
                No recently saved configurations. Trigger downloads or click the button below to capture active state!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {history.map((snap: any, index: number) => (
                  <div 
                    key={snap.id || index}
                    className="bg-white border-2 border-stone-900 p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] flex items-center justify-between gap-2.5 hover:bg-stone-50 transition-all"
                  >
                    <button 
                      onClick={() => loadSnapshot(snap)}
                      className="flex-1 text-left cursor-pointer group"
                    >
                      <div className="font-space font-bold text-xs text-stone-900 truncate group-hover:text-[#FF6B4A] transition-colors">
                        {snap.title || 'Untitled Design'}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-stone-500 font-mono">
                        <span className="bg-stone-100 px-1 py-0.2 rounded font-bold text-stone-700">{snap.presetType || 'custom'}</span>
                        <span>{snap.timestamp}</span>
                      </div>
                    </button>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => loadSnapshot(snap)}
                        title="Revert configuration"
                        className="p-1 hover:bg-amber-50 rounded-lg text-amber-600 transition-colors border border-transparent hover:border-amber-250 cursor-pointer"
                      >
                        <Undo className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeSnapshot(snap.id)}
                        title="Delete Snapshot"
                        className="p-1 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors border border-transparent hover:border-rose-250 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Manual Snapshot capture trigger */}
            <div className="flex gap-1.5">
              <button
                onClick={() => saveSnapshot()}
                className="w-full py-1.5 px-3 bg-[#FAF6F0] hover:bg-stone-100 text-stone-900 text-[10px] font-bold font-space rounded-xl border-2 border-stone-900 shadow-[1.5px_1.5px_0px_0px_rgba(28,25,23,1)] flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Save Active State to History</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B4A] font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> Picnic Sticker Studio
                </h3>
                <span className="text-[10px] font-mono bg-stone-900 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Bespoke Assets
                </span>
              </div>

              {/* 1. Character Character Base Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Select Character Base Model:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'joe', name: '🏄‍♂️ Joe Shore Boy', desc: 'Edgy spiky razor slits' },
                    { id: 'serena', name: '⛱️ Serena Beach Girl', desc: 'Calm or excited flow' },
                    { id: 'duo', name: '🧺 Dynamic Picnic Duo', desc: 'Both on the grass mat' },
                    { id: 'watermelon_cute', name: '🍉 Baby Watermelon', desc: 'Cute rosy seeds baby' },
                    { id: 'picnic_props', name: '📦 Gourmet Basket', desc: 'Burger & checks mat' }
                  ].map((char) => (
                    <button
                      key={char.id}
                      onClick={() => setStudioCharacter(char.id as any)}
                      className={`p-2.5 rounded-xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between h-[68px] ${
                        studioCharacter === char.id
                          ? 'border-stone-900 bg-amber-50 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] font-bold'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs text-stone-900 block truncate">{char.name}</span>
                      <span className="text-[9px] text-stone-500 block leading-tight font-mono">{char.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Face Expressions Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Expressive Face Emotion:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'smile', label: '😀 Joy Smile' },
                    { id: 'shock', label: '😮 MrBeast Shock' },
                    { id: 'laser', label: '💥 Battle Lasers' },
                    { id: 'laugh', label: '😆 squinty Laugh' },
                    { id: 'calm', label: '😴 Zen Peace' }
                  ].map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => setStudioExpression(ex.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border-2 cursor-pointer transition-all ${
                        studioExpression === ex.id
                          ? 'border-stone-900 bg-stone-900 text-white font-bold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Beach Backdrop Scenery Design */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Backdrop Environment Scenery Sky:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'noon', label: 'noon ☀️' },
                    { id: 'sunset', label: 'sunset 🌇' },
                    { id: 'night', label: 'night 🌌' },
                    { id: 'striped', label: 'stripes 🎨' }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setStudioScenery(sc.id as any)}
                      className={`py-1.5 text-[10px] uppercase font-bold font-space rounded-xl border-2 cursor-pointer text-center transition-all ${
                        studioScenery === sc.id
                          ? 'border-stone-900 bg-teal-50 text-teal-900 font-bold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Accessories options (multiple choices) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Toggle Character Accessories:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'sunglasses', label: '🕶️ Emerald Sunglasses' },
                    { id: 'bandana', label: '🧣 Beach Bandana' },
                    { id: 'earrings', label: '🪙 Hoop Earrings' },
                    { id: 'palm_leaves', label: '🌴 Overhanging Palms' }
                  ].map((acc) => {
                    const isChecked = studioAccessories.includes(acc.id);
                    return (
                      <button
                        key={acc.id}
                        onClick={() => {
                          if (isChecked) {
                            setStudioAccessories(studioAccessories.filter(a => a !== acc.id));
                          } else {
                            setStudioAccessories([...studioAccessories, acc.id]);
                          }
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xl border-2 cursor-pointer flex items-center gap-1.5 transition-all ${
                          isChecked
                            ? 'border-stone-900 bg-teal-50 text-teal-900 shadow-[1px_1px_0px_0px_rgba(28,25,23,1)]'
                            : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${isChecked ? 'bg-teal-600' : 'bg-stone-200'}`} />
                        <span>{acc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Food / Picnic Handheld Toy Props */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Picnic Toys & Handheld items:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: 'Empty Handed' },
                    { id: 'burger', label: '🍔 Beach Burger' },
                    { id: 'watermelon', label: '🍉 Watermelon' },
                    { id: 'soda', label: '🥤 Orange Soda' },
                    { id: 'fork', label: '🍴 Pic Fork' },
                    { id: 'sunglasses', label: '🕶️ Sunglasses' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setStudioHandheld(item.id as any)}
                      className={`p-2 rounded-xl text-[11px] font-medium border-2 cursor-pointer text-center transition-all ${
                        studioHandheld === item.id
                          ? 'border-stone-900 bg-amber-50 text-amber-900 font-bold shadow-[1px_1px_0px_0px_rgba(28,25,23,1)]'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Dynamic Color Swatches customized */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-700 block">Joe T-Shirt Color:</label>
                  <div className="flex gap-1.5">
                    {['#F97316', '#EF4444', '#3B82F6', '#10B981', '#1C1917'].map((col) => (
                      <button
                        key={col}
                        aria-label={`Select Joe T-Shirt color ${col}`}
                        onClick={() => setStudioTeeColor(col)}
                        style={{ backgroundColor: col }}
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${
                          studioTeeColor === col ? 'border-stone-900 scale-120 ring-2 ring-amber-300' : 'border-stone-300 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-700 block">Serena Bandana Color:</label>
                  <div className="flex gap-1.5">
                    {['#FF6B4A', '#0D9488', '#EC4899', '#D97706', '#E2E8F0'].map((col) => (
                      <button
                        key={col}
                        aria-label={`Select Serena Bandana color ${col}`}
                        onClick={() => setStudioBandanaColor(col)}
                        style={{ backgroundColor: col }}
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${
                          studioBandanaColor === col ? 'border-stone-900 scale-120 ring-2 ring-emerald-300' : 'border-stone-300 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Virtual HTML5/SVG Interactive Template Device Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 font-mono flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Live Workspace Canvas Preview
            </h3>
            <span className="text-xs font-mono text-stone-500 font-semibold bg-white px-2.5 py-0.5 rounded border border-stone-200">
              {label}
            </span>
          </div>

          {/* Dynamic SVG Container mapped inside frame border */}
          <div className="p-4 bg-stone-200 border-2 border-stone-900 rounded-3xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex items-center justify-center overflow-x-auto">
            <div className={`w-full max-w-full ${aspect} relative bg-stone-950 shadow-md border border-stone-800 transition-all text-left`}>
              {/* Dynamic SVG Rendered with Unified Layout Engine */}
              {renderCoveSvg(selectedPreset.type, w, h, undefined, svgRef)}

              {/* Hidden high resolution Canvas for PNG image conversions */}
              <canvas ref={canvasRef} width={w} height={h} className="hidden" />
            </div>
          </div>

          {/* Hidden offscreen container used for ZIP bundle export generation */}
          <div className="absolute opacity-0 pointer-events-none overflow-hidden w-1 h-1 -top-10 -left-10 bg-transparent">
            {renderCoveSvg('thumbnail', 1280, 720, 'offscreen-thumbnail')}
            {renderCoveSvg('banner', 1200, 400, 'offscreen-banner')}
            {renderCoveSvg('avatar', 500, 500, 'offscreen-avatar')}
            
            <canvas id="canvas-thumbnail" width={1280} height={720} />
            <canvas id="canvas-banner" width={1200} height={400} />
            <canvas id="canvas-avatar" width={500} height={500} />
          </div>

          {/* Interactive Actions */}
          <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="text-left flex-1">
              <span className="text-xs font-bold text-stone-900 block flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#0D9488]" /> Verified Cove Identity Compliant
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5 max-w-sm leading-normal">
                Generates optimal contrast layout algorithms natively to maximize your professional audience and user actions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-5 py-3 bg-stone-950 hover:bg-stone-850 text-[#FAF6F0] text-xs font-bold font-space rounded-xl border border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] transform active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#FF6B4A]" />
                <span>Single {downloadFormat.toUpperCase()}</span>
              </button>

              <button
                onClick={handleDownloadAllZip}
                disabled={zippingState === 'generating'}
                className={`w-full sm:w-auto px-5 py-3 text-xs font-bold font-space rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  zippingState === 'generating'
                    ? 'bg-stone-200 text-stone-400 border-stone-300 shadow-none cursor-not-allowed'
                    : 'bg-[#FF6B4A] hover:bg-[#ff5530] text-white border-stone-950 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] transform active:translate-y-0.5'
                }`}
              >
                {zippingState === 'generating' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                    <span>Bundling Assets...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-[#FAF6F0]" />
                    <span>Download All Sizes (ZIP)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Toast Alert showing success status */}
          {copiedNotification && (
            <div className="bg-emerald-50 border-2 border-emerald-500 p-3 rounded-xl flex items-center gap-2.5 text-left text-xs text-emerald-800 animate-slideUp">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Asset Export Process Complete!</strong> Your brand new {downloadFormat.toUpperCase()} graphic was created successfully and saved directly to your local downloads pool. Look amazing out there!
              </span>
            </div>
          )}

          {zippingState === 'done' && (
            <div className="bg-teal-50 border-2 border-teal-500 p-3 rounded-xl flex items-center gap-2.5 text-left text-xs text-teal-800 animate-slideUp">
              <Check className="w-5 h-5 text-teal-600 shrink-0" />
              <span>
                <strong>All Asset Sizes Generated Successfully!</strong> Your master campaign assets (Thumbnail, Banner, and Avatar/Stamp) have been compiled simultaneously, zipped safely inside a single archive, and dispatched directly in pristine high-resolution {downloadFormat.toUpperCase()} files. Happy branding!
              </span>
            </div>
          )}

          {zippingState === 'error' && (
            <div className="bg-rose-50 border-2 border-rose-500 p-3 rounded-xl flex items-center gap-2.5 text-left text-xs text-rose-800 animate-slideUp">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>
                <strong>An error occurred while zipping assets.</strong> Please try again, or make sure your browser permits canvas asset compilation.
              </span>
            </div>
          )}

          {/* Standing Sticker Direct PNG/SVG Exporter */}
          {activeTab === 'character_creator' && (
            <div className="bg-white border-2 border-stone-900 rounded-2xl p-5 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                <h4 className="text-xs font-extrabold uppercase font-mono tracking-widest text-amber-600 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> Isolated Sticker Pack Export
                </h4>
                <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  TRANSPARENT BG
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-5">
                {/* Independent sticker card representation */}
                <div className="w-[120px] h-[120px] border-2 border-dashed border-stone-300 bg-stone-50 rounded-2xl flex items-center justify-center p-2 shrink-0 relative shadow-inner overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ 
                    backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)', 
                    backgroundSize: '8px 8px' 
                  }} />
                  <svg 
                    id="standalone-studio-sticker" 
                    viewBox="-110 -110 220 220" 
                    className="w-full h-full relative z-10"
                  >
                    {renderStudioStickerJSX()}
                  </svg>
                </div>
                
                <div className="text-left space-y-2 flex-1">
                  <p className="text-xs text-stone-600 leading-normal">
                    Export your custom Picnic design as an independent <strong>high-resolution transparent sticker asset</strong>. Ideal for adding as overlays in Photoshop, Premiere, Figma, or embedding in websites directly!
                  </p>
                  
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        const svgEl = document.getElementById("standalone-studio-sticker");
                        if (!svgEl) return;
                        const svgString = new XMLSerializer().serializeToString(svgEl);
                        
                        if (downloadFormat === 'svg') {
                          const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
                          const url = URL.createObjectURL(svgBlob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `cove-sticker-${studioCharacter}-${Date.now()}.svg`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(url);
                        } else {
                          const img = new Image();
                          const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
                          const url = URL.createObjectURL(svgBlob);
                          
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = 500;
                            canvas.height = 500;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                              ctx.clearRect(0, 0, 500, 500);
                              ctx.drawImage(img, 0, 0, 500, 500);
                              const pngUrl = canvas.toDataURL("image/png");
                              const link = document.createElement("a");
                              link.href = pngUrl;
                              link.download = `cove-sticker-${studioCharacter}-${Date.now()}.png`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }
                            URL.revokeObjectURL(url);
                          };
                          img.src = url;
                        }
                        
                        setCopiedNotification(true);
                        setTimeout(() => setCopiedNotification(false), 3000);
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-[#FAF6F0] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-900" />
                      <span>Download Isolated sticker ({downloadFormat.toUpperCase()})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional instructions card */}
          <div className="bg-[#FAF6F0] border border-stone-200 p-4 rounded-xl text-left space-y-2">
            <h4 className="text-xs font-bold text-stone-900">How to use these assets:</h4>
            <ul className="text-[10px] text-stone-600 space-y-1 list-disc pl-4 leading-normal">
              <li><strong>YouTube Thumbnails</strong>: Keep text extremely brief (4-5 words maximum). Choose "Joe Shocked" or "Excited Serena" for maximum clicks!</li>
              <li><strong>LinkedIn Banners</strong>: Use the "Minimal Flat" border style and a calm aesthetic color blend to match developer expectations.</li>
              <li><strong>Stamp Avatars</strong>: Position target elements around the horizontal center (stickerX: 50%, stickerY: 55%) for circular web masks.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
