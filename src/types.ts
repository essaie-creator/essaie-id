export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  role: string;
  description: string;
  category: 'primary' | 'secondary' | 'accent' | 'neutral' | 'surface';
  textColors: {
    onLight: string;
    onDark: string;
  };
}

export interface BrandPriorityValue {
  id: string;
  title: string;
  metaphor: string;
  description: string;
  artworkContext: string;
  keyPhrases: string[];
}

export interface GeneratedAsset {
  id: string;
  timestamp: string;
  type: 'slogan' | 'value_statement' | 'pitch' | 'social_post' | 'hero_title';
  prompt: string;
  content: string;
}

export interface CopywritingGuide {
  toneName: string;
  description: string;
  rules: string[];
  vocabularyDo: string[];
  vocabularyAvoid: string[];
}
