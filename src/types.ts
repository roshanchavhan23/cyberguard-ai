export type Language = 'en' | 'hi' | 'mr';

export type PageId =
  | 'home'
  | 'detector'
  | 'guidelines'
  | 'guider'
  | 'formguide'
  | 'videos'
  | 'stories';

export type ThreatCategory =
  | 'cyberbullying'
  | 'financial_fraud'
  | 'threat_blackmail'
  | 'identity_abuse'
  | 'safe';

export type RiskLevel = 'safe' | 'caution' | 'high';

export interface DetectionResult {
  risk: RiskLevel;
  category: ThreatCategory;
  toxicityScore: number;
  matchedKeywords: string[];
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
