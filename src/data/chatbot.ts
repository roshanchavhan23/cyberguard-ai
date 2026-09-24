interface BotRule {
  patterns: string[];
  response: string;
}

const botRules: BotRule[] = [
  {
    patterns: ['blackmail', 'threaten', 'leak', 'photos', 'expose', 'secret'],
    response:
      "I'm so sorry you're going through this. Blackmail is a serious crime. Here's what you need to do right now:\n\n1. DO NOT pay any money — paying never stops a blackmailer.\n2. DO NOT delete any messages, chats, or screenshots — this is your evidence.\n3. Take screenshots of every threat with the date and time visible.\n4. Call the National Cyber Helpline 1930 immediately — they handle this daily.\n5. File a complaint at cybercrime.gov.in under 'Threatening/Blackmail'.\n\nYou are not alone. The law is on your side. Would you like me to guide you to the Form Filling page?",
  },
  {
    patterns: ['money', 'deducted', 'fraud', 'upi', 'transaction', 'scam', 'fake link', 'refund', 'otp'],
    response:
      "Financial fraud needs quick action. Here's your step-by-step plan:\n\n1. Call your bank immediately and ask them to block the transaction/freeze your account.\n2. Call 1930 within the first hour — faster reporting means higher recovery chances.\n3. Note down the transaction ID, date, time, and amount.\n4. Take a screenshot of the fraudulent link, message, or app.\n5. File a complaint at cybercrime.gov.in under 'Financial Cyber Fraud'.\n6. Download the 'Financial Fraud Prevention Brochure' from our Guidelines page.\n\nWould you like me to open the Guidelines page for you?",
  },
  {
    patterns: ['fake profile', 'fake account', 'impersonating', 'using my name', 'my photos'],
    response:
      "Someone creating a fake profile of you is identity abuse — a punishable offense. Here's what to do:\n\n1. Take screenshots of the fake profile — URL, photos, messages sent to others.\n2. Report the profile on the platform (Instagram/Facebook/etc.) using 'Report > Fake Account'.\n3. Tell your friends and family not to engage with the fake account.\n4. Call 1930 and report the impersonation.\n5. File a complaint at cybercrime.gov.in under 'Identity Theft / Impersonation'.\n6. Download the 'Safe Use of Social Media Platforms' guide from our Guidelines page.\n\nWould you like more details on preserving evidence?",
  },
  {
    patterns: ['complaint', 'file', 'cybercrime.gov.in', 'how to report', 'register'],
    response:
      "Filing a complaint on cybercrime.gov.in is straightforward. Here's the overview:\n\n1. Go to https://cybercrime.gov.in\n2. Click 'File a Complaint' on the homepage.\n3. Select the category: Financial Fraud, Women/Child Related, or Other Cybercrime.\n4. Create an account or login with your mobile number.\n5. Fill in your details, the accused details (if known), and incident description.\n6. Upload evidence: screenshots, URLs, transaction IDs.\n7. Submit and note your complaint number for tracking.\n\nI recommend visiting our 'Form Guide' page for a visual step-by-step walkthrough. Would you like me to take you there?",
  },
  {
    patterns: ['bully', 'bullying', 'abusive', 'harass', 'mean messages', 'insult'],
    response:
      "Cyberbullying is painful but you have legal protection. Here's what to do:\n\n1. Do NOT respond to the bully — engaging often makes things worse.\n2. Take screenshots of every abusive message with timestamps.\n3. Block the person on the platform.\n4. Report the messages to the platform (Instagram, WhatsApp, etc.).\n5. Tell a trusted adult, parent, or teacher.\n6. Call 1930 if the bullying is severe or persistent.\n7. File a complaint at cybercrime.gov.in if it involves threats.\n\nYou deserve respect. This is not your fault. Would you like to see survivor stories of others who faced this?",
  },
  {
    patterns: ['hello', 'hi', 'hey', 'help', 'start'],
    response:
      "Hello! I'm your AI cyber-safety guide. I'm here to help you through any online threat or concern. You can tell me what's happening, or use one of the quick suggestion buttons below. Everything you share here stays between us. What would you like help with?",
  },
  {
    patterns: ['scared', 'afraid', 'panic', 'worried', 'anxious', 'don\'t know what to do'],
    response:
      "I hear you, and I want you to know: you are not alone, and there are clear steps you can take. Take a deep breath.\n\nFirst, if you are in immediate danger, call 112.\nFor any cybercrime, call 1930 — they are available 24x7 and are very supportive.\n\nTell me what happened. Even a few words will help me guide you. You're doing the right thing by reaching out.",
  },
  {
    patterns: ['job', 'work from home', 'registration fee', 'job offer'],
    response:
      "Be very careful — many job offers online are scams. Warning signs:\n\n- Asking for a registration or processing fee\n- No real interview, just a message offer\n- Asking for your Aadhaar/PAN/bank details upfront\n- Promising unrealistically high pay\n\nWhat to do:\n1. Do NOT pay any money or share documents.\n2. Search the company name online + 'scam' or 'fraud'.\n3. Call 1930 to verify or report.\n4. Download our 'Job Scam Alert Brochure' from the Guidelines page.\n\nWould you like me to open the Guidelines page?",
  },
  {
    patterns: ['matrimonial', 'marriage', 'relationship scam', 'dating scam', 'she asked money', 'he asked money'],
    response:
      "Matrimonial and dating scams are unfortunately common. Key warning signs:\n\n- Refusing video calls\n- Quickly professing love\n- Asking for money for travel, medical emergency, or visa\n- Profile seems too perfect\n\nWhat to do:\n1. Never send money to someone you haven't met in person.\n2. Do a reverse image search of their profile photos.\n3. Report the profile on the matrimonial/dating platform.\n4. Call 1930 and file a complaint at cybercrime.gov.in.\n5. Download our 'Matrimonial Fraud Prevention Guide' from the Guidelines page.\n\nWould you like more help?",
  },
];

const defaultResponse =
  "I understand. I'm here to help. Could you tell me a bit more about what's happening? You can also:\n\n- Call 1930 (National Cyber Helpline, 24x7)\n- Visit https://cybercrime.gov.in to file a complaint\n- Check our Guidelines page for official PDFs\n- Use the AI Detector to scan suspicious messages\n\nWhat would you like to do?";

export function getBotResponse(userInput: string): string {
  const lower = userInput.toLowerCase();
  let bestMatch: BotRule | null = null;
  let bestScore = 0;

  for (const rule of botRules) {
    let score = 0;
    for (const pattern of rule.patterns) {
      if (lower.includes(pattern)) {
        score += pattern.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  return bestMatch ? bestMatch.response : defaultResponse;
}
