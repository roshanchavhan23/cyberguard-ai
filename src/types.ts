export type Language = 'en' | 'hi' | 'mr';

export type PageId =
  | 'home'
  | 'detector'
  | 'harassment'
  | 'guider'
  | 'helplines'
  | 'laws'
  | 'guidelines'
  | 'formguide'
  | 'videos'
  | 'stories';

export type ThreatCategory =
  | 'cyberbullying'
  | 'doxxing'
  | 'cyberstalking'
  | 'morphing_deepfakes'
  | 'non_consensual_images'
  | 'trolling'
  | 'hate_speech'
  | 'sextortion'
  | 'gaslighting'
  | 'financial_fraud'
  | 'identity_abuse'
  | 'safe';

export type RiskLevel = 'safe' | 'caution' | 'high';

export interface DetectionResult {
  risk: RiskLevel;
  category: ThreatCategory;
  toxicityScore: number;
  matchedKeywords: string[];
  harassmentTypes: string[];
  guidelines: string[];
  summary: string;
}

export interface GuidelineDoc {
  id: string;
  title: string;
  category: 'general' | 'financial' | 'social' | 'victim';
  description: string;
  fileName: string;
  pages: number;
}

export interface VideoItem {
  id: string;
  title: string;
  source: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  category: string;
}

export interface SurvivorStory {
  id: string;
  name: string;
  age: number;
  city: string;
  incident: string;
  action: string;
  outcome: string;
  advice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

export type LawCategory = 'act' | 'rule' | 'policy' | 'guideline' | 'amendment';

export interface CyberLaw {
  id: number;
  law_name: string;
  category: LawCategory;
  year: number | null;
  ministry: string | null;
  description: string;
  key_provisions: string[];
  penalties: string | null;
  reporting_authority: string | null;
  official_url: string | null;
}
