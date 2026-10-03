interface BotRule {
  patterns: string[];
  response: string;
}

const botRules: BotRule[] = [
  // ── Sextortion / Blackmail ──────────────────────────────────────────────
  {
    patterns: ['blackmail', 'threaten', 'leak', 'photos', 'expose', 'secret', 'sextortion', 'webcam', 'recorded you', 'private videos', 'nude', 'compromising'],
    response:
      "I'm so sorry you're going through this. Sextortion and blackmail are serious crimes under Section 67A of the IT Act and Section 384 IPC (extortion). Here's what you need to do right now:\n\n1. DO NOT pay any money — paying never stops a blackmailer.\n2. DO NOT send more content — this only deepens the chain.\n3. Stop all communication with the blackmailer.\n4. Take screenshots of every threat with the date and time visible.\n5. Call the National Cyber Helpline 1930 immediately — they handle this daily.\n6. File a complaint at cybercrime.gov.in under 'Women/Child Related Crime'.\n\nLegal provisions that protect you:\n• Section 67A IT Act — publishing sexually explicit material (up to 5 years imprisonment + fine)\n• Section 384 IPC — extortion (up to 3 years imprisonment)\n• Section 354 IPC — outraging modesty (up to 2 years)\n\nYou are not alone. The law is on your side. This is NOT your fault. Would you like me to guide you to the Helplines page?",
  },

  // ── Financial Fraud / UPI / OTP ─────────────────────────────────────────
  {
    patterns: ['money', 'deducted', 'fraud', 'upi', 'transaction', 'scam', 'fake link', 'refund', 'otp', 'bank', 'phishing', 'card', 'atm', 'loan', 'insurance fraud', 'payment'],
    response:
      "Financial fraud needs quick action — the faster you act, the higher your recovery chances. Here's your step-by-step plan:\n\nIMMEDIATE STEPS:\n1. Call your bank immediately and ask them to block the transaction / freeze your account.\n2. Call 1930 within the first hour — the Cyber Helpline can coordinate with banks to freeze the fraudster's account.\n3. Note down the transaction ID, date, time, and amount.\n4. Take a screenshot of the fraudulent link, message, or app.\n5. File a complaint at cybercrime.gov.in under 'Financial Cyber Fraud'.\n\nLEGAL PROVISIONS:\n• Section 66D IT Act — cheating by impersonation using computer (up to 3 years + 1 lakh fine)\n• Section 420 IPC — cheating (up to 7 years imprisonment)\n• Section 406 IPC — criminal breach of trust (up to 3 years)\n\nIf you shared OTP or banking details:\n• Change your net banking password immediately\n• Hotlist your card by calling your bank\n• Check for unauthorized transactions in the last 24 hours\n\nWould you like me to open the Helplines page for you?",
  },

  // ── Identity Theft / Fake Profile / Impersonation ───────────────────────
  {
    patterns: ['fake profile', 'fake account', 'impersonating', 'using my name', 'my photos', 'identity', 'someone made account', 'pretending to be me', 'catfish'],
    response:
      "Someone creating a fake profile of you is identity abuse — a punishable offense. Here's what to do:\n\n1. Take screenshots of the fake profile — URL, photos, messages sent to others.\n2. Report the profile on the platform (Instagram/Facebook/etc.) using 'Report > Fake Account'.\n3. Tell your friends and family not to engage with the fake account.\n4. Call 1930 and report the impersonation.\n5. File a complaint at cybercrime.gov.in under 'Identity Theft / Impersonation'.\n\nLEGAL PROVISIONS:\n• Section 66C IT Act — identity theft (up to 3 years + 1 lakh fine)\n• Section 66D IT Act — cheating by impersonation using computer resources (up to 3 years + 1 lakh fine)\n• Section 419 IPC — cheating by personation (up to 3 years)\n\nWould you like more details on preserving evidence?",
  },

  // ── Complaint Filing / cybercrime.gov.in ────────────────────────────────
  {
    patterns: ['complaint', 'file', 'cybercrime.gov.in', 'how to report', 'register', 'fir', 'police', 'cyber cell', 'first information'],
    response:
      "Filing a complaint on cybercrime.gov.in is straightforward. Here's the complete walkthrough:\n\nSTEP-BY-STEP:\n1. Go to https://cybercrime.gov.in\n2. Click 'File a Complaint' on the homepage.\n3. Select the category: Financial Fraud, Women/Child Related, or Other Cybercrime.\n4. Create an account or login with your mobile number (OTP verification).\n5. Fill in your details, the accused details (if known), and incident description.\n6. Upload evidence: screenshots, URLs, transaction IDs, call recordings.\n7. Submit and note your complaint number for tracking.\n\nIMPORTANT:\n• You can file anonymously for Women/Child-related crimes.\n• False complaints are punishable — be truthful and accurate.\n• Keep your complaint reference number safe for follow-up.\n• The portal forwards complaints to the respective state cyber cell.\n\nFor filing an FIR at your local police station:\n• Section 154 CrPC mandates police to register an FIR for cognizable offenses.\n• If police refuse, you can complain to the Superintendent of Police under Section 154(3) CrPC.\n• You can also approach the Magistrate under Section 156(3) CrPC.\n\nI recommend visiting our 'Form Guide' page for a visual step-by-step walkthrough. Would you like me to take you there?",
  },

  // ── Cyberbullying / Trolling / Abusive Messages ─────────────────────────
  {
    patterns: ['bully', 'bullying', 'abusive', 'harass', 'mean messages', 'insult', 'trolling', 'troll', 'abuse', 'rude comments', 'defamation'],
    response:
      "Cyberbullying is painful but you have strong legal protection. Here's what to do:\n\n1. Do NOT respond to the bully — engaging often makes things worse.\n2. Take screenshots of every abusive message with timestamps.\n3. Block the person on the platform.\n4. Report the messages to the platform (Instagram, WhatsApp, etc.).\n5. Tell a trusted adult, parent, or teacher.\n6. Call 1930 if the bullying is severe or persistent.\n7. File a complaint at cybercrime.gov.in if it involves threats.\n\nLEGAL PROVISIONS:\n• Section 66A IT Act (repealed but alternatives apply)\n• Section 354D IPC — stalking (up to 3 years for repeat offenses)\n• Section 506 IPC — criminal intimidation (up to 2 years, up to 7 years if serious)\n• Section 499/500 IPC — defamation (up to 2 years + fine)\n• Section 153A IPC — promoting enmity (up to 3 years)\n\nYou deserve respect. This is not your fault. Check our Harassment Guide Hub for detailed information on cyberbullying.",
  },

  // ── Doxxing ─────────────────────────────────────────────────────────────
  {
    patterns: ['doxx', 'doxxing', 'my address', 'my phone number', 'exposing my details', 'found where i live', 'leaked my address', 'personal information leaked'],
    response:
      "Doxxing — sharing your private information online — is a serious crime. Here's what to do:\n\n1. Screenshot the posts with URLs and timestamps.\n2. Request the platform to remove the content immediately.\n3. If your home address is exposed, inform local police immediately.\n4. Call 1930 and report the doxxing.\n5. File a complaint at cybercrime.gov.in.\n6. Change passwords and enable two-factor authentication.\n\nLEGAL PROVISIONS:\n• Section 66E IT Act — violation of privacy by capturing/publishing private images (up to 3 years + 2 lakh fine)\n• Section 72 IT Act — breach of confidentiality (up to 2 years + 1 lakh fine)\n• Section 503 IPC — criminal intimidation (up to 2 years)\n\nVisit our Harassment Guide Hub for detailed information on doxxing. Would you like me to take you there?",
  },

  // ── Cyberstalking ───────────────────────────────────────────────────────
  {
    patterns: ['stalking', 'stalker', 'following me', 'watching me', 'tracking me', "won't leave me alone", 'obsessed', 'monitoring me', 'spying'],
    response:
      "Cyberstalking is a punishable offense under Indian law. Here's what to do:\n\n1. Tell the stalker once, clearly, to stop — then do not engage further.\n2. Keep a detailed log of every contact: date, time, platform, content.\n3. Screenshot and save all messages as evidence.\n4. Block the person on every platform.\n5. Report to the platform using harassment/stalking tools.\n6. Call 1930 and file a complaint at cybercrime.gov.in.\n7. Inform your family and friends about the stalker.\n8. Check your devices for spyware or tracking apps.\n\nLEGAL PROVISIONS:\n• Section 354D IPC — stalking (up to 3 years for first conviction, up to 5 years for repeat)\n• Section 506 IPC — criminal intimidation (up to 2 years, up to 7 years if serious)\n• Section 509 IPC — word/gesture intended to insult modesty (up to 3 years)\n\nYou can also read our Harassment Guide Hub for detailed information on cyberstalking.",
  },

  // ── Morphing / Deepfakes ────────────────────────────────────────────────
  {
    patterns: ['morphed', 'deepfake', 'photoshopped', 'fake video', 'altered my photo', 'my face on', 'ai generated', 'face swap'],
    response:
      "Morphing and deepfakes are serious crimes under Indian law. Here's what to do:\n\n1. Do NOT panic — this is a crime and you have legal protection.\n2. Screenshot and save the morphed content with URLs and timestamps.\n3. Report the content to the platform immediately for removal.\n4. File a complaint at cybercrime.gov.in under 'Women/Child Related Crime'.\n5. Call 1930 and inform them about the morphed/deepfake content.\n6. Collect evidence: original photos, the morphed versions, witness statements.\n\nLEGAL PROVISIONS:\n• Section 66E IT Act — violation of privacy (up to 3 years + 2 lakh fine)\n• Section 67A IT Act — sexually explicit material (up to 5 years + 10 lakh fine)\n• Section 499/500 IPC — defamation (up to 2 years + fine)\n• Section 509 IPC — insulting modesty (up to 3 years)\n\nThis is NOT your fault. Visit our Harassment Guide Hub for more information.",
  },

  // ── Non-consensual Image Sharing / Revenge Porn ─────────────────────────
  {
    patterns: ['private photos', 'intimate', 'revenge porn', 'leaked my photos', 'shared my photos', 'non-consensual', 'consent', 'my pictures shared'],
    response:
      "Non-consensual image sharing is a serious crime. Here's what to do RIGHT NOW:\n\n1. Do NOT pay any money if being blackmailed.\n2. Screenshot and document every instance with URLs, timestamps.\n3. Report the content to the platform for urgent removal.\n4. File a complaint IMMEDIATELY at cybercrime.gov.in under 'Women/Child Related Crime'.\n5. Call 1930 and explain this is non-consensual image sharing.\n6. Preserve all evidence — do not delete original communications.\n7. Tell a trusted person — you need emotional support.\n\nLEGAL PROVISIONS:\n• Section 67A IT Act — publishing sexually explicit material (up to 5 years + 10 lakh fine)\n• Section 67 IT Act — publishing obscene material (up to 3 years + 5 lakh fine)\n• Section 354C IPC — voyeurism (up to 3 years for first conviction)\n• Section 509 IPC — insulting modesty of a woman (up to 3 years)\n\nYou are NOT at fault. The person who shared the images committed the crime. Please seek mental health support — call iCall at 9152987821.",
  },

  // ── Gaslighting ─────────────────────────────────────────────────────────
  {
    patterns: ['gaslight', 'gaslighting', 'never said that', 'imagining things', 'losing my mind', 'crazy', 'paranoid', 'manipulative', 'manipulating me'],
    response:
      "Gaslighting is a form of psychological abuse. Here's what to do:\n\n1. Trust your instincts — if something feels wrong, it probably is.\n2. Screenshot and save conversations before they can be edited.\n3. Keep a private journal documenting incidents.\n4. Talk to trusted friends or family about what you are experiencing.\n5. Do not argue with the gaslighter — they want you to doubt yourself.\n6. Seek professional counseling — gaslighting is psychological abuse.\n\nIf the gaslighting involves threats or coercion, you can also:\n• Call 1930 to report cyber harassment.\n• File a complaint at cybercrime.gov.in.\n\nVisit our Harassment Guide Hub for detailed information on gaslighting.",
  },

  // ── Hate Speech ─────────────────────────────────────────────────────────
  {
    patterns: ['hate speech', 'religion', 'caste', 'racist', 'your kind', 'your people', 'do not belong', 'communal', 'bigotry', 'slur'],
    response:
      "Hate speech is a crime under Indian law. Here's what to do:\n\n1. Report the hate speech to the platform immediately.\n2. Screenshot and document all instances with URLs and timestamps.\n3. Do NOT engage or argue with hate speech perpetrators.\n4. Block the accounts spreading hate speech.\n5. File a complaint at cybercrime.gov.in.\n6. Call 1930 to report serious hate speech or incitement to violence.\n\nLEGAL PROVISIONS:\n• Section 153A IPC — promoting enmity between groups (up to 3 years + fine)\n• Section 295A IPC — deliberate acts outraging religious feelings (up to 3 years)\n• Section 505 IPC — statements conducing to public mischief (up to 3 years)\n• Section 66F IT Act — cyber terrorism (if it threatens India's unity/integrity)\n\nYou have the right to exist safely online. Visit our Harassment Guide Hub for more information.",
  },

  // ── Mental Health / Crisis ──────────────────────────────────────────────
  {
    patterns: ['mental health', 'depressed', 'anxiety', 'trauma', 'counseling', 'therapy', 'emotional support', 'psychologist', 'counselor'],
    response:
      "Your mental health matters as much as your physical safety. Here are resources:\n\n- AASRA: 9820466726 (24x7 crisis & suicide prevention)\n- iCall (Tata Institute): 9152987821 (free psychosocial helpline)\n- NIMHANS: 080-46110007 (national mental health helpline)\n- Kiran Helpline: 1800-599-0019 (government support)\n- Vandrevala Foundation: 1860-2662-345 (24x7)\n\nSeeking help is a sign of strength, not weakness. Each harassment type in our Guide Hub includes a mental health section with coping strategies. Would you like me to take you there?",
  },

  // ── Panic / Scared / Self-harm ──────────────────────────────────────────
  {
    patterns: ['scared', 'afraid', 'panic', 'worried', 'anxious', "don't know what to do", 'depressed', 'suicide', 'self-harm', 'kill myself', 'end my life', 'hopeless'],
    response:
      "I hear you, and I want you to know: you are not alone, and there are clear steps you can take. Take a deep breath.\n\nFirst, if you are in immediate danger, call 112.\nFor any cybercrime, call 1930 — they are available 24x7 and are very supportive.\nIf you are feeling overwhelmed, depressed, or having thoughts of self-harm, please call:\n- AASRA: 9820466726 (24x7 crisis helpline)\n- Kiran: 1800-599-0019 (government mental health support)\n- iCall: 9152987821\n- NIMHANS: 080-46110007\n\nTell me what happened. Even a few words will help me guide you. You're doing the right thing by reaching out.",
  },

  // ── IT Act / Legal Provisions / Laws ────────────────────────────────────
  {
    patterns: ['it act', 'information technology act', 'section 66', 'section 67', 'section 65', 'legal provision', 'law', 'punishment', 'imprisonment', 'penalty', 'what law', 'legal action', 'cyber law', 'bharatiya', 'bnss', 'bns'],
    response:
      "Here are the key legal provisions under Indian cyber law that protect you:\n\nINFORMATION TECHNOLOGY ACT, 2000:\n• Section 65 — Tampering with computer source documents (up to 3 years + 2 lakh fine)\n• Section 66 — Computer-related offenses / hacking (up to 3 years + 5 lakh fine)\n• Section 66A — Sending offensive messages (struck down by Supreme Court in 2015, Shreya Singhal case)\n• Section 66C — Identity theft (up to 3 years + 1 lakh fine)\n• Section 66D — Cheating by impersonation using computer (up to 3 years + 1 lakh fine)\n• Section 66E — Violation of privacy by capturing/publishing images (up to 3 years + 2 lakh fine)\n• Section 66F — Cyber terrorism (life imprisonment)\n• Section 67 — Publishing obscene material (up to 3 years + 5 lakh fine)\n• Section 67A — Publishing sexually explicit material (up to 5 years + 10 lakh fine)\n• Section 67B — Child pornography (up to 5 years first conviction, up to 7 years repeat)\n• Section 72 — Breach of confidentiality (up to 2 years + 1 lakh fine)\n• Section 72A — Disclosure of information in breach of lawful contract (up to 3 years + 5 lakh fine)\n\nINDIAN PENAL CODE (IPC) / BNS (Bharatiya Nyaya Sanhita, 2024):\n• Section 419/318 BNS — Cheating by personation (up to 3 years)\n• Section 420/318 BNS — Cheating (up to 7 years)\n• Section 354A/74 BNS — Sexual harassment (up to 3 years)\n• Section 354C/77 BNS — Voyeurism (up to 3 years first conviction)\n• Section 354D/78 BNS — Stalking (up to 3 years first, 5 years repeat)\n• Section 506/351 BNS — Criminal intimidation (up to 2 years, up to 7 years if serious)\n• Section 509/79 BNS — Insulting modesty (up to 3 years)\n• Section 499/500/356 BNS — Defamation (up to 2 years + fine)\n• Section 153A/196 BNS — Promoting enmity (up to 3 years)\n\nVisit our Laws & Policies page for the complete legal framework. Would you like me to take you there?",
  },

  // ── Helpline 1930 / Emergency Steps ─────────────────────────────────────
  {
    patterns: ['1930', 'helpline', 'emergency', 'help number', 'call', 'contact', 'who to call', 'hotline', 'toll free', 'immediate help'],
    response:
      "Here are all the emergency helplines you need:\n\nCYBER EMERGENCY:\n• 1930 — National Cyber Crime Helpline (24x7, toll-free)\n  Reports are forwarded to the relevant state cyber cell and bank for immediate action.\n\nGENERAL EMERGENCY:\n• 112 — Emergency Response Support System (police, ambulance, fire)\n• 100 — Police Control Room\n\nWOMEN-SPECIFIC:\n• 1091 — Women's Helpline\n• 181 — Women's Helpline (domestic violence)\n• NCW Complaints: ncw.nic.in\n\nCHILD-SPECIFIC:\n• 1098 — Childline (24x7)\n• POCSO e-Box: ncpcr.gov.in/childline\n\nMENTAL HEALTH:\n• AASRA: 9820466726 (24x7 crisis)\n• Kiran: 1800-599-0019 (government)\n• iCall: 9152987821\n• NIMHANS: 080-46110007\n\nHOW 1930 WORKS:\n1. Call 1930 and explain the fraud/harassment.\n2. They verify your details and register a complaint.\n3. For financial fraud, they coordinate with your bank to freeze the fraudster's account.\n4. The complaint is forwarded to the respective state cyber cell.\n5. You receive a complaint number for tracking.\n\nVisit our Helplines page for the complete list. Would you like me to take you there?",
  },

  // ── Child Safety / POCSO / Cyberbullying of Minors ──────────────────────
  {
    patterns: ['child', 'minor', 'kid', 'teen', 'underage', 'pocso', 'children', 'my child', 'my son', 'my daughter', 'school'],
    response:
      "Protecting children online is a top priority. Here's what you need to know:\n\nIF YOUR CHILD IS BEING CYBERBULLIED:\n1. Listen to them without judgment — do not blame the child.\n2. Screenshot all evidence — messages, posts, profiles.\n3. Block and report the bully on the platform.\n4. Inform the school if it involves classmates.\n5. Call 1098 (Childline) for professional support.\n6. File a complaint at cybercrime.gov.in under 'Women/Child Related Crime'.\n\nIF YOUR CHILD IS BEING GROOMED/EXPLOITED:\n1. Do NOT confront the perpetrator — this can escalate danger.\n2. Preserve all chat logs, call records, and screenshots.\n3. Call 1930 immediately and report online child exploitation.\n4. File a complaint at cybercrime.gov.in.\n5. Contact NCPCR through the POCSO e-Box at ncpcr.gov.in.\n\nLEGAL PROVISIONS:\n• Section 67B IT Act — Child pornography (up to 5 years first conviction, 7 years repeat)\n• POCSO Act 2012 — Protection of Children from Sexual Offences\n• Section 75 JJ Act — cruelty to child (up to 5 years)\n\nPREVENTION TIPS FOR PARENTS:\n• Use parental controls on devices and apps.\n• Talk openly about online safety with your children.\n• Monitor gaming chats and social media usage.\n• Teach children to never share personal information or photos with strangers.\n\nWould you like more specific guidance?",
  },

  // ── Account Hacking / Social Media Security ─────────────────────────────
  {
    patterns: ['hacked', 'account hacked', 'compromised', 'password', 'login', 'logged me out', 'someone accessed', 'unauthorized access', 'email hacked', 'instagram hacked', 'facebook hacked', 'whatsapp hacked', 'social media'],
    response:
      "A hacked account is urgent — act fast to minimize damage. Here's what to do:\n\nIMMEDIATE STEPS:\n1. Try to reset your password immediately using 'Forgot Password'.\n2. If you can't access the account, use the platform's recovery flow:\n   - Instagram: 'Need more help?' on login page\n   - Facebook: facebook.com/hacked\n   - WhatsApp: email support@support.whatsapp.com\n   - Email: contact your provider's recovery page\n3. Enable two-factor authentication (2FA) immediately after recovery.\n4. Check for unauthorized changes: profile info, linked accounts, payment methods.\n5. Revoke access for suspicious third-party apps.\n6. Warn your contacts not to click any links sent from your account.\n7. Scan your device for malware using a reputable antivirus.\n\nLEGAL PROVISIONS:\n• Section 66 IT Act — Computer-related offense / hacking (up to 3 years + 5 lakh fine)\n• Section 66C IT Act — Identity theft (up to 3 years + 1 lakh fine)\n• Section 43 IT Act — Unauthorized access to computer (compensation up to 1 crore)\n\nPREVENTION:\n• Use strong, unique passwords for every account.\n• Enable 2FA everywhere.\n• Never click suspicious links in emails or messages.\n• Use a password manager.\n\nCall 1930 if financial loss occurred due to the hack. Would you like more help?",
  },

  // ── Phishing / Suspicious Links / Email Scams ───────────────────────────
  {
    patterns: ['phishing', 'suspicious link', 'suspicious email', 'fake email', 'fake message', 'fake sms', 'kyc', 'update kyc', 'verify account', 'click here', 'prize', 'lottery', 'you won'],
    response:
      "Phishing is one of the most common cybercrimes. Here's how to identify and protect yourself:\n\nRED FLAGS — HOW TO SPOT PHISHING:\n• Urgency: 'Your account will be blocked in 24 hours!'\n• Generic greetings: 'Dear Customer' instead of your name\n• Suspicious URLs: Look for misspelled domains (e.g., paytm1.com, sbi-bank.co.in)\n• Requests for OTP, PIN, password, or CVV — NO legitimate company asks for these.\n• Unexpected attachments or links.\n• Offers too good to be true (lottery winnings, prizes, inheritance).\n\nWHAT TO DO:\n1. DO NOT click any links or download attachments.\n2. DO NOT share any personal or financial information.\n3. Verify by calling the company's official customer care (find it on their website, not the email).\n4. Report the phishing email/message to your email provider or telecom.\n5. If you already clicked — run a malware scan immediately.\n6. If you shared financial info — call your bank and 1930 immediately.\n\nLEGAL PROVISIONS:\n• Section 66D IT Act — Cheating by impersonation (up to 3 years + 1 lakh fine)\n• Section 420 IPC — Cheating (up to 7 years)\n\nUse our AI Threat Scanner to analyze suspicious messages before acting on them. Would you like me to take you there?",
  },

  // ── Ransomware / Malware / Device Security ──────────────────────────────
  {
    patterns: ['ransomware', 'malware', 'virus', 'trojan', 'spyware', 'device infected', 'computer infected', 'files encrypted', 'pay ransom', 'locked my files', 'antivirus'],
    response:
      "Ransomware and malware infections are serious. Here's what to do:\n\nIF YOUR DEVICE IS INFECTED / FILES ARE ENCRYPTED:\n1. DO NOT pay the ransom — there's no guarantee you'll get your files back, and it funds further crime.\n2. Disconnect the device from the internet immediately to prevent spread.\n3. Do NOT turn off the device — this can destroy evidence.\n4. Take a photo of any ransom note or error message.\n5. Run a reputable antivirus/anti-malware scan from a clean device (USB rescue disk).\n6. Check if free decryption tools are available at nomoreransom.org.\n7. Report to CERT-In at cert-in.org.in or incident@cert-in.org.in.\n8. Call 1930 and file a complaint at cybercrime.gov.in.\n\nPREVENTION:\n• Keep your operating system and software updated.\n• Use reputable antivirus software.\n• Backup important files regularly (3-2-1 rule: 3 copies, 2 media, 1 offsite).\n• Never download software from unverified sources.\n• Be cautious with email attachments.\n\nLEGAL PROVISIONS:\n• Section 66 IT Act — Computer-related offense (up to 3 years + 5 lakh fine)\n• Section 66F IT Act — Cyber terrorism (if it threatens national security — life imprisonment)\n• Section 43 IT Act — Unauthorized access/damage (compensation up to 1 crore)\n\nWould you like more help?",
  },

  // ── Job Scams / Work from Home / Fake Offers ────────────────────────────
  {
    patterns: ['job', 'work from home', 'registration fee', 'job offer', 'employment', 'telegram job', 'part time job', 'data entry', 'task scam', 'likes scam'],
    response:
      "Be very careful — many job offers online are scams. Here are the warning signs and steps:\n\nRED FLAGS:\n• Asking for a registration or processing fee before starting work.\n• No real interview — just a WhatsApp/Telegram message offering a job.\n• Asking for your Aadhaar/PAN/bank details upfront.\n• Promising unrealistically high pay for simple tasks (liking videos, data entry).\n• Task-based scams: 'Like 5 YouTube videos and get 500 rupees' — this is a bait pattern.\n• Asking you to deposit money first to 'earn commission' on tasks.\n\nWHAT TO DO:\n1. Do NOT pay any money or share documents.\n2. Search the company name online + 'scam' or 'fraud' to check.\n3. Verify the company on the Ministry of Corporate Affairs website (mca.gov.in).\n4. Call 1930 to verify or report.\n5. File a complaint at cybercrime.gov.in if you've already lost money.\n\nLEGAL PROVISIONS:\n• Section 66D IT Act — Cheating by impersonation (up to 3 years + 1 lakh fine)\n• Section 420 IPC — Cheating (up to 7 years)\n\nWould you like more help?",
  },

  // ── Dating / Romance Scams ──────────────────────────────────────────────
  {
    patterns: ['dating', 'romance scam', 'online dating', 'tinder', 'bumble', 'love scam', 'online relationship', 'met online', 'video call blackmail', 'dating app'],
    response:
      "Online dating and romance scams are increasingly common. Here's how to protect yourself:\n\nRED FLAGS:\n• They declare love very quickly without meeting in person.\n• They avoid video calls or make excuses for not meeting.\n• They ask for money (emergency, medical, travel, investment).\n• Their photos look like model shots (reverse image search them).\n• They claim to work overseas (military, oil rig, UN, etc.).\n• They ask you to switch to WhatsApp/Telegram quickly.\n\nVIDEO CALL BLACKMAIL (increasing scam):\n• Scammers record you during an intimate video call, then blackmail you.\n• Do NOT engage in intimate video calls with people you haven't met in person.\n• If already blackmailed: do NOT pay, call 1930, file at cybercrime.gov.in.\n\nWHAT TO DO IF SCAMMED:\n1. Stop all communication immediately.\n2. Screenshot all chats, call logs, and profiles.\n3. Report the profile on the dating platform.\n4. Call 1930 and file a complaint at cybercrime.gov.in.\n5. If you sent money, call your bank immediately.\n\nLEGAL PROVISIONS:\n• Section 66D IT Act — Cheating by impersonation (up to 3 years + 1 lakh fine)\n• Section 420 IPC — Cheating (up to 7 years)\n• Section 384 IPC — Extortion (up to 3 years, if blackmail is involved)\n\nWould you like more help?",
  },

  // ── Social Media Safety / Privacy Settings ──────────────────────────────
  {
    patterns: ['privacy', 'privacy settings', 'social media safety', 'secure my account', 'two factor', '2fa', 'two-factor', 'security settings', 'protect my account', 'account security'],
    response:
      "Securing your social media accounts is essential. Here are the best practices:\n\nPASSWORD SECURITY:\n• Use a unique, strong password for every account (12+ characters, mix of letters, numbers, symbols).\n• Use a password manager (Bitwarden, 1Password, Google Password Manager).\n• Never reuse passwords across accounts.\n\nTWO-FACTOR AUTHENTICATION (2FA):\n• Enable 2FA on every account: Instagram, Facebook, WhatsApp, Email, Banking.\n• Use an authenticator app (Google Authenticator, Authy) instead of SMS.\n• Save backup codes in a secure location.\n\nPRIVACY SETTINGS:\n• Set profiles to private/friends-only.\n• Disable location sharing in posts and stories.\n• Review who can tag you, message you, and find you by phone number/email.\n• Turn off 'Activity Status' so people can't see when you're online.\n• Regularly review 'Apps and Websites' that have access to your account.\n\nGENERAL TIPS:\n• Never accept friend requests from strangers.\n• Don't share your real-time location publicly.\n• Be cautious about what you post — deleted content can be screenshotted.\n• Log out from shared/public devices.\n• Check for data breaches at haveibeenpwned.com.\n\nWould you like specific guidance for a particular platform?",
  },

  // ── Evidence Collection / Digital Forensics ─────────────────────────────
  {
    patterns: ['evidence', 'proof', 'screenshot', 'preserve', 'forensic', 'digital evidence', 'document', 'record', 'save proof', 'how to collect'],
    response:
      "Proper evidence collection is crucial for legal action. Here's how to preserve digital evidence:\n\nSCREENSHOTS:\n• Take screenshots of EVERYTHING — messages, profiles, posts, comments, URLs.\n• Include the date and time — take a screenshot with your phone's clock visible, or use a time-stamped screenshot app.\n• Capture the full URL in browser screenshots.\n• Screenshot the perpetrator's profile before they can delete it.\n\nDO NOT:\n• Do NOT delete any messages or chats — even abusive ones are evidence.\n• Do NOT edit or crop screenshots — full-screen captures are more credible.\n• Do NOT forward evidence to others — this can weaken chain of custody.\n\nADDITIONAL EVIDENCE:\n• Save call recordings (use the phone's call recording feature if legal in your state).\n• Note down the platform, date, time, and context of each incident in a log.\n• If financial fraud: save transaction IDs, bank statements, UPI reference numbers.\n• If hacking: note the time of unauthorized access, IP address if visible.\n• Download a copy of your data from the platform (Instagram/Facebook allow data download).\n\nBACKUP:\n• Back up all evidence to a cloud service (Google Drive, etc.) and a physical device.\n• Keep original files — do not compress or modify them.\n\nThis evidence will be essential when filing a complaint at cybercrime.gov.in or an FIR at your local police station. Would you like guidance on filing a complaint?",
  },

  // ── CERT-In / Reporting Incidents ───────────────────────────────────────
  {
    patterns: ['cert-in', 'cert in', 'incident report', 'vulnerability', 'report vulnerability', 'computer emergency', 'technical support', 'cyber incident'],
    response:
      "CERT-In (Indian Computer Emergency Response Team) is India's national nodal agency for cybersecurity incidents.\n\nWHEN TO CONTACT CERT-In:\n• Malware/ransomware infections on your system.\n• Data breaches affecting your organization.\n• Unauthorized access to critical systems.\n• Phishing campaigns targeting your business.\n• Vulnerability discoveries you want to report.\n\nHOW TO REPORT:\n• Website: https://www.cert-in.org.in\n• Email: incident@cert-in.org.in\n• Phone: +91-11-24368572\n• Online incident reporting form available on their website.\n\nSERVICES PROVIDED:\n• Incident response coordination.\n• Vulnerability notes and advisories.\n• Malware analysis.\n• Cyber crisis management.\n\nFor individual cybercrime (fraud, harassment, etc.), the primary reporting channel is cybercrime.gov.in or calling 1930. CERT-In is more suited for technical/system-level incidents.\n\nWould you like guidance on a specific type of incident?",
  },

  // ── WhatsApp / Messaging Platform Safety ────────────────────────────────
  {
    patterns: ['whatsapp', 'whatsapp scam', 'whatsapp hacked', 'message forward', 'whatsapp group', 'telegram scam', 'telegram', 'messaging app'],
    response:
      "WhatsApp and messaging app scams are very common. Here's how to stay safe:\n\nCOMMON WHATSAPP SCAMS:\n• 'I changed my number' — scammers impersonate a contact and ask for money.\n• 'Your WhatsApp will expire' — fake messages asking you to pay or click a link.\n• 'You won a lottery' — fake prize notifications.\n• Forwarded misinformation — fake news designed to create panic.\n• WhatsApp group scam — added to a group with 'investment tips' (stock/crypto scams).\n\nWHAT TO DO:\n1. Verify identity: Call the person directly before responding to unusual requests.\n2. Check message info: Look at the 'Forwarded' label and forwarding count.\n3. Do NOT share OTP, PIN, or banking details over WhatsApp.\n4. Do NOT click links from unknown senders.\n5. Report and block suspicious contacts.\n6. Enable two-step verification in WhatsApp Settings > Account > Two-step verification.\n\nIF YOUR WHATSAPP IS HACKED:\n1. Email support@support.whatsapp.com immediately with 'Lost/Stolen' in the subject.\n2. They will deactivate your account within 30 minutes.\n3. Re-register with your phone number when you regain control.\n4. Inform your contacts that your account was compromised.\n\nCall 1930 if financial fraud occurred. Would you like more help?",
  },

  // ── Greeting / Help / Start ─────────────────────────────────────────────
  {
    patterns: ['hello', 'hi', 'hey', 'help', 'start', 'what can you do', 'who are you', 'menu', 'options'],
    response:
      "Hello! I'm your AI Cyber Safety & Legal Expert Guide. I'm here to help you through any online threat, harassment, fraud, or legal question. I can assist with:\n\n• Online harassment — blackmail, stalking, bullying, doxxing, deepfakes\n• Financial fraud — UPI scams, phishing, OTP fraud, banking fraud\n• Legal provisions — IT Act sections, IPC/BNS, punishments, your rights\n• Complaint procedures — how to file on cybercrime.gov.in, FIR at police station\n• Emergency steps — Helpline 1930, 112, women's/child helplines\n• Account security — hacking, 2FA, privacy settings\n• Evidence collection — how to screenshot and preserve digital proof\n• Mental health support — crisis helplines, counseling resources\n• Child safety — POCSO, cyberbullying of minors\n• Ransomware & malware — what to do if your device is infected\n\nEverything you share here stays confidential. You can tell me what's happening, or use one of the quick suggestion buttons below. What would you like help with?",
  },

  // ── Thank You / Closing ─────────────────────────────────────────────────
  {
    patterns: ['thank', 'thanks', 'thank you', 'thx', 'great', 'awesome', 'helpful', 'good', 'nice'],
    response:
      "You're very welcome. Remember, I'm always here if you need guidance. Stay safe, and don't hesitate to:\n\n• Call 1930 for any cyber emergency (24x7)\n• Visit cybercrime.gov.in to file a complaint\n• Use the AI Threat Scanner to check suspicious messages\n• Check our Harassment Guide Hub for detailed safety guides\n• Visit the Portals page for all official government cyber resources\n\nTake care of yourself. You're stronger than you think.",
  },
];

const defaultResponse =
  "I understand. I'm here to help with any cyber safety or legal question. Let me know more about your situation — you can describe what happened in your own words, or ask me about:\n\n• Online harassment (blackmail, stalking, bullying, doxxing, deepfakes)\n• Financial fraud (UPI scams, phishing, OTP fraud)\n• Legal provisions (IT Act, IPC/BNS, punishments)\n• How to file a complaint (cybercrime.gov.in, FIR)\n• Emergency steps (Helpline 1930, 112)\n• Account security & hacking\n• Evidence collection & preservation\n• Child safety & POCSO\n• Mental health support\n\nYou can also call 1930 (National Cyber Helpline, 24x7) or visit cybercrime.gov.in right now. What would you like help with?";

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
