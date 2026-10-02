interface BotRule {
  patterns: string[];
  response: string;
}

const botRules: BotRule[] = [
  {
    patterns: ['blackmail', 'threaten', 'leak', 'photos', 'expose', 'secret', 'sextortion', 'webcam', 'recorded you', 'private videos'],
    response:
      "I'm so sorry you're going through this. Sextortion and blackmail are serious crimes. Here's what you need to do right now:\n\n1. DO NOT pay any money — paying never stops a blackmailer.\n2. DO NOT send more content — this only deepens the chain.\n3. Stop all communication with the blackmailer.\n4. Take screenshots of every threat with the date and time visible.\n5. Call the National Cyber Helpline 1930 immediately — they handle this daily.\n6. File a complaint at cybercrime.gov.in under 'Women/Child Related'.\n\nYou are not alone. The law is on your side. This is NOT your fault. Would you like me to guide you to the Helplines page?",
  },
  {
    patterns: ['money', 'deducted', 'fraud', 'upi', 'transaction', 'scam', 'fake link', 'refund', 'otp'],
    response:
      "Financial fraud needs quick action. Here's your step-by-step plan:\n\n1. Call your bank immediately and ask them to block the transaction/freeze your account.\n2. Call 1930 within the first hour — faster reporting means higher recovery chances.\n3. Note down the transaction ID, date, time, and amount.\n4. Take a screenshot of the fraudulent link, message, or app.\n5. File a complaint at cybercrime.gov.in under 'Financial Cyber Fraud'.\n\nWould you like me to open the Helplines page for you?",
  },
  {
    patterns: ['fake profile', 'fake account', 'impersonating', 'using my name', 'my photos', 'identity'],
    response:
      "Someone creating a fake profile of you is identity abuse — a punishable offense. Here's what to do:\n\n1. Take screenshots of the fake profile — URL, photos, messages sent to others.\n2. Report the profile on the platform (Instagram/Facebook/etc.) using 'Report > Fake Account'.\n3. Tell your friends and family not to engage with the fake account.\n4. Call 1930 and report the impersonation.\n5. File a complaint at cybercrime.gov.in under 'Identity Theft / Impersonation'.\n\nWould you like more details on preserving evidence?",
  },
  {
    patterns: ['complaint', 'file', 'cybercrime.gov.in', 'how to report', 'register'],
    response:
      "Filing a complaint on cybercrime.gov.in is straightforward. Here's the overview:\n\n1. Go to https://cybercrime.gov.in\n2. Click 'File a Complaint' on the homepage.\n3. Select the category: Financial Fraud, Women/Child Related, or Other Cybercrime.\n4. Create an account or login with your mobile number.\n5. Fill in your details, the accused details (if known), and incident description.\n6. Upload evidence: screenshots, URLs, transaction IDs.\n7. Submit and note your complaint number for tracking.\n\nI recommend visiting our 'Form Guide' page for a visual step-by-step walkthrough. Would you like me to take you there?",
  },
  {
    patterns: ['bully', 'bullying', 'abusive', 'harass', 'mean messages', 'insult', 'trolling', 'troll'],
    response:
      "Cyberbullying is painful but you have legal protection. Here's what to do:\n\n1. Do NOT respond to the bully — engaging often makes things worse.\n2. Take screenshots of every abusive message with timestamps.\n3. Block the person on the platform.\n4. Report the messages to the platform (Instagram, WhatsApp, etc.).\n5. Tell a trusted adult, parent, or teacher.\n6. Call 1930 if the bullying is severe or persistent.\n7. File a complaint at cybercrime.gov.in if it involves threats.\n\nYou deserve respect. This is not your fault. Check our Harassment Guide Hub for detailed information on cyberbullying.",
  },
  {
    patterns: ['hello', 'hi', 'hey', 'help', 'start'],
    response:
      "Hello! I'm your AI cyber-safety assistant. I'm here to help you through any online threat or concern. You can tell me what's happening, or use one of the quick suggestion buttons below. Everything you share here stays between us. What would you like help with?",
  },
  {
    patterns: ['scared', 'afraid', 'panic', 'worried', 'anxious', "don't know what to do", 'depressed', 'suicide', 'self-harm', 'kill myself'],
    response:
      "I hear you, and I want you to know: you are not alone, and there are clear steps you can take. Take a deep breath.\n\nFirst, if you are in immediate danger, call 112.\nFor any cybercrime, call 1930 — they are available 24x7 and are very supportive.\nIf you are feeling overwhelmed, depressed, or having thoughts of self-harm, please call:\n- AASRA: 9820466726 (24x7 crisis helpline)\n- Kiran: 1800-599-0019 (government mental health support)\n- iCall: 9152987821\n\nTell me what happened. Even a few words will help me guide you. You're doing the right thing by reaching out.",
  },
  {
    patterns: ['doxx', 'doxxing', 'my address', 'my phone number', 'exposing my details', 'found where i live'],
    response:
      "Doxxing — sharing your private information online — is a serious crime. Here's what to do:\n\n1. Screenshot the posts with URLs and timestamps.\n2. Request the platform to remove the content immediately.\n3. If your home address is exposed, inform local police immediately.\n4. Call 1930 and report the doxxing.\n5. File a complaint at cybercrime.gov.in.\n6. Change passwords and enable two-factor authentication.\n\nVisit our Harassment Guide Hub for detailed information on doxxing. Would you like me to take you there?",
  },
  {
    patterns: ['stalking', 'stalker', 'following me', 'watching me', 'tracking me', 'won\'t leave me alone', 'obsessed'],
    response:
      "Cyberstalking is a punishable offense under Indian law. Here's what to do:\n\n1. Tell the stalker once, clearly, to stop — then do not engage further.\n2. Keep a detailed log of every contact: date, time, platform, content.\n3. Screenshot and save all messages as evidence.\n4. Block the person on every platform.\n5. Report to the platform using harassment/stalking tools.\n6. Call 1930 and file a complaint at cybercrime.gov.in.\n7. Inform your family and friends about the stalker.\n8. Check your devices for spyware or tracking apps.\n\nYou can also read our Harassment Guide Hub for detailed information on cyberstalking.",
  },
  {
    patterns: ['morphed', 'deepfake', 'photoshopped', 'fake video', 'altered my photo', 'my face on'],
    response:
      "Morphing and deepfakes are serious crimes under Indian law. Here's what to do:\n\n1. Do NOT panic — this is a crime and you have legal protection.\n2. Screenshot and save the morphed content with URLs and timestamps.\n3. Report the content to the platform immediately for removal.\n4. File a complaint at cybercrime.gov.in under 'Women/Child Related'.\n5. Call 1930 and inform them about the morphed/deepfake content.\n6. Collect evidence: original photos, the morphed versions, witness statements.\n\nThis is NOT your fault. Visit our Harassment Guide Hub for more information.",
  },
  {
    patterns: ['private photos', 'intimate', 'revenge porn', 'leaked my photos', 'shared my photos', 'non-consensual', 'nudes'],
    response:
      "Non-consensual image sharing is a serious crime. Here's what to do RIGHT NOW:\n\n1. Do NOT pay any money if being blackmailed.\n2. Screenshot and document every instance with URLs, timestamps.\n3. Report the content to the platform for urgent removal.\n4. File a complaint IMMEDIATELY at cybercrime.gov.in under 'Women/Child Related'.\n5. Call 1930 and explain this is non-consensual image sharing.\n6. Preserve all evidence — do not delete original communications.\n7. Tell a trusted person — you need emotional support.\n\nYou are NOT at fault. The person who shared the images committed the crime. Please seek mental health support — call iCall at 9152987821.",
  },
  {
    patterns: ['gaslight', 'gaslighting', 'never said that', 'imagining things', 'losing my mind', 'crazy', 'paranoid'],
    response:
      "Gaslighting is a form of psychological abuse. Here's what to do:\n\n1. Trust your instincts — if something feels wrong, it probably is.\n2. Screenshot and save conversations before they can be edited.\n3. Keep a private journal documenting incidents.\n4. Talk to trusted friends or family about what you are experiencing.\n5. Do not argue with the gaslighter — they want you to doubt yourself.\n6. Seek professional counseling — gaslighting is psychological abuse.\n\nVisit our Harassment Guide Hub for detailed information on gaslighting.",
  },
  {
    patterns: ['hate speech', 'religion', 'caste', 'racist', 'your kind', 'your people', 'do not belong'],
    response:
      "Hate speech is a crime under Indian law. Here's what to do:\n\n1. Report the hate speech to the platform immediately.\n2. Screenshot and document all instances with URLs and timestamps.\n3. Do NOT engage or argue with hate speech perpetrators.\n4. Block the accounts spreading hate speech.\n5. File a complaint at cybercrime.gov.in.\n6. Call 1930 to report serious hate speech or incitement to violence.\n\nYou have the right to exist safely online. Visit our Harassment Guide Hub for more information.",
  },
  {
    patterns: ['mental health', 'depressed', 'anxiety', 'trauma', 'counseling', 'therapy', 'emotional support'],
    response:
      "Your mental health matters as much as your physical safety. Here are resources:\n\n- AASRA: 9820466726 (24x7 crisis & suicide prevention)\n- iCall (Tata Institute): 9152987821 (free psychosocial helpline)\n- NIMHANS: 080-46110007 (national mental health helpline)\n- Kiran Helpline: 1800-599-0019 (government support)\n- Vandrevala Foundation: 1860-2662-345 (24x7)\n\nSeeking help is a sign of strength, not weakness. Each harassment type in our Guide Hub includes a mental health section with coping strategies. Would you like me to take you there?",
  },
  {
    patterns: ['job', 'work from home', 'registration fee', 'job offer'],
    response:
      "Be very careful — many job offers online are scams. Warning signs:\n\n- Asking for a registration or processing fee\n- No real interview, just a message offer\n- Asking for your Aadhaar/PAN/bank details upfront\n- Promising unrealistically high pay\n\nWhat to do:\n1. Do NOT pay any money or share documents.\n2. Search the company name online + 'scam' or 'fraud'.\n3. Call 1930 to verify or report.\n\nWould you like more help?",
  },
];

const defaultResponse =
  "I understand. I'm here to help. Could you tell me a bit more about what's happening? You can also:\n\n- Call 1930 (National Cyber Helpline, 24x7)\n- Visit https://cybercrime.gov.in to file a complaint\n- Check our Harassment Guide Hub for detailed information on 9 types of online harassment\n- Use the Threat Scanner to analyze suspicious messages\n- Visit the Helplines page for all emergency contacts\n\nWhat would you like to do?";

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
