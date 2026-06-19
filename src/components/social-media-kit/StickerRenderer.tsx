import React from 'react';
import type { StickerType, CharacterType, ExpressionType, HandheldType, SceneryType, AccessoryType } from './types';

interface StickerRendererProps {
  type: StickerType;
  studioCharacter?: CharacterType;
  studioExpression?: ExpressionType;
  studioHandheld?: HandheldType;
  studioScenery?: SceneryType;
  studioBandanaColor?: string;
  studioTeeColor?: string;
  studioAccessories?: AccessoryType[];
}

export const StickerRenderer: React.FC<StickerRendererProps> = ({
  type,
  studioCharacter = 'joe',
  studioExpression = 'smile',
  studioHandheld = 'none',
  studioScenery = 'none',
  studioBandanaColor = '#FF6B4A',
  studioTeeColor = '#FF6B4A',
  studioAccessories = [],
}) => {
  switch (type) {
    case 'custom-creator':
      return renderStudioStickerJSX(
        studioCharacter,
        studioExpression,
        studioHandheld,
        studioScenery,
        studioBandanaColor,
        studioTeeColor,
        studioAccessories
      );
    case 'joe-shocked':
      return renderJoeShocked();
    case 'joe-laser':
      return renderJoeLaser();
    case 'serena-excited':
      return renderSerenaExcited();
    case 'serena-calm':
      return renderSerenaCalm();
    case 'watermelon-shocked':
      return renderWatermelonShocked();
    case 'retro-badge':
      return renderRetroBadge();
    default:
      return null;
  }
};

const renderStudioStickerJSX = (
  character: CharacterType,
  expression: ExpressionType,
  handheld: HandheldType,
  scenery: SceneryType,
  bandanaColor: string,
  teeColor: string,
  accessories: AccessoryType[]
) => {
  // Simplified studio rendering - can be expanded based on original logic
  return (
    <g>
      {/* Background scenery */}
      {scenery === 'noon' && <circle cx="0" cy="-80" r="40" fill="#F59E0B" opacity="0.3" />}
      {scenery === 'sunset' && (
        <path d="M-100,50 L100,50 L0,-50 Z" fill="#FF6B4A" opacity="0.2" />
      )}
      {scenery === 'striped' && (
        <pattern id="stripePattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#FAF6F0" />
          <path d="M0,0 L20,20 M-10,10 L10,30 M10,-10 L30,10" stroke="#FF6B4A" strokeWidth="2" />
        </pattern>
      )}

      {/* Character body */}
      {character !== 'picnic_props' && (
        <>
          <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />
          <path
            d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z"
            fill={character === 'serena' ? '#DF9269' : '#E69C73'}
            stroke="#1C1917"
            strokeWidth="8"
          />
        </>
      )}

      {/* Expression-based face features */}
      {expression === 'shock' && (
        <>
          <circle cx="-20" cy="-25" r="18" fill="#FAF6F0" stroke="#1C1917" strokeWidth="7" />
          <circle cx="20" cy="-25" r="18" fill="#FAF6F0" stroke="#1C1917" strokeWidth="7" />
          <circle cx="-20" cy="-25" r="6" fill="#1C1917" />
          <circle cx="20" cy="-25" r="6" fill="#1C1917" />
          <path d="M-32,5 C-32,-15 32,-15 32,5 C32,32 15,45 0,45 C-15,45 -32,32 -32,5 Z" fill="#1C1917" />
        </>
      )}
      {expression === 'calm' && (
        <>
          <path d="M-30,-22 Q -20,-12 -12,-22" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          <path d="M12,-22 Q 20,-12 30,-22" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
          <path d="M-15,10 Q 0,22 15,10" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
        </>
      )}
      {expression === 'smile' && (
        <>
          <circle cx="-20" cy="-25" r="12" fill="#FAF6F0" stroke="#1C1917" strokeWidth="5" />
          <circle cx="20" cy="-25" r="12" fill="#FAF6F0" stroke="#1C1917" strokeWidth="5" />
          <circle cx="-20" cy="-25" r="4" fill="#1C1917" />
          <circle cx="20" cy="-25" r="4" fill="#1C1917" />
          <path d="M-20,15 Q0,30 20,15" fill="none" stroke="#1C1917" strokeWidth="6" strokeLinecap="round" />
        </>
      )}

      {/* Accessories */}
      {accessories.includes('sunglasses') && (
        <>
          <rect x="-24" y="-30" width="18" height="14" rx="4" fill="#1C1917" />
          <rect x="6" y="-30" width="18" height="14" rx="4" fill="#1C1917" />
          <path d="M-6,-30 L6,-30" stroke="#1C1917" strokeWidth="4" />
        </>
      )}
      {accessories.includes('earrings') && (
        <>
          <circle cx="-47" cy="5" r="12" fill="none" stroke="#F59E0B" strokeWidth="6" />
          <circle cx="47" cy="5" r="12" fill="none" stroke="#F59E0B" strokeWidth="6" />
        </>
      )}
      {accessories.includes('palm_leaves') && (
        <>
          <path d="M-60,-60 L-80,-80 L-60,-70 Z" fill="#0D9488" />
          <path d="M60,-60 L80,-80 L60,-70 Z" fill="#0D9488" />
        </>
      )}
    </g>
  );
};

const renderJoeShocked = () => (
  <g>
    {/* Background comic spike backglow */}
    <path
      d="M-100,-100 L-40,-50 L-80,0 L-20,20 L-60,80 L0,40 L30,90 L60,20 L100,50 L40,-10 L80,-60 L10,-30 Z"
      fill="#F59E0B"
      opacity="0.35"
      transform="scale(1.7)"
    />

    {/* Neck */}
    <rect x="-24" y="30" width="48" height="60" fill="#CD7F5D" rx="10" stroke="#1C1917" strokeWidth="8" />
    <path d="M-24,60 C-10,75 10,75 24,60" fill="none" stroke="#9A593E" strokeWidth="6" strokeLinecap="round" />

    {/* Ear Ring */}
    <circle cx="-50" cy="5" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" />

    {/* Head Silhouette */}
    <path
      d="M-50,-20 C-50,-80 -30,-90 0,-90 C30,-90 50,-80 50,-20 C50,40 30,50 0,50 C-30,50 -50,40 -50,-20 Z"
      fill="#E69C73"
      stroke="#1C1917"
      strokeWidth="8"
    />

    {/* Spiky Cool Hair (Joe) */}
    <path
      d="M-55,-60 L-70,-100 L-40,-95 L-42,-120 L-15,-105 L-10,-130 L15,-110 L25,-128 L38,-95 L58,-98 L45,-65 L55,-50"
      fill="#1C1917"
      stroke="#1C1917"
      strokeWidth="6"
      strokeLinejoin="miter"
    />
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
    <path
      d="M-32,5 C-32,-15 32,-15 32,5 C32,32 15,45 0,45 C-15,45 -32,32 -32,5 Z"
      fill="#1C1917"
    />
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

const renderJoeLaser = () => (
  <g>
    {/* Neck */}
    <rect x="-24" y="30" width="48" height="60" fill="#CD7F5D" rx="10" stroke="#1C1917" strokeWidth="8" />
    {/* Head */}
    <path
      d="M-50,-20 C-50,-80 -30,-90 0,-90 C30,-90 50,-80 50,-20 C50,40 30,50 0,50 C-30,50 -50,40 -50,-20 Z"
      fill="#E69C73"
      stroke="#1C1917"
      strokeWidth="8"
    />

    {/* Hair */}
    <path
      d="M-55,-60 L-70,-100 L-40,-95 L-42,-120 L-15,-105 L-10,-130 L15,-110 L25,-128 L38,-95 L58,-98 L45,-65 L55,-50"
      fill="#1C1917"
      stroke="#1C1917"
      strokeWidth="6"
    />

    {/* Glowing Laser Eyes! */}
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

const renderSerenaExcited = () => (
  <g>
    {/* Flowy Star Sparks behind background */}
    <path d="M-90,-50 L-110,-40 L-95,-30 L-100,-10 L-85,-25 L-65,-20 L-80,-35 L-70,-55 Z" fill="#F59E0B" />
    <path d="M90,-70 L110,-80 L95,-90 L100,-110 L85,-95 L65,-100 L80,-85 L70,-65 Z" fill="#0D9488" />

    {/* Neck */}
    <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />

    {/* Long Beautiful Flowy Back Hair (Serena) */}
    <path
      d="M-60,-40 C-100,-30 -110,60 -70,110 C-30,140 30,140 70,110 C110,60 100,-30 60,-40 Z"
      fill="#1C1917"
      stroke="#1C1917"
      strokeWidth="6"
    />

    {/* Head Face Silhouette */}
    <path
      d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z"
      fill="#DF9269"
      stroke="#1C1917"
      strokeWidth="8"
    />

    {/* Orange Bandana Headdress Tied with Bow */}
    <path
      d="M-48,-55 C-30,-75 30,-75 48,-55 C52,-45 52,-40 48,-44 C30,-64 -30,-64 -48,-44 C-52,-40 -52,-45 -48,-55 Z"
      fill="#FF6B4A"
      stroke="#1C1917"
      strokeWidth="6"
    />
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
    <path
      d="M-24,2 C-24,-10 24,-10 24,2 C24,24 15,35 0,35 C-15,35 -24,24 -24,2 Z"
      fill="#1C1917"
    />
    {/* Tongue */}
    <path d="M-15,26 C-8,15 8,15 15,26" fill="#FF6B4A" />

    {/* Cute Blush circles */}
    <circle cx="-34" cy="5" r="9" fill="#FF6B4A" opacity="0.45" />
    <circle cx="34" cy="5" r="9" fill="#FF6B4A" opacity="0.45" />

    {/* Hoop Earring details */}
    <circle cx="-47" cy="5" r="12" fill="none" stroke="#F59E0B" strokeWidth="6" />
  </g>
);

const renderSerenaCalm = () => (
  <g>
    {/* Neck */}
    <rect x="-20" y="30" width="40" height="50" fill="#C87652" rx="8" stroke="#1C1917" strokeWidth="8" />
    {/* Back Hair */}
    <path
      d="M-60,-40 C-100,-30 -110,60 -70,110 C-30,140 30,140 70,110 C110,60 100,-30 60,-40 Z"
      fill="#1C1917"
      stroke="#1C1917"
      strokeWidth="6"
    />
    {/* Head Face */}
    <path
      d="M-45,-20 C-45,-75 -25,-85 0,-85 C25,-85 45,-75 45,-20 C45,35 25,45 0,45 C-25,45 -45,35 -45,-20 Z"
      fill="#DF9269"
      stroke="#1C1917"
      strokeWidth="8"
    />

    {/* Bandana */}
    <path
      d="M-48,-55 C-30,-75 30,-75 48,-55 C52,-45 52,-40 48,-44 C30,-64 -30,-64 -48,-44 C-52,-40 -52,-45 -48,-55 Z"
      fill="#FF6B4A"
      stroke="#1C1917"
      strokeWidth="6"
    />
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

const renderWatermelonShocked = () => (
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

const renderRetroBadge = () => (
  <g>
    {/* Seal background star shape */}
    <path
      d="M-80,-20 L-60,-60 L-20,-80 L20,-80 L60,-60 L80,-20 L80,20 L60,60 L20,80 L-20,80 L-60,60 L-80,20 Z"
      fill="#F59E0B"
      stroke="#1C1917"
      strokeWidth="10"
    />
    <circle cx="0" cy="0" r="60" fill="#FAF6F0" stroke="#1C1917" strokeWidth="8" />
    <circle cx="0" cy="0" r="50" fill="none" stroke="#FF6B4A" strokeWidth="4" strokeDasharray="6,4" />

    {/* Bold Trust Text inside seal */}
    <text
      x="0"
      y="-12"
      textAnchor="middle"
      fill="#1C1917"
      fontSize="13"
      fontWeight="900"
      fontFamily='"Space Grotesk", sans-serif'
      letterSpacing="1"
    >
      COVE
    </text>
    <text
      x="0"
      y="8"
      textAnchor="middle"
      fill="#0D9488"
      fontSize="14"
      fontWeight="800"
      fontFamily='"JetBrains Mono", monospace'
    >
      99.98%
    </text>
    <text
      x="0"
      y="26"
      textAnchor="middle"
      fill="#1C1917"
      fontSize="10"
      fontWeight="900"
      fontFamily="sans-serif"
    >
      GUARANTEED
    </text>
  </g>
);
