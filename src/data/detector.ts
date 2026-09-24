import type { DetectionResult, ThreatCategory, RiskLevel } from '../types';

interface KeywordGroup {
  category: ThreatCategory;
  keywords: string[];
}

const keywordGroups: KeywordGroup[] = [
  {
    category: 'threat_blackmail',
    keywords: [
      'blackmail', 'leak your photos', 'share your photos', 'expose you', 'i will expose',
      'pay or else', 'send money or', 'i will tell everyone', 'ruin your reputation',
      'i have your photos', 'i will release', 'pay me or', 'send rs', 'transfer money or',
      'i know your secret', 'i will post', 'i will send to your family',
    ],
  },
  {
    category: 'financial_fraud',
    keywords: [
      'lottery', 'you won', 'winner', 'prize money', 'claim your reward', 'click here to claim',
      'upi pin', 'otp', 'kyc', 'verify your account', 'account will be blocked', 'refund',
      'cashback', 'free recharge', 'investment', 'double your money', 'bitcoin',
      'pay registration fee', 'processing fee', 'transaction id', 'congratulations you have won',
      'your account is suspended', 'verify kyc', 'link expired', 'reward points',
    ],
  },
  {
    category: 'cyberbullying',
    keywords: [
      'stupid', 'idiot', 'ugly', 'loser', 'nobody likes you', 'kill yourself',
      'shut up', 'worthless', 'pathetic', 'you are a joke', 'everyone hates you',
      'go die', 'useless', 'failure', 'disgrace', 'shame on you', 'embarrassment',
      'nobody cares about you', 'you are nothing', 'we will teach you a lesson',
    ],
  },
  {
    category: 'identity_abuse',
    keywords: [
      'fake profile', 'created an account', 'using your name', 'impersonating',
      'pretending to be you', 'stole your identity', 'your aadhaar', 'your pan',
      'your personal details', 'identity theft', 'using your photos',
      'opened an account in your name', 'your documents',
    ],
  },
];

const guidelineMap: Record<ThreatCategory, string[]> = {
  threat_blackmail: ['victim-sop', 'cyber-safety-manual', 'social-media-safety'],
  financial_fraud: ['financial-fraud-prevention', 'job-scam-alert', 'victim-sop'],
  cyberbullying: ['social-media-safety', 'cyber-safety-manual', 'victim-sop'],
  identity_abuse: ['social-media-safety', 'cyber-safety-manual', 'victim-sop'],
  safe: ['cyber-security-awareness-booklet', 'cyber-awareness-faqs'],
};

export function analyzeContent(text: string): DetectionResult {
  const lower = text.toLowerCase();
  const matchedKeywords: string[] = [];
  const categoryScores: Record<ThreatCategory, number> = {
    cyberbullying: 0,
    financial_fraud: 0,
    threat_blackmail: 0,
    identity_abuse: 0,
    safe: 0,
  };

  for (const group of keywordGroups) {
    for (const kw of group.keywords) {
      if (lower.includes(kw)) {
        categoryScores[group.category]++;
        matchedKeywords.push(kw);
      }
    }
  }

  const maxCategory = (Object.entries(categoryScores) as [ThreatCategory, number][])
    .sort((a, b) => b[1] - a[1])[0];

  const totalMatches = matchedKeywords.length;
  const maxScore = maxCategory[1];

  let risk: RiskLevel = 'safe';
  let category: ThreatCategory = 'safe';
  let toxicityScore = 0;

  if (totalMatches === 0) {
    risk = 'safe';
    category = 'safe';
    toxicityScore = 5;
  } else if (maxScore <= 1 && totalMatches <= 2) {
    risk = 'caution';
    category = maxCategory[0];
    toxicityScore = 35 + Math.min(totalMatches * 8, 20);
  } else if (maxScore <= 3) {
    risk = 'caution';
    category = maxCategory[0];
    toxicityScore = 45 + Math.min(totalMatches * 10, 25);
  } else {
    risk = 'high';
    category = maxCategory[0];
    toxicityScore = Math.min(70 + totalMatches * 8, 98);
  }

  if (risk === 'safe' && lower.length > 0) {
    toxicityScore = Math.max(5, Math.min(lower.length / 10, 15));
  }

  const summary = generateSummary(text, risk, category, matchedKeywords, toxicityScore);

  return {
    risk,
    category,
    toxicityScore: Math.round(toxicityScore),
    matchedKeywords: [...new Set(matchedKeywords)],
    guidelines: guidelineMap[category],
    summary,
  };
}

function generateSummary(
  text: string,
  risk: RiskLevel,
  category: ThreatCategory,
  keywords: string[],
  score: number,
): string {
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const categoryLabel: Record<ThreatCategory, string> = {
    cyberbullying: 'Cyberbullying',
    financial_fraud: 'Financial Fraud',
    threat_blackmail: 'Threat / Blackmail',
    identity_abuse: 'Identity Abuse',
    safe: 'No Threat Detected',
  };

  return `====================================
   CYBERGUARD AI - EVIDENCE SUMMARY
   For Police Complaint Reporting
====================================

Date of Analysis: ${date}
Analysis Engine: CyberGuard AI NLP Detector

------------------------------------
THREAT ASSESSMENT
------------------------------------
Risk Level: ${risk.toUpperCase()}
Classification: ${categoryLabel[category]}
Toxicity Score: ${score}/100

------------------------------------
DETECTED THREAT KEYWORDS
------------------------------------
${keywords.length > 0 ? keywords.map((k, i) => `${i + 1}. "${k}"`).join('\n') : 'No threat keywords detected.'}

------------------------------------
ORIGINAL CONTENT (EVIDENCE)
------------------------------------
"${text}"

------------------------------------
RECOMMENDED ACTIONS
------------------------------------
1. Call National Cyber Helpline: 1930
2. File complaint at https://cybercrime.gov.in
3. Preserve all evidence: screenshots, messages, URLs
4. Do NOT delete the original messages
5. Do NOT respond to the sender
6. Do NOT pay any money if blackmailed

------------------------------------
APPLICABLE GUIDELINES
------------------------------------
${guidelineMap[category].map((g) => `- ${g}`).join('\n')}

====================================
This summary is generated by CyberGuard AI for
assistance in filing a cybercrime complaint.
It does not constitute legal advice.
====================================`;
}

export const sampleTexts: Record<string, string> = {
  blackmail:
    'I have your private photos. If you do not send me Rs 50,000 by tomorrow, I will leak your photos and send them to your family. Do not try to ignore this or I will expose you.',
  fraud:
    'Congratulations! You have won Rs 10,00,000 in the KBC Lottery. To claim your prize money, click here and enter your UPI PIN and OTP to verify your account. Your account will be blocked if you do not verify KYC within 24 hours.',
  bullying:
    'You are such a stupid loser. Nobody likes you. You are pathetic and a joke. Everyone hates you. Just shut up, you are worthless and useless. Go die, nobody cares about you.',
  identity:
    'I have created a fake profile using your name and your photos. I am impersonating you and opened an account in your name using your Aadhaar details. Your personal details are now mine.',
};
