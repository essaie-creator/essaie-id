import { ColorToken, BrandPriorityValue, CopywritingGuide } from './types';

export const COMP_NAME = "Cove Systems";

export const BRAND_COLORS: ColorToken[] = [
  {
    id: "sol-orange",
    name: "Sol Orange",
    hex: "#FF6B4A",
    role: "Primary Color / Innovation",
    category: "primary",
    description: "Inspired by the warm sunglasses and vibrant picnic shirts. Reflects creativity, bold momentum, and progressive technology.",
    textColors: { onLight: "text-[#FF6B4A]", onDark: "text-[#FF886E]" }
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    hex: "#0D9488",
    role: "Secondary Color / Reliability",
    category: "secondary",
    description: "Inspired by the calm coastal waters. Evokes security, structural integrity, calming resilience, and trust.",
    textColors: { onLight: "text-[#0D9488]", onDark: "text-[#2DD4BF]" }
  },
  {
    id: "sunset-gold",
    name: "Sunset Gold",
    hex: "#F59E0B",
    role: "Accent Color / Warmth",
    category: "accent",
    description: "Inspired by the radiant retro sky and bright drinks. Emphasizes optimism, human-centric layouts, and joyful user experience.",
    textColors: { onLight: "text-[#D97706]", onDark: "text-[#FBBF24]" }
  },
  {
    id: "sand-alabaster",
    name: "Sand Alabaster",
    hex: "#FAF6F0",
    role: "Base Light / Surface Background",
    category: "surface",
    description: "Inspired by the warm shore sand. A comforting base color that avoids sterile white, providing deep optical comfort.",
    textColors: { onLight: "text-[#1C1917]", onDark: "text-[#FAF6F0]" }
  },
  {
    id: "deep-charcoal",
    name: "Deep Charcoal",
    hex: "#1C1917",
    role: "Base Dark / Text Contrast",
    category: "neutral",
    description: "Inspired by sharp ink details and outlines. Offers structural layout boundaries, high-contrast text rendering, and technical definition.",
    textColors: { onLight: "text-[#FAF6F0]", onDark: "text-[#1C1917]" }
  }
];

export const CORE_VALUES: BrandPriorityValue[] = [
  {
    id: "reliability",
    title: "Tidal Reliability",
    metaphor: "The ocean's waves. Constant, relentless, and completely predictable.",
    description: "Like the serene coastal sea, our software runs without interruption. We prioritize bulletproof state logic, resilient error boundaries, and absolute functional consistency so users feel safe resting on our sand.",
    artworkContext: "Directly mapped from the steady, rhythmic turquoise ocean that surrounds the picnic.",
    keyPhrases: ["Unfailing by default", "Tide-like consistency", "Calm engineering"]
  },
  {
    id: "innovation",
    title: "Heirloom Innovation",
    metaphor: "The brilliant noon sun. Warming, highly visible, and life-giving.",
    description: "We don't innovate to cause chaos. We build tools that make user workflows warmer, faster, and more delightful—like clean slices of fresh watermelon shared with friends under a bright clear sky.",
    artworkContext: "Mapped from the central high-energy orange-coral tones and glowing, energetic summer sun details.",
    keyPhrases: ["Human-focused vision", "Optimistic architecture", "Radiant design and engineering"]
  },
  {
    id: "consistency",
    title: "Gathering Consistency",
    metaphor: "The beach picnic. Everything you need, unified, clean, and in harmony.",
    description: "Consistent software coordinates diverse services into a beautifully composed table. We maintain strict visual constraints, clear boundaries, and predictable behaviors that respect user intuition.",
    artworkContext: "Mapped from the organized picnic blanket, where food, drink, and loved ones enjoy an effortless, perfect interface.",
    keyPhrases: ["Perfectly composed elements", "Effortless interaction", "Welcoming structures"]
  }
];

export const COPY_GUIDELINES: CopywritingGuide = {
  toneName: "Humane Tech",
  description: "A balanced, warm-hearted tone that proves deeply knowledgeable yet stays approachable and optimistic. We never larp with jargon.",
  rules: [
    "Address users as fellow builders or friends, keeping things simple yet professional.",
    "Prioritize clarity over cleverness; describe complex mechanisms with simple physical or natural metaphors (e.g., streams, tides, hearths).",
    "Avoid dry, machine-like alert texts; explain why things behave the way they do with helpful transparency."
  ],
  vocabularyDo: ["effortless", "consistent", "nourishing", "foundational", "venerable", "shore up", "lucid", "serene"],
  vocabularyAvoid: ["paradigm shift", "disruptive", "synergy", "cutting-edge analytics", "bleeding-edge", "leveraging next-gen"]
};

export const INSTANT_COPY_TEMPLATES = [
  {
    type: "hero_title",
    tone: "bold",
    content: "Software as reliable as the tide, as direct as the sun.",
    rationale: "Aligns our two primary core values (Reliability and Innovation) using clear natural metaphors."
  },
  {
    type: "slogan",
    tone: "minimal",
    content: "Consistent tools. Warm interfaces.",
    rationale: "Extremely punchy, defining Cove's commitment to visual harmony and supportive, reliable architecture."
  },
  {
    type: "value_statement",
    tone: "professional",
    content: "We craft high-performance computational tools designed to act as stable foundations for modern developer systems, keeping operations calm under any high load.",
    rationale: "Translates the calming influence of Cove's ocean-teal identity into a business-ready value proposition."
  }
];
