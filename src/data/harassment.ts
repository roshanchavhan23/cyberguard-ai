export type HarassmentTypeId =
  | 'cyberbullying'
  | 'doxxing'
  | 'cyberstalking'
  | 'morphing_deepfakes'
  | 'non_consensual_images'
  | 'trolling'
  | 'hate_speech'
  | 'sextortion'
  | 'gaslighting';

export interface HarassmentType {
  id: HarassmentTypeId;
  name: string;
  shortDesc: string;
  description: string;
  icon: string;
  color: string;
  warningSigns: string[];
  immediateActions: string[];
  legalProvisions: string[];
  mentalHealthGuide: {
    impact: string;
    copingStrategies: string[];
    whenToSeekHelp: string;
    resources: string[];
  };
  prevention: string[];
}

export const harassmentTypes: HarassmentType[] = [
  {
    id: 'cyberbullying',
    name: 'Cyberbullying',
    shortDesc: 'Repeated harassment, intimidation, or humiliation through digital channels.',
    description:
      'Cyberbullying involves the use of digital platforms — social media, messaging apps, gaming forums — to repeatedly harass, threaten, or humiliate someone. It includes sending abusive messages, spreading rumors, creating hate pages, and excluding someone deliberately from online groups.',
    icon: 'MessageSquareWarning',
    color: 'text-neon-red',
    warningSigns: [
      'Repeated abusive or threatening messages from the same person or group',
      'Public posts or comments designed to humiliate or shame you',
      'Creation of hate pages, groups, or memes targeting you',
      'Deliberate exclusion from online groups or group chats',
      'Spreading false rumors or doctored images about you online',
      'Impersonation accounts created to damage your reputation',
    ],
    immediateActions: [
      'Do NOT respond or retaliate — bullies seek a reaction',
      'Take screenshots of every message, post, or comment with timestamps',
      'Block the bully on all platforms where they contact you',
      'Report the abuse to the platform (Instagram, Facebook, WhatsApp, etc.)',
      'Tell a trusted adult, parent, teacher, or friend',
      'Call 1930 if threats are severe or persistent',
      'File a complaint at cybercrime.gov.in',
    ],
    legalProvisions: [
      'IT Act Section 67: Publishing obscene material online — up to 3 years imprisonment',
      'BNS 2023 Section 351: Criminal intimidation (includes online threats) — up to 2 years',
      'BNS 2023 Section 354: Sexual harassment (digital forms included)',
      'BNS 2023 Section 356: Defamation (online defamation covered)',
      'POSH Act 2013: If the bullying is sexual harassment at workplace (digital included)',
    ],
    mentalHealthGuide: {
      impact:
        'Cyberbullying can cause anxiety, depression, low self-esteem, social withdrawal, sleep disturbances, and in severe cases, suicidal thoughts. The 24/7 nature of online harassment makes it feel inescapable.',
      copingStrategies: [
        'Limit screen time and take regular breaks from social media',
        'Talk to someone you trust — isolation amplifies the pain',
        'Practice self-care: exercise, sleep, eat well, engage in hobbies',
        'Remember: the bullying reflects the bully, not you',
        'Keep a journal to process emotions and track incidents',
        'Join support groups — connecting with other survivors helps',
      ],
      whenToSeekHelp:
        'Seek professional help immediately if you experience persistent sadness, loss of interest in activities, changes in sleep or appetite, thoughts of self-harm, or feel unable to cope with daily life.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'Vandrevala Foundation: 1860-2662-345 — 24x7 mental health helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
      ],
    },
    prevention: [
      'Set social media profiles to private',
      'Think before posting — avoid sharing sensitive personal information',
      'Use strong privacy settings on all platforms',
      'Do not accept friend requests from strangers',
      'Document and report early — do not wait for it to escalate',
    ],
  },
  {
    id: 'doxxing',
    name: 'Doxxing',
    shortDesc: 'Publishing private personal information online without consent to intimidate or harm.',
    description:
      'Doxxing (from "documents") is the malicious act of researching and publicly broadcasting private or identifying information about an individual — such as home address, phone number, Aadhaar number, workplace, or family details — without their consent, typically to harass, intimidate, or expose them to danger.',
    icon: 'FileWarning',
    color: 'text-neon-amber',
    warningSigns: [
      'Your private information (address, phone, ID numbers) appears online',
      'Strangers contact you using details you never shared publicly',
      'Your photos are posted on public forums without your consent',
      'Your workplace or family details are shared to harm your reputation',
      'Coordinated campaigns sharing your personal data across platforms',
    ],
    immediateActions: [
      'Document everything — screenshot the posts with URLs and timestamps',
      'Request the platform to remove the doxxed content immediately',
      'Contact the website admin or platform support for urgent takedown',
      'If your address is exposed, inform local police immediately',
      'Call 1930 and report the doxxing incident',
      'File a complaint at cybercrime.gov.in under "Other Cybercrime"',
      'Change passwords and enable two-factor authentication on all accounts',
      'Consider temporarily staying elsewhere if your home address is exposed',
    ],
    legalProvisions: [
      'IT Act Section 43: Penalty for damage to computer system — compensation',
      'IT Act Section 66: Hacking with computer systems — up to 3 years',
      'IT Act Section 72: Breach of confidentiality and privacy — up to 2 years',
      'DPDP Act 2023: Unauthorized processing of personal data — up to Rs 250 crore fine',
      'BNS 2023 Section 354E: Voyeurism (if private images involved)',
    ],
    mentalHealthGuide: {
      impact:
        'Doxxing causes intense fear, anxiety, and a sense of violation. Victims often feel unsafe in their own homes, experience paranoia, and may develop PTSD symptoms. The loss of privacy can be deeply traumatizing.',
      copingStrategies: [
        'Reach out to trusted friends and family for support',
        'Stay in a safe place if your location was exposed',
        'Limit social media exposure while the situation is being addressed',
        'Seek counseling — the emotional impact of privacy violation is real',
        'Focus on actionable steps — taking back control helps reduce anxiety',
        'Avoid reading comments or engaging with the doxxers',
      ],
      whenToSeekHelp:
        'Seek immediate help if you feel physically unsafe, experience panic attacks, have persistent fear for your safety, or develop symptoms of PTSD (flashbacks, hypervigilance, nightmares).',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'AASRA: 9820466726 — 24x7 crisis intervention',
      ],
    },
    prevention: [
      'Use pseudonyms or variations of your name on public platforms',
      'Remove personal details (address, workplace) from public profiles',
      'Opt out of people-search websites and data broker databases',
      'Use VPN services to mask your IP address',
      'Regularly search your own name online to monitor exposure',
    ],
  },
  {
    id: 'cyberstalking',
    name: 'Cyberstalking',
    shortDesc: 'Persistent unwanted online surveillance, monitoring, and contact that causes fear.',
    description:
      'Cyberstalking is the repeated, unwanted use of electronic communications to monitor, harass, or threaten someone. It includes obsessively following someone online, sending persistent messages, tracking their location, monitoring their activities, and using spyware or GPS tracking to surveil them.',
    icon: 'Eye',
    color: 'text-neon-purple',
    warningSigns: [
      'Repeated unwanted messages despite being told to stop or being blocked',
      'The person always seems to know your location or activities',
      'Fake accounts are created to bypass your blocks',
      'Your friends and family are contacted by the stalker',
      'Unwanted gifts, messages, or threats delivered through multiple channels',
      'Your online accounts are accessed without your knowledge',
    ],
    immediateActions: [
      'Tell the stalker once, clearly, to stop — then do not engage further',
      'Keep a detailed log of every contact: date, time, platform, content',
      'Screenshot and save all messages, emails, and posts as evidence',
      'Block the person on every platform and communication channel',
      'Report to the platform — use their harassment/stalking report tools',
      'Call 1930 and file a complaint at cybercrime.gov.in',
      'Inform your family, friends, and workplace about the stalker',
      'Check your devices for spyware or tracking apps',
    ],
    legalProvisions: [
      'BNS 2023 Section 354D: Stalking — up to 3 years (7 years for repeat offenders)',
      'IT Act Section 66A: Sending offensive messages (historical reference)',
      'IT Act Section 72: Breach of privacy — up to 2 years',
      'BNS 2023 Section 351: Criminal intimidation — up to 2 years (7 if anonymous)',
      'Protection of Women from Domestic Violence Act 2005 (if known person)',
    ],
    mentalHealthGuide: {
      impact:
        'Cyberstalking creates constant fear and hypervigilance. Victims often experience severe anxiety, sleep disorders, loss of sense of safety, depression, and may develop PTSD. The psychological toll is comparable to physical stalking.',
      copingStrategies: [
        'Develop a safety plan with trusted people',
        'Maintain a record of all incidents — documentation is empowering',
        'Practice grounding techniques for anxiety (breathing, mindfulness)',
        'Maintain normal routines as much as possible',
        'Do not blame yourself — stalking is never the victim\'s fault',
        'Join a support group for stalking survivors',
      ],
      whenToSeekHelp:
        'Seek professional help if you experience constant fear, inability to sleep, panic attacks, intrusive thoughts about the stalker, changes in eating patterns, or feel unable to function in daily life.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'National Commission for Women: 7827170170 — women helpline',
      ],
    },
    prevention: [
      'Do not share your real-time location publicly',
      'Review and limit who can see your social media posts and stories',
      'Use strong, unique passwords and enable 2FA on all accounts',
      'Do not accept friend requests from people you do not know',
      'Regularly audit your social media privacy settings',
      'Be cautious about sharing daily routines or location patterns',
    ],
  },
  {
    id: 'morphing_deepfakes',
    name: 'Morphing & Deepfakes',
    shortDesc: 'AI-manipulated images or videos created to impersonate, defame, or exploit victims.',
    description:
      'Morphing and deepfakes involve using image editing or AI technology to alter someone\'s photos or videos — typically to create explicit content, impersonate them, or spread misinformation. This is one of the fastest-growing forms of cyber harassment, particularly targeting women.',
    icon: 'Fingerprint',
    color: 'text-neon-red',
    warningSigns: [
      'Your photos are edited and shared in explicit or compromising contexts',
      'AI-generated videos show you saying or doing things you never did',
      'Your face is superimposed on someone else\'s body in images or videos',
      'Fake media content is circulating on social media under your name',
      'People mention seeing content featuring you that you never created',
    ],
    immediateActions: [
      'Do NOT panic — this is a crime and you have legal protection',
      'Screenshot and save the morphed content with URLs and timestamps',
      'Report the content to the platform immediately for removal',
      'File a complaint at cybercrime.gov.in under "Women/Child Related"',
      'Call 1930 and inform them about the morphed/deepfake content',
      'Collect evidence: original photos, the morphed versions, witness statements',
      'Inform trusted family members or friends for support',
      'Request the platform to preserve evidence for law enforcement',
    ],
    legalProvisions: [
      'IT Act Section 66E: Violation of privacy (capturing/sharing private images) — up to 3 years',
      'IT Act Section 67: Publishing obscene material — up to 3 years + fine up to Rs 10 lakh',
      'IT Act Section 67A: Publishing sexually explicit material — up to 5 years + fine',
      'BNS 2023 Section 354E: Voyeurism — up to 3 years (7 years repeat)',
      'Indecent Representation of Women Act 1986: Up to 2-5 years imprisonment',
      'DPDP Act 2023: Unauthorized use of personal data — up to Rs 250 crore fine',
    ],
    mentalHealthGuide: {
      impact:
        'Being the victim of morphing or deepfakes is deeply violating. Victims experience shame, anger, helplessness, anxiety, and depression. The public nature of the harm amplifies trauma. Women are disproportionately affected and may face social ostracism.',
      copingStrategies: [
        'Remember: this is NOT your fault — someone else committed a crime',
        'Surround yourself with supportive, non-judgmental people',
        'Avoid searching for or viewing the morphed content repeatedly',
        'Focus on legal action — taking steps to remove content is empowering',
        'Practice self-compassion — you are a victim, not a participant',
        'Seek counseling specialized in image-based sexual abuse trauma',
      ],
      whenToSeekHelp:
        'Seek immediate professional help if you experience suicidal thoughts, severe depression, inability to face people, panic attacks, or feel completely overwhelmed. The emotional impact is severe and professional support is essential.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'AASRA: 9820466726 — 24x7 crisis intervention',
        'National Commission for Women: 7827170170',
      ],
    },
    prevention: [
      'Be selective about sharing photos online — even with trusted people',
      'Use watermarks on your photos when possible',
      'Set social media profiles to private and limit photo sharing',
      'Do not share high-resolution face photos on public platforms',
      'Be cautious about photo-sharing apps that store images unencrypted',
      'Regularly reverse-image-search your photos to check for misuse',
    ],
  },
  {
    id: 'non_consensual_images',
    name: 'Non-Consensual Image Sharing',
    shortDesc: 'Sharing private or intimate images without the subject\'s consent.',
    description:
      'Non-consensual image sharing (also called "revenge porn") is the distribution of private, intimate, or sexual images or videos of someone without their consent. This includes images shared by former partners, hacked from devices, or obtained through coercion. It is a serious crime under Indian law.',
    icon: 'ImageOff',
    color: 'text-neon-red',
    warningSigns: [
      'Intimate photos you shared privately are circulating online',
      'Someone threatens to share your private images',
      'Your private images are sent to your family, friends, or workplace',
      'Photos from a hacked device or cloud account appear online',
      'An ex-partner distributes intimate content after a breakup',
    ],
    immediateActions: [
      'Do NOT pay any money if being blackmailed — payment does not stop distribution',
      'Screenshot and document every instance with URLs, timestamps, and context',
      'Report the content to the platform for urgent removal',
      'File a complaint IMMEDIATELY at cybercrime.gov.in under "Women/Child Related"',
      'Call 1930 and explain this is non-consensual image sharing',
      'Preserve all evidence — do not delete original communications',
      'Contact a lawyer — courts can order urgent takedowns',
      'Tell a trusted person — you need emotional support through this',
    ],
    legalProvisions: [
      'IT Act Section 66E: Violation of privacy — up to 3 years imprisonment + fine',
      'IT Act Section 67: Publishing obscene material — up to 3 years + Rs 10 lakh fine',
      'IT Act Section 67A: Sexually explicit material — up to 5 years + fine',
      'BNS 2023 Section 354E: Voyeurism — up to 3 years (7 years repeat)',
      'Indecent Representation of Women Act 1986: 2-5 years imprisonment',
      'POSH Act 2013: If images shared in workplace context',
    ],
    mentalHealthGuide: {
      impact:
        'Non-consensual image sharing is one of the most psychologically devastating forms of cyber abuse. Victims often experience severe trauma, shame, anxiety, depression, social withdrawal, and suicidal ideation. The permanence of online content creates a sense of inescapable violation.',
      copingStrategies: [
        'You are NOT at fault — the person who shared the images committed the crime',
        'Seek immediate emotional support from a trusted person or counselor',
        'Focus on removal efforts — taking action restores a sense of control',
        'Avoid isolation — shame thrives in secrecy',
        'Connect with survivor support organizations',
        'Practice self-care: sleep, nutrition, and gentle exercise',
      ],
      whenToSeekHelp:
        'Seek immediate help if you have any suicidal thoughts, feel completely hopeless, experience severe depression, or feel you cannot continue. This is a crisis situation and professional support is critical. Call a mental health helpline right away.',
      resources: [
        'AASRA: 9820466726 — 24x7 crisis intervention and suicide prevention',
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'National Commission for Women: 7827170170',
      ],
    },
    prevention: [
      'Never share intimate images with anyone, even trusted partners',
      'Use secure, encrypted messaging apps for sensitive communications',
      'Regularly update device passwords and enable biometric locks',
      'Disable cloud auto-backup for sensitive photos',
      'Be aware that deleted photos can sometimes be recovered',
    ],
  },
  {
    id: 'trolling',
    name: 'Trolling',
    shortDesc: 'Deliberately provoking, insulting, or disrupting online conversations to cause distress.',
    description:
      'Trolling is the act of deliberately posting inflammatory, offensive, or provocative messages online to upset people, disrupt conversations, or elicit emotional responses. While a single troll comment may seem minor, coordinated trolling campaigns can cause significant psychological harm.',
    icon: 'MessageCircleWarning',
    color: 'text-neon-amber',
    warningSigns: [
      'Deliberately provocative or insulting comments on your posts',
      'Coordinated groups targeting your content with negative comments',
      'Mocking or sarcastic responses designed to provoke a reaction',
      'Off-topic or inflammatory content disrupting your online discussions',
      'Repeated tagging or mentioning to draw you into arguments',
    ],
    immediateActions: [
      'Do NOT feed the trolls — responding is what they want',
      'Use platform tools: block, mute, report, and restrict',
      'Screenshot persistent or threatening trolling for evidence',
      'Disable comments on posts if trolling is overwhelming',
      'Take breaks from social media when feeling targeted',
      'Call 1930 if trolling escalates to threats or coordinated harassment',
      'Report to platform — use harassment report mechanisms',
    ],
    legalProvisions: [
      'BNS 2023 Section 351: Criminal intimidation (if threats involved) — up to 2 years',
      'BNS 2023 Section 356: Defamation — up to 2 years',
      'IT Act Section 67: Obscene content — up to 3 years',
      'Intermediary Guidelines 2021: Platforms must remove content within 36 hours',
    ],
    mentalHealthGuide: {
      impact:
        'Persistent trolling can erode self-esteem, cause anxiety and depression, and make people withdraw from online (and sometimes offline) life. Coordinated trolling campaigns can be particularly damaging to mental health.',
      copingStrategies: [
        'Remember: trolling says everything about the troll, nothing about you',
        'Use block and mute liberally — protect your peace',
        'Curate your online environment — unfollow toxic spaces',
        'Talk to friends who understand online culture',
        'Take regular digital detox breaks',
        'Channel energy into positive online communities',
      ],
      whenToSeekHelp:
        'Seek help if trolling causes persistent low mood, anxiety, social withdrawal, loss of confidence, or if you feel afraid to go online or engage publicly.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'NIMHANS: 080-46110007 — national mental health helpline',
      ],
    },
    prevention: [
      'Set comment filters and restrictions on your social media posts',
      'Do not engage with provocative content — block and move on',
      'Maintain separate personal and public online personas',
      'Use platform moderation tools proactively',
      'Build a supportive online community around your content',
    ],
  },
  {
    id: 'hate_speech',
    name: 'Hate Speech',
    shortDesc: 'Online content that attacks people based on religion, caste, gender, ethnicity, or identity.',
    description:
      'Hate speech online involves posts, comments, videos, or messages that attack, demean, or incite violence against individuals or groups based on religion, caste, gender, sexual orientation, ethnicity, or other identity characteristics. It creates a hostile environment and can lead to real-world violence.',
    icon: 'Ban',
    color: 'text-neon-red',
    warningSigns: [
      'Content attacking you for your religion, caste, gender, or identity',
      'Slurs or derogatory language targeting your community',
      'Incitement to violence against your group',
      'Stereotyping or dehumanizing content about your identity',
      'Coordinated campaigns of hateful content against your community',
    ],
    immediateActions: [
      'Report the hate speech to the platform immediately',
      'Screenshot and document all instances with URLs and timestamps',
      'Do NOT engage or argue with hate speech perpetrators',
      'Block the accounts spreading hate speech',
      'File a complaint at cybercrime.gov.in',
      'Call 1930 to report serious hate speech or incitement to violence',
      'If the hate speech incites violence, contact local police',
    ],
    legalProvisions: [
      'BNS 2023 Section 196: Promoting enmity between groups — up to 3 years',
      'BNS 2023 Section 197: Statements creating communal disharmony — up to 3 years',
      'BNS 2023 Section 354A: Sexual harassment (gender-based hate)',
      'IT Act Section 67: Obscene content — up to 3 years',
      'SC/ST (Prevention of Atrocities) Act: Enhanced penalties for caste-based hate',
      'Intermediary Guidelines 2021: Platforms must remove hate speech within 36 hours',
    ],
    mentalHealthGuide: {
      impact:
        'Being targeted by hate speech causes feelings of violation, anger, fear, and helplessness. It can damage sense of identity and belonging, cause anxiety about one\'s safety, and lead to depression. Group-targeted hate speech creates community-wide psychological harm.',
      copingStrategies: [
        'Connect with your community — collective support is powerful',
        'Report and document — action reduces feelings of helplessness',
        'Do not internalize the hatred — it reflects the speaker\'s prejudice',
        'Seek spaces and communities that affirm your identity',
        'Practice self-care and maintain offline connections',
        'Channel anger into constructive action or advocacy',
      ],
      whenToSeekHelp:
        'Seek help if hate speech causes persistent anxiety, fear for your safety, depression, loss of identity confidence, or if you feel isolated and unsupported.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'National Human Rights Commission: 14433',
      ],
    },
    prevention: [
      'Use platform tools to filter and report hate speech proactively',
      'Curate your feed to minimize exposure to hateful content',
      'Support others who are targeted — solidarity reduces harm',
      'Be an active bystander — report hate speech you witness',
      'Maintain strong community connections for support',
    ],
  },
  {
    id: 'sextortion',
    name: 'Sextortion',
    shortDesc: 'Blackmailing someone by threatening to expose their intimate content or activities.',
    description:
      'Sextortion is a form of blackmail where the perpetrator threatens to release intimate images, videos, or information about the victim unless demands — typically money, more intimate content, or sexual favors — are met. It is one of the most serious and rapidly growing cybercrimes, often targeting young people and women.',
    icon: 'ShieldAlert',
    color: 'text-neon-red',
    warningSigns: [
      'Someone threatens to share your intimate photos or videos',
      'You are asked to pay money to prevent content from being leaked',
      'A hacker claims to have accessed your webcam or private files',
      'You are pressured to send more intimate content to prevent release',
      'The blackmailer threatens to send content to your family or employer',
      'You receive messages claiming your device has been compromised',
    ],
    immediateActions: [
      'Do NOT pay — paying never stops a blackmailer, it confirms vulnerability',
      'Do NOT send more content — this only deepens the blackmail chain',
      'Stop all communication with the blackmailer immediately',
      'Screenshot and save EVERY message, email, and threat as evidence',
      'Call 1930 IMMEDIATELY — this is a priority crime',
      'File a complaint at cybercrime.gov.in under "Women/Child Related"',
      'Change all your passwords and enable two-factor authentication',
      'Tell someone you trust — you need support and should not face this alone',
      'Check your devices for malware or spyware',
    ],
    legalProvisions: [
      'IT Act Section 66E: Violation of privacy — up to 3 years',
      'IT Act Section 67: Publishing obscene material — up to 3 years + Rs 10 lakh fine',
      'BNS 2023 Section 351: Criminal intimidation — up to 2 years (7 if anonymous)',
      'BNS 2023 Section 354: Sexual harassment — up to 3 years',
      'BNS 2023 Section 384: Extortion — up to 3 years + fine',
      'BNS 2023 Section 354E: Voyeurism — up to 3 years',
      'POCSO Act 2012: Enhanced penalties if victim is a minor',
    ],
    mentalHealthGuide: {
      impact:
        'Sextortion is extremely traumatic. Victims experience terror, shame, isolation, panic, and desperation. The threat of exposure creates constant anxiety and can lead to severe depression, self-harm, and suicidal ideation. The psychological impact is profound and long-lasting.',
      copingStrategies: [
        'You are a victim of a crime — this is NOT your fault',
        'Break the silence — tell someone you trust immediately',
        'Do NOT isolate yourself — shame grows in isolation',
        'Focus on legal action — law enforcement deals with this regularly',
        'Remember: the blackmailer is the criminal, not you',
        'Seek specialized trauma counseling as soon as possible',
      ],
      whenToSeekHelp:
        'Seek IMMEDIATE help if you have any thoughts of self-harm or suicide, feel completely trapped, or are considering paying or sending more content. This is a crisis — call a mental health helpline or 112 right now.',
      resources: [
        'AASRA: 9820466726 — 24x7 crisis intervention and suicide prevention',
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'Emergency: 112 — if in immediate danger',
      ],
    },
    prevention: [
      'Never share intimate images with anyone online',
      'Do not click on suspicious links that may install malware',
      'Cover webcam when not in use',
      'Use strong passwords and 2FA on all accounts',
      'Be cautious of online relationships that move too quickly',
      'Run regular malware scans on your devices',
    ],
  },
  {
    id: 'gaslighting',
    name: 'Gaslighting',
    shortDesc: 'Psychological manipulation to make someone doubt their own reality, memory, or perception.',
    description:
      'Digital gaslighting is a form of psychological manipulation where someone uses digital communications to make you doubt your own memory, perception, or sanity. This includes denying conversations happened, altering messages, planting false information, and using technology to manipulate your sense of reality.',
    icon: 'Brain',
    color: 'text-neon-purple',
    warningSigns: [
      'Someone denies conversations or messages that you clearly remember',
      'Messages or posts are edited or deleted to make you question reality',
      'You are told you are "crazy" or "overreacting" to valid concerns',
      'False information is planted to make you doubt your memory',
      'Your concerns are dismissed with "that never happened" or "you\'re imagining things"',
      'Screenshots are manipulated to show things that did not occur',
    ],
    immediateActions: [
      'Trust your instincts — if something feels wrong, it probably is',
      'Screenshot and save conversations before they can be edited or deleted',
      'Keep a private journal documenting incidents and your version of events',
      'Talk to trusted friends or family about what you are experiencing',
      'Do not argue with the gaslighter — they want you to doubt yourself',
      'Seek professional counseling — gaslighting is psychological abuse',
      'If threats or harassment are involved, call 1930',
    ],
    legalProvisions: [
      'BNS 2023 Section 351: Criminal intimidation (if threats involved)',
      'BNS 2023 Section 354: Sexual harassment (if in relationship context)',
      'IT Act Section 72: Breach of privacy and confidentiality',
      'Protection of Women from Domestic Violence Act 2005 (if in domestic context)',
      'POSH Act 2013: If workplace-related psychological harassment',
    ],
    mentalHealthGuide: {
      impact:
        'Gaslighting erodes self-trust, confidence, and sense of reality. Victims often experience confusion, self-doubt, anxiety, depression, and may begin to question their own sanity. Long-term gaslighting can cause significant psychological damage and complex PTSD.',
      copingStrategies: [
        'Trust your memory — write things down to verify your recollection',
        'Keep evidence: screenshots, journals, voice recordings',
        'Talk to others who can validate your perception of reality',
        'Set clear boundaries with the gaslighter',
        'Limit or cut contact if possible',
        'Rebuild self-trust through therapy and self-affirmation',
      ],
      whenToSeekHelp:
        'Seek professional help if you frequently doubt your own memory or perception, feel confused about what is real, experience anxiety or depression, feel you are losing your grip on reality, or have lost confidence in your own judgment.',
      resources: [
        'iCall (Tata Institute): 9152987821 — free psychosocial helpline',
        'NIMHANS: 080-46110007 — national mental health helpline',
        'Kiran Helpline: 1800-599-0019 — government mental health support',
        'National Commission for Women: 7827170170',
      ],
    },
    prevention: [
      'Maintain independent records of important conversations',
      'Trust your instincts — do not let others define your reality',
      'Maintain a strong support network of people who validate you',
      'Be cautious of relationships where you are constantly doubted',
      'Keep digital evidence — screenshots are harder to gaslight away',
    ],
  },
];
