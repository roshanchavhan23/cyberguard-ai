import type { DetectionResult, ThreatCategory, RiskLevel } from '../types';

interface KeywordGroup {
  category: ThreatCategory;
  harassmentTypes: string[];
  keywords: string[];
}

const keywordGroups: KeywordGroup[] = [
  {
    category: 'sextortion',
    harassmentTypes: ['sextortion'],
    keywords: [
      'blackmail', 'leak your photos', 'share your photos', 'expose you', 'i will expose',
      'pay or else', 'send money or', 'i will tell everyone', 'ruin your reputation',
      'i have your photos', 'i will release', 'pay me or', 'send rs', 'transfer money or',
      'i know your secret', 'i will post', 'i will send to your family',
      'send me more photos', 'send me videos or i will', 'your webcam', 'i recorded you',
      'i have your private videos',
    ],
  },
  {
    category: 'financial_fraud',
    harassmentTypes: ['financial_fraud'],
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
    harassmentTypes: ['cyberbullying'],
    keywords: [
      'stupid', 'idiot', 'ugly', 'loser', 'nobody likes you', 'kill yourself',
      'shut up', 'worthless', 'pathetic', 'you are a joke', 'everyone hates you',
      'go die', 'useless', 'failure', 'disgrace', 'shame on you', 'embarrassment',
      'nobody cares about you', 'you are nothing', 'we will teach you a lesson',
    ],
  },
  {
    category: 'identity_abuse',
    harassmentTypes: ['identity_abuse'],
    keywords: [
      'fake profile', 'created an account', 'using your name', 'impersonating',
      'pretending to be you', 'stole your identity', 'your aadhaar', 'your pan',
      'your personal details', 'identity theft', 'using your photos',
      'opened an account in your name', 'your documents',
    ],
  },
  {
    category: 'doxxing',
    harassmentTypes: ['doxxing'],
    keywords: [
      'your address is', 'your phone number is', 'i found your address',
      'i know where you live', 'posting your address', 'exposing your details',
      'your home address', 'your family details', 'your workplace is',
      'i will share your location', 'doxx you', 'doxxing',
    ],
  },
  {
    category: 'cyberstalking',
    harassmentTypes: ['cyberstalking'],
    keywords: [
      'i am watching you', 'i know where you are', 'i followed you',
      'i can see your location', 'i track your every move', 'stalking you',
      'i know what you did today', 'i see your posts', 'i am following you online',
      'i will find you', 'i know your routine',
    ],
  },
  {
    category: 'morphing_deepfakes',
    harassmentTypes: ['morphing_deepfakes'],
    keywords: [
      'morphed your photo', 'edited your picture', 'deepfake', 'fake video of you',
      'i photoshopped your face', 'i altered your image', 'your face on',
      'i made a fake video', 'i manipulated your photo', 'your morphed photos',
    ],
  },
  {
    category: 'non_consensual_images',
    harassmentTypes: ['non_consensual_images'],
    keywords: [
      'i will share your private photos', 'i have your intimate photos',
      'i will post your nudes', 'i have your private videos',
      'i will send your private pictures', 'your intimate content',
      'i will upload your private images', 'revenge porn', 'i will leak your private photos',
    ],
  },
  {
    category: 'trolling',
    harassmentTypes: ['trolling'],
    keywords: [
      'you are so dumb', 'lol you failed again', 'nobody cares about your opinion',
      'cry about it', 'touch grass', 'you are a clown', 'everyone is laughing at you',
      'you are a joke', 'ratio', 'lmao you are pathetic',
    ],
  },
  {
    category: 'hate_speech',
    harassmentTypes: ['hate_speech'],
    keywords: [
      'your religion is', 'your caste', 'people like you', 'go back to your country',
      'you people are all', 'your kind', 'disgusting community', 'worship',
      'slur', 'racial', 'you do not belong here', 'your people',
    ],
  },
  {
    category: 'gaslighting',
    harassmentTypes: ['gaslighting'],
    keywords: [
      'that never happened', 'you are imagining things', 'you are crazy',
      'i never said that', 'you are overreacting', 'you are being paranoid',
      'you misunderstood everything', 'you are making things up', 'you are losing your mind',
      'that is not what happened', 'you are remembering it wrong',
    ],
  },
];

const guidelineMap: Record<ThreatCategory, string[]> = {
  cyberbullying: ['social-media-safety', 'cyber-safety-manual', 'victim-sop'],
  doxxing: ['cyber-safety-manual', 'victim-sop'],
  cyberstalking: ['social-media-safety', 'victim-sop'],
  morphing_deepfakes: ['social-media-safety', 'victim-sop', 'cyber-safety-manual'],
  non_consensual_images: ['victim-sop', 'social-media-safety', 'cyber-safety-manual'],
  trolling: ['social-media-safety', 'cyber-safety-manual'],
  hate_speech: ['cyber-safety-manual', 'victim-sop'],
  sextortion: ['victim-sop', 'cyber-safety-manual', 'social-media-safety'],
  gaslighting: ['cyber-safety-manual', 'victim-sop'],
  financial_fraud: ['financial-fraud-prevention', 'job-scam-alert', 'victim-sop'],
  identity_abuse: ['social-media-safety', 'cyber-safety-manual', 'victim-sop'],
  safe: ['cyber-security-awareness-booklet', 'cyber-awareness-faqs'],
};

export function analyzeContent(text: string): DetectionResult {
  const lower = text.toLowerCase();
  const matchedKeywords: string[] = [];
  const categoryScores: Partial<Record<ThreatCategory, number>> = {};
  const detectedHarassmentTypes = new Set<string>();

  for (const group of keywordGroups) {
    for (const kw of group.keywords) {
      if (lower.includes(kw)) {
        categoryScores[group.category] = (categoryScores[group.category] ?? 0) + 1;
        matchedKeywords.push(kw);
        group.harassmentTypes.forEach((ht) => detectedHarassmentTypes.add(ht));
      }
    }
  }

  const sorted = (Object.entries(categoryScores) as [ThreatCategory, number][]).sort((a, b) => b[1] - a[1]);
  const maxCategory = sorted[0] ?? (['safe'] as [ThreatCategory, number]);

  const totalMatches = matchedKeywords.length;
  const maxScore = maxCategory[1] ?? 0;

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

  // High-risk categories that should always be at least caution
  const severeCategories: ThreatCategory[] = ['sextortion', 'non_consensual_images', 'morphing_deepfakes'];
  if (severeCategories.includes(category) && risk === 'safe') {
    risk = 'caution';
  }

  const summary = generateSummary(text, risk, category, matchedKeywords, toxicityScore, [...detectedHarassmentTypes]);

  return {
    risk,
    category,
    toxicityScore: Math.round(toxicityScore),
    matchedKeywords: [...new Set(matchedKeywords)],
    harassmentTypes: [...detectedHarassmentTypes],
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
  harassmentTypes: string[],
): string {
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const categoryLabel: Record<ThreatCategory, string> = {
    cyberbullying: 'Cyberbullying',
    doxxing: 'Doxxing',
    cyberstalking: 'Cyberstalking',
    morphing_deepfakes: 'Morphing & Deepfakes',
    non_consensual_images: 'Non-Consensual Image Sharing',
    trolling: 'Trolling',
    hate_speech: 'Hate Speech',
    sextortion: 'Sextortion',
    gaslighting: 'Gaslighting',
    financial_fraud: 'Financial Fraud',
    identity_abuse: 'Identity Abuse',
    safe: 'No Threat Detected',
  };

  return `====================================
   CYBERGUARD AI — EVIDENCE SUMMARY
   For Police Complaint Reporting
====================================

Date of Analysis: ${date}
Analysis Engine: CyberGuard AI Threat Scanner

------------------------------------
THREAT ASSESSMENT
------------------------------------
Risk Level: ${risk.toUpperCase()}
Classification: ${categoryLabel[category]}
Toxicity Score: ${score}/100
Detected Harassment Types: ${harassmentTypes.length > 0 ? harassmentTypes.join(', ') : 'None'}

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
7. Seek mental health support if needed

------------------------------------
APPLICABLE GUIDELINES
------------------------------------
${guidelineMap[category].map((g) => `- ${g}`).join('\n')}

====================================
This summary is generated by CyberGuard AI
for assistance in filing a cybercrime complaint.
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
  doxxing:
    'I found your home address. I know where you live. I am posting your phone number and address online so everyone can find you.',
  gaslighting:
    'That never happened. You are imagining things. I never said that to you. You are overreacting and being paranoid. You are remembering it wrong. You are losing your mind.',
  sextortion:
    'I recorded you through your webcam. I have your private videos. Send me Rs 1,00,000 or I will send these videos to your family and your employer. Do not go to the police.',
  deepfake:
    'I photoshopped your face onto someone else\'s body. I made a fake video of you. I will post this morphed photo on social media unless you do what I say.',
  hate:
    'People like you do not belong in this country. Your religion is disgusting. Your kind should be thrown out. Everyone is laughing at your community.',
};
