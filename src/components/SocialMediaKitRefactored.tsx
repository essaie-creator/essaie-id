/**
 * Cove Systems Social Media & Thumbnail Suite
 * Refactored into smaller, maintainable components
 */

import React, { useState, useRef } from 'react';
import { 
  Download, Sparkles, Sliders, Type, Zap, AlertCircle, History, 
  Bookmark, Trash2, Undo, Check 
} from 'lucide-react';
import JSZip from 'jszip';
import type { GraphicPreset, DesignSnapshot, StickerType } from './social-media-kit/types';
import { PRESETS } from './social-media-kit/types';
import { StickerRenderer } from './social-media-kit/StickerRenderer';
import { useDesignHistory } from '../hooks/useDesignHistory';
import { getGraphicDimensions, svgToPng, downloadBlob } from '../utils/imageUtils';
import type { CharacterType, ExpressionType, HandheldType, SceneryType, AccessoryType } from './social-media-kit/types';

export default function SocialMediaKit() {
  // Designer state
  const [selectedPreset, setSelectedPreset] = useState<GraphicPreset>(PRESETS[0]);
  const [title, setTitle] = useState(PRESETS[0].title);
  const [subtitle, setSubtitle] = useState(PRESETS[0].subtitle);
  const [ctaText, setCtaText] = useState(PRESETS[0].ctaText);
  const [bgColor, setBgColor] = useState(PRESETS[0].bgColor);
  const [accentColor, setAccentColor] = useState(PRESETS[0].accentColor);
  const [stickerType, setStickerType] = useState<StickerType>(PRESETS[0].stickerType);
  const [stickerScale, setStickerScale] = useState(PRESETS[0].stickerScale);
  const [stickerX, setStickerX] = useState(PRESETS[0].stickerX);
  const [stickerY, setStickerY] = useState(PRESETS[0].stickerY);
  const [borderStyle, setBorderStyle] = useState<'retro' | 'glow' | 'minimal'>(PRESETS[0].borderStyle);
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png'>('png');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [zippingState, setZippingState] = useState<'idle' | 'generating' | 'done' | 'error'>('idle');

  // Tab state
  const [activeTab, setActiveTab] = useState<'designer' | 'character_creator'>('designer');

  // Studio state
  const [studioCharacter, setStudioCharacter] = useState<CharacterType>('joe');
  const [studioExpression, setStudioExpression] = useState<ExpressionType>('smile');
  const [studioHandheld, setStudioHandheld] = useState<HandheldType>('burger');
  const [studioScenery, setStudioScenery] = useState<SceneryType>('noon');
  const [studioBandanaColor, setStudioBandanaColor] = useState('#FF6B4A');
  const [studioTeeColor, setStudioTeeColor] = useState('#FF6B4A');
  const [studioAccessories, setStudioAccessories] = useState<AccessoryType[]>(['sunglasses', 'earrings', 'palm_leaves']);

  // Custom hook for history management
  const { history, saveSnapshot: saveToHistory, removeSnapshot: removeFromHistory } = useDesignHistory();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const dims = getGraphicDimensions(selectedPreset.type);

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

  const handleSaveSnapshot = () => {
    saveToHistory({
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
      studioAccessories,
    });
  };

  const handleLoadSnapshot = (snap: DesignSnapshot) => {
    setTitle(snap.title);
    setSubtitle(snap.subtitle);
    setCtaText(snap.ctaText);
    setBgColor(snap.bgColor);
    setAccentColor(snap.accentColor);
    setStickerType(snap.stickerType);
    setStickerScale(snap.stickerScale);
    setStickerX(snap.stickerX);
    setStickerY(snap.stickerY);
    setBorderStyle(snap.borderStyle);
    setStudioCharacter(snap.studioCharacter);
    setStudioExpression(snap.studioExpression);
    setStudioHandheld(snap.studioHandheld);
    setStudioScenery(snap.studioScenery);
    setStudioBandanaColor(snap.studioBandanaColor);
    setStudioTeeColor(snap.studioTeeColor);
    setStudioAccessories(snap.studioAccessories);
    
    const matchingPreset = PRESETS.find(p => p.type === snap.presetType);
    if (matchingPreset) setSelectedPreset(matchingPreset);
  };

  const handleDownload = async () => {
    if (!svgRef.current) return;

    try {
      const blob = await svgToPng(svgRef.current, downloadFormat);
      const filename = `cove-branding-${selectedPreset.type}-${Date.now()}.${downloadFormat}`;
      downloadBlob(blob, filename);
      
      handleSaveSnapshot();
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setZippingState('error');
    }
  };

  const handleDownloadAllZip = async () => {
    setZippingState('generating');
    try {
      const zip = new JSZip();
      const types: ('thumbnail' | 'banner' | 'avatar')[] = ['thumbnail', 'banner', 'avatar'];

      for (const type of types) {
        const typeDims = getGraphicDimensions(type);
        // Create temporary SVG for each type
        const svgContent = renderSvgContent(type, typeDims.width, typeDims.height);
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        zip.file(`cove-${type}.${downloadFormat === 'svg' ? 'svg' : 'png'}`, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      downloadBlob(content, `cove-brand-kit-${Date.now()}.zip`);
      setZippingState('done');
      setTimeout(() => setZippingState('idle'), 5000);
    } catch (error) {
      console.error('ZIP generation failed:', error);
      setZippingState('error');
    }
  };

  const renderSvgContent = (type: 'thumbnail' | 'banner' | 'avatar', sw: number, sh: number) => {
    return `
      <svg viewBox="0 0 ${sw} ${sh}" width="${sw}" height="${sh}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${sw}" height="${sh}" fill="${bgColor}" />
        <circle cx="${sw * 0.25}" cy="${sh * 0.5}" r="${sh * 0.45}" fill="${accentColor}" opacity="0.18" />
        <text x="20" y="${sh * 0.5}" fill="#1C1917" font-size="${sh * 0.08}" font-weight="900" font-family="Space Grotesk">${title}</text>
      </svg>
    `;
  };

  return (
    <div className="space-y-8 text-left" id="social-media-kit-section" role="region" aria-label="Social Media Kit">
      {/* Hero Section */}
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-space text-stone-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 animate-bounce" aria-hidden="true" />
              Cove Systems Social Media & Thumbnail Suite
            </h2>
            <p className="text-stone-600 mt-1 max-w-2xl text-sm leading-relaxed">
              Generate pixel-perfect banners, profile cards, and <strong>high-click YouTube-ready thumbnails</strong> with MrBeast-inspired expressions.
            </p>
          </div>
          <div className="flex items-center gap-1.5 self-center">
            <label htmlFor="format-select" className="text-xs font-mono font-bold text-stone-500">FORMAT:</label>
            <select
              id="format-select"
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as 'svg' | 'png')}
              className="px-3 py-1.5 text-xs font-bold font-space border-2 border-stone-900 bg-[#FAF6F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500"
              aria-label="Select download format"
            >
              <option value="png">PNG Rasterized (High-Res)</option>
              <option value="svg">SVG Vector Layout</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b-2 border-stone-900 gap-1 overflow-x-auto pb-0.5" role="tablist">
        <button
          onClick={() => setActiveTab('designer')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-space rounded-t-xl border-t-2 border-r-2 border-l-2 border-stone-900 transition-all cursor-pointer ${
            activeTab === 'designer'
              ? 'bg-stone-900 text-white shadow-[0px_2.5px_0px_0px_rgba(28,25,23,1)]'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
          role="tab"
          aria-selected={activeTab === 'designer'}
          aria-controls="designer-panel"
        >
          <Sliders className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <span>⚡ Campaign Assets Designer</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('character_creator');
            setStickerType('custom-creator');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-space rounded-t-xl border-t-2 border-r-2 border-l-2 border-stone-900 transition-all cursor-pointer ${
            activeTab === 'character_creator'
              ? 'bg-stone-900 text-white shadow-[0px_2.5px_0px_0px_rgba(28,25,23,1)]'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
          role="tab"
          aria-selected={activeTab === 'character_creator'}
          aria-controls="creator-panel"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" aria-hidden="true" />
          <span>🍉 Beach Picnic Sticker Studio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-5 bg-[#FAF6F0] border-2 border-stone-900 p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
          {activeTab === 'designer' ? (
            <DesignerControls
              selectedPreset={selectedPreset}
              title={title}
              subtitle={subtitle}
              ctaText={ctaText}
              bgColor={bgColor}
              accentColor={accentColor}
              stickerType={stickerType}
              stickerScale={stickerScale}
              stickerX={stickerX}
              stickerY={stickerY}
              borderStyle={borderStyle}
              onApplyPreset={applyPreset}
              onSetTitle={setTitle}
              onSetSubtitle={setSubtitle}
              onSetCtaText={setCtaText}
              onSetBgColor={setBgColor}
              onSetAccentColor={setAccentColor}
              onSetStickerType={setStickerType}
              onSetStickerScale={setStickerScale}
              onSetStickerX={setStickerX}
              onSetStickerY={setStickerY}
              onSetBorderStyle={setBorderStyle}
              history={history}
              onLoadSnapshot={handleLoadSnapshot}
              onRemoveSnapshot={removeFromHistory}
              onSaveSnapshot={handleSaveSnapshot}
            />
          ) : (
            <CreatorControls
              studioCharacter={studioCharacter}
              studioExpression={studioExpression}
              studioHandheld={studioHandheld}
              studioScenery={studioScenery}
              studioBandanaColor={studioBandanaColor}
              studioTeeColor={studioTeeColor}
              studioAccessories={studioAccessories}
              onSetStudioCharacter={setStudioCharacter}
              onSetStudioExpression={setStudioExpression}
              onSetStudioHandheld={setStudioHandheld}
              onSetStudioScenery={setStudioScenery}
              onSetStudioBandanaColor={setStudioBandanaColor}
              onSetStudioTeeColor={setStudioTeeColor}
              onSetStudioAccessories={setStudioAccessories}
            />
          )}
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-7 space-y-6">
          <PreviewPanel
            svgRef={svgRef}
            canvasRef={canvasRef}
            dims={dims}
            bgColor={bgColor}
            accentColor={accentColor}
            title={title}
            subtitle={subtitle}
            ctaText={ctaText}
            stickerType={stickerType}
            stickerScale={stickerScale}
            stickerX={stickerX}
            stickerY={stickerY}
            borderStyle={borderStyle}
            studioCharacter={studioCharacter}
            studioExpression={studioExpression}
            studioHandheld={studioHandheld}
            studioScenery={studioScenery}
            studioBandanaColor={studioBandanaColor}
            studioTeeColor={studioTeeColor}
            studioAccessories={studioAccessories}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 min-w-[200px] py-3 px-4 bg-[#FF6B4A] hover:bg-[#FF886E] border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={`Download graphic as ${downloadFormat}`}
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              <span>Download {dims.label} ({downloadFormat.toUpperCase()})</span>
            </button>
            <button
              onClick={handleDownloadAllZip}
              disabled={zippingState === 'generating'}
              className="flex-1 min-w-[200px] py-3 px-4 bg-[#0D9488] hover:bg-[#14B8A6] border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Download all sizes as ZIP"
            >
              {zippingState === 'generating' ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Download className="w-5 h-5" aria-hidden="true" />
              )}
              <span>{zippingState === 'generating' ? 'Generating...' : 'Download All Sizes (ZIP)'}</span>
            </button>
          </div>

          {/* Notifications */}
          {copiedNotification && (
            <div className="bg-emerald-50 border-2 border-emerald-500 p-3 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800" role="status" aria-live="polite">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span><strong>Export Complete!</strong> Your graphic was downloaded successfully.</span>
            </div>
          )}

          {zippingState === 'done' && (
            <div className="bg-teal-50 border-2 border-teal-500 p-3 rounded-xl flex items-center gap-2.5 text-xs text-teal-800" role="status" aria-live="polite">
              <Check className="w-5 h-5 text-teal-600 shrink-0" aria-hidden="true" />
              <span><strong>All Assets Generated!</strong> Your campaign kit was downloaded.</span>
            </div>
          )}

          {zippingState === 'error' && (
            <div className="bg-rose-50 border-2 border-rose-500 p-3 rounded-xl flex items-center gap-2.5 text-xs text-rose-800" role="alert" aria-live="assertive">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
              <span><strong>Error:</strong> Failed to generate assets. Please try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components would be defined in separate files ideally
// For brevity, including simplified versions here

interface DesignerControlsProps {
  selectedPreset: GraphicPreset;
  title: string;
  subtitle: string;
  ctaText: string;
  bgColor: string;
  accentColor: string;
  stickerType: StickerType;
  stickerScale: number;
  stickerX: number;
  stickerY: number;
  borderStyle: 'retro' | 'glow' | 'minimal';
  onApplyPreset: (preset: GraphicPreset) => void;
  onSetTitle: (title: string) => void;
  onSetSubtitle: (subtitle: string) => void;
  onSetCtaText: (cta: string) => void;
  onSetBgColor: (color: string) => void;
  onSetAccentColor: (color: string) => void;
  onSetStickerType: (type: StickerType) => void;
  onSetStickerScale: (scale: number) => void;
  onSetStickerX: (x: number) => void;
  onSetStickerY: (y: number) => void;
  onSetBorderStyle: (style: 'retro' | 'glow' | 'minimal') => void;
  history: DesignSnapshot[];
  onLoadSnapshot: (snap: DesignSnapshot) => void;
  onRemoveSnapshot: (id: string) => void;
  onSaveSnapshot: () => void;
}

function DesignerControls(props: DesignerControlsProps) {
  const { PRESETS, STICKER_LABELS } = require('./social-media-kit/types');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B4A] font-mono flex items-center gap-1.5">
          <Sliders className="w-4 h-4" aria-hidden="true" /> Layout Configurator
        </h3>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 block">Campaign Presets:</label>
        <div className="space-y-1.5 max-h-[140px] overflow-y-auto border border-stone-200 p-2 rounded-xl bg-white/70">
          {PRESETS.map((preset: GraphicPreset) => (
            <button
              key={preset.id}
              onClick={() => props.onApplyPreset(preset)}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                props.selectedPreset.id === preset.id
                  ? 'bg-stone-900 text-white font-bold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              <span>{preset.name}</span>
              <span className="text-[9px] uppercase font-mono py-0.5 px-1.5 bg-stone-200 text-stone-800 rounded font-bold">
                {preset.type}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Text inputs would go here - simplified for brevity */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-stone-700 block flex items-center gap-1">
            <Type className="w-3.5 h-3.5" aria-hidden="true" /> Headline:
          </label>
          <input
            type="text"
            value={props.title}
            onChange={(e) => props.onSetTitle(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 text-xs font-bold border-2 border-stone-900 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 font-space"
            aria-label="Graphic headline"
          />
        </div>
      </div>

      {/* History */}
      <div className="space-y-2 border-t border-stone-200 pt-4">
        <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
          Recent Edits
        </label>
        {props.history.length === 0 ? (
          <p className="text-[10px] text-stone-500">No saved designs yet.</p>
        ) : (
          props.history.map((snap) => (
            <div key={snap.id} className="bg-white border-2 border-stone-900 p-2.5 rounded-xl flex items-center justify-between">
              <button onClick={() => props.onLoadSnapshot(snap)} className="text-left flex-1">
                <div className="font-space font-bold text-xs truncate">{snap.title}</div>
                <div className="text-[10px] text-stone-500">{snap.timestamp}</div>
              </button>
              <button
                onClick={() => props.onRemoveSnapshot(snap.id)}
                className="p-1 hover:bg-rose-50 rounded text-rose-600"
                aria-label="Delete snapshot"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
        <button
          onClick={props.onSaveSnapshot}
          className="w-full py-1.5 px-3 bg-[#FAF6F0] hover:bg-stone-100 text-stone-900 text-[10px] font-bold rounded-xl border-2 border-stone-900 flex items-center justify-center gap-1"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
          Save Current State
        </button>
      </div>
    </div>
  );
}

interface CreatorControlsProps {
  studioCharacter: CharacterType;
  studioExpression: ExpressionType;
  studioHandheld: HandheldType;
  studioScenery: SceneryType;
  studioBandanaColor: string;
  studioTeeColor: string;
  studioAccessories: AccessoryType[];
  onSetStudioCharacter: (char: CharacterType) => void;
  onSetStudioExpression: (exp: ExpressionType) => void;
  onSetStudioHandheld: (hand: HandheldType) => void;
  onSetStudioScenery: (scene: SceneryType) => void;
  onSetStudioBandanaColor: (color: string) => void;
  onSetStudioTeeColor: (color: string) => void;
  onSetStudioAccessories: (acc: AccessoryType[]) => void;
}

function CreatorControls(props: CreatorControlsProps) {
  const { CHARACTER_OPTIONS, EXPRESSION_OPTIONS, SCENERY_OPTIONS } = require('./social-media-kit/types');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B4A] font-mono">
          Picnic Sticker Studio
        </h3>
      </div>

      {/* Character selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 block">Character:</label>
        <div className="grid grid-cols-2 gap-2">
          {CHARACTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => props.onSetStudioCharacter(opt.value)}
              className={`p-2.5 rounded-xl border-2 text-left text-xs ${
                props.studioCharacter === opt.value
                  ? 'border-stone-900 bg-amber-50'
                  : 'border-stone-200 bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expression selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 block">Expression:</label>
        <div className="flex flex-wrap gap-1.5">
          {EXPRESSION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => props.onSetStudioExpression(opt.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border-2 ${
                props.studioExpression === opt.value
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenery selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 block">Scenery:</label>
        <div className="flex flex-wrap gap-1.5">
          {SCENERY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => props.onSetStudioScenery(opt.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border-2 ${
                props.studioScenery === opt.value
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PreviewPanelProps {
  svgRef: React.RefObject<SVGSVGElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  dims: { width: number; height: number; label: string };
  bgColor: string;
  accentColor: string;
  title: string;
  subtitle: string;
  ctaText: string;
  stickerType: StickerType;
  stickerScale: number;
  stickerX: number;
  stickerY: number;
  borderStyle: 'retro' | 'glow' | 'minimal';
  studioCharacter: CharacterType;
  studioExpression: ExpressionType;
  studioHandheld: HandheldType;
  studioScenery: SceneryType;
  studioBandanaColor: string;
  studioTeeColor: string;
  studioAccessories: AccessoryType[];
}

function PreviewPanel(props: PreviewPanelProps) {
  return (
    <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold font-space">Preview: {props.dims.label}</h3>
        <span className="text-xs text-stone-500 font-mono">{props.borderStyle} border</span>
      </div>
      
      <div className="aspect-video w-full bg-stone-50 rounded-xl overflow-hidden border border-stone-200 relative">
        <svg
          ref={props.svgRef}
          viewBox={`0 0 ${props.dims.width} ${props.dims.height}`}
          className="w-full h-full"
          aria-label="Graphic preview"
        >
          <rect width={props.dims.width} height={props.dims.height} fill={props.bgColor} />
          <circle cx={props.dims.width * 0.25} cy={props.dims.height * 0.5} r={props.dims.height * 0.45} fill={props.accentColor} opacity="0.18" />
          
          {/* Sticker */}
          <g transform={`translate(${props.dims.width * (props.stickerX / 100)}, ${props.dims.height * (props.stickerY / 100)}) scale(${props.stickerScale * (props.dims.height / 320)})`}>
            <StickerRenderer
              type={props.stickerType}
              studioCharacter={props.studioCharacter}
              studioExpression={props.studioExpression}
              studioHandheld={props.studioHandheld}
              studioScenery={props.studioScenery}
              studioBandanaColor={props.studioBandanaColor}
              studioTeeColor={props.studioTeeColor}
              studioAccessories={props.studioAccessories}
            />
          </g>

          {/* Title */}
          <text x="20" y={props.dims.height * 0.4} fill="#1C1917" fontSize={props.dims.height * 0.08} fontWeight="900" fontFamily="Space Grotesk">
            {props.title}
          </text>
          
          {/* Subtitle */}
          <text x="20" y={props.dims.height * 0.55} fill="#57534E" fontSize={props.dims.height * 0.045} fontWeight="500" fontFamily="Inter">
            {props.subtitle}
          </text>

          {/* Border */}
          {props.borderStyle === 'retro' && (
            <rect x="0" y="0" width={props.dims.width} height={props.dims.height} fill="none" stroke="#1C1917" strokeWidth="20" />
          )}
          {props.borderStyle === 'glow' && (
            <rect x="0" y="0" width={props.dims.width} height={props.dims.height} fill="none" stroke={props.accentColor} strokeWidth="12" opacity="0.85" />
          )}
          {props.borderStyle === 'minimal' && (
            <rect x="0" y="0" width={props.dims.width} height={props.dims.height} fill="none" stroke="#1C1917" strokeWidth="4" />
          )}
        </svg>
        
        {/* Hidden canvas for PNG export */}
        <canvas ref={props.canvasRef} width={props.dims.width} height={props.dims.height} className="hidden" />
      </div>
    </div>
  );
}
