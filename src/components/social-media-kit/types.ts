import { BRAND_COLORS } from '../../brandData';

export interface GraphicPreset {
  id: string;
  name: string;
  type: 'thumbnail' | 'banner' | 'avatar';
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
}

export type StickerType = 
  | 'joe-shocked' 
  | 'joe-laser' 
  | 'serena-excited' 
  | 'serena-calm' 
  | 'watermelon-shocked' 
  | 'retro-badge'
  | 'custom-creator';

export type CharacterType = 'joe' | 'serena' | 'duo' | 'watermelon_cute' | 'picnic_props';
export type ExpressionType = 'shock' | 'laser' | 'laugh' | 'calm' | 'smile';
export type HandheldType = 'burger' | 'watermelon' | 'soda' | 'fork' | 'sunglasses' | 'none';
export type SceneryType = 'noon' | 'sunset' | 'night' | 'striped' | 'none';
export type AccessoryType = 'sunglasses' | 'earrings' | 'palm_leaves';

export const PRESETS: GraphicPreset[] = [
  {
    id: 'yt-shock-deploy',
    name: "⚡ YT Thumbnail: Shock Deploy",
    type: 'thumbnail',
    title: "I DEPLOYED TO PORT 3000 ENGINE!",
    subtitle: "And the Servers Didn't Crash once...",
    ctaText: "99.98% FLOW",
    bgColor: BRAND_COLORS.solOrange.hex,
    accentColor: BRAND_COLORS.sunsetGold.hex,
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
    bgColor: BRAND_COLORS.oceanTeal.hex,
    accentColor: BRAND_COLORS.solOrange.hex,
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
    bgColor: BRAND_COLORS.sandAlabaster.hex,
    accentColor: BRAND_COLORS.oceanTeal.hex,
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
    bgColor: BRAND_COLORS.deepCharcoal.hex,
    accentColor: BRAND_COLORS.solOrange.hex,
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
    bgColor: BRAND_COLORS.solOrange.hex,
    accentColor: BRAND_COLORS.deepCharcoal.hex,
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
    bgColor: BRAND_COLORS.sandAlabaster.hex,
    accentColor: BRAND_COLORS.oceanTeal.hex,
    stickerType: 'serena-calm',
    stickerScale: 1.7,
    stickerX: 52,
    stickerY: 54,
    borderStyle: 'minimal',
  }
];

export const STICKER_LABELS: Record<StickerType, string> = {
  'custom-creator': '🎨 [STUDIO] My Custom Sticker Character & Scenery',
  'joe-shocked': '⚡ Joe — Hyper-Shocked (MrBeast Mouth Shock)',
  'joe-laser': '🔥 Joe — Determined Laser Eyes',
  'serena-excited': '⛱️ Serena — Excited Sparkle Shout!',
  'serena-calm': '🍉 Serena — Coastal Calm Serenity',
  'watermelon-shocked': '🍉 Cartoon — Screaming Watermelon',
  'retro-badge': '💎 Logo — Cove Guarantee Stamp',
};

export const CHARACTER_OPTIONS: { value: CharacterType; label: string }[] = [
  { value: 'joe', label: '👦 Joe - Lead Dev' },
  { value: 'serena', label: '👩 Serena - UX Architect' },
  { value: 'duo', label: '👥 Duo - Joe & Serena' },
  { value: 'watermelon_cute', label: '🍉 Watermelon Mascot' },
  { value: 'picnic_props', label: '🧺 Picnic Props Only' },
];

export const EXPRESSION_OPTIONS: { value: ExpressionType; label: string }[] = [
  { value: 'shock', label: '😲 Shocked' },
  { value: 'laser', label: '🔥 Laser Focus' },
  { value: 'laugh', label: '😂 Laughing' },
  { value: 'calm', label: '😌 Calm' },
  { value: 'smile', label: '😊 Smile' },
];

export const HANDHELD_OPTIONS: { value: HandheldType; label: string }[] = [
  { value: 'burger', label: '🍔 Burger' },
  { value: 'watermelon', label: '🍉 Watermelon' },
  { value: 'soda', label: '🥤 Soda' },
  { value: 'fork', label: '🍴 Fork' },
  { value: 'sunglasses', label: '🕶️ Sunglasses' },
  { value: 'none', label: '❌ None' },
];

export const SCENERY_OPTIONS: { value: SceneryType; label: string }[] = [
  { value: 'noon', label: '☀️ Noon Sun' },
  { value: 'sunset', label: '🌅 Sunset' },
  { value: 'night', label: '🌙 Night' },
  { value: 'striped', label: '🏖️ Striped Towel' },
  { value: 'none', label: '❌ None' },
];

export const ACCESSORY_OPTIONS: { value: AccessoryType; label: string }[] = [
  { value: 'sunglasses', label: '🕶️ Sunglasses' },
  { value: 'earrings', label: '💎 Earrings' },
  { value: 'palm_leaves', label: '🌴 Palm Leaves' },
];

export interface DesignSnapshot {
  id: string;
  name: string;
  timestamp: string;
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
  presetType: 'thumbnail' | 'banner' | 'avatar';
  studioCharacter: CharacterType;
  studioExpression: ExpressionType;
  studioHandheld: HandheldType;
  studioScenery: SceneryType;
  studioBandanaColor: string;
  studioTeeColor: string;
  studioAccessories: AccessoryType[];
}
