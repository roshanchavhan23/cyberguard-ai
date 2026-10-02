/*
# CyberGuard AI — Add Cyber Laws & Policies Table

## Overview
Adds a new `cyber_laws` table to store Government of India's cyber safety
rules, regulations, acts, and policies. This is a read-only reference
table — the app fetches rows and displays them on a dedicated "Laws &
Policies" page so visitors can browse India's legal framework for online
safety.

## New Table

### cyber_laws
- id (serial, primary key) — auto-incrementing identifier
- law_name (text, not null) — official name of the act / rule / policy
- category (text, not null) — grouping: 'act', 'rule', 'policy', 'guideline', 'amendment'
- year (integer) — year enacted or last major amendment
- ministry (text) — responsible ministry / department
- description (text, not null) — plain-English summary of what the law covers
- key_provisions (text[]) — array of key provisions / sections
- penalties (text) — summary of penalties / punishments
- reporting_authority (text) — where to report violations
- official_url (text) — link to the official gazette / ministry page
- language (text, default 'en') — UI language for the record
- created_at (timestamptz) — row creation timestamp

## Security
- RLS enabled on cyber_laws.
- SELECT allowed for anon + authenticated (public reference data).
- No INSERT / UPDATE / DELETE policies — data is seeded via migration only.

## Indexes
- cyber_laws: category, year for filtering and sorting
*/

CREATE TABLE IF NOT EXISTS cyber_laws (
  id                 serial PRIMARY KEY,
  law_name           text NOT NULL,
  category           text NOT NULL CHECK (category IN ('act', 'rule', 'policy', 'guideline', 'amendment')),
  year               integer,
  ministry           text,
  description        text NOT NULL,
  key_provisions     text[] NOT NULL DEFAULT '{}',
  penalties          text,
  reporting_authority text,
  official_url       text,
  language           text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cyber_laws ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cyber_laws" ON cyber_laws;
CREATE POLICY "anon_select_cyber_laws" ON cyber_laws FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_cyber_laws_category ON cyber_laws (category);
CREATE INDEX IF NOT EXISTS idx_cyber_laws_year ON cyber_laws (year DESC);

-- ============================================================
-- SEED DATA: Government of India Cyber Laws & Policies
-- ============================================================

INSERT INTO cyber_laws (law_name, category, year, ministry, description, key_provisions, penalties, reporting_authority, official_url) VALUES
(
  'Information Technology Act, 2000',
  'act',
  2000,
  'Ministry of Electronics and Information Technology (MeitY)',
  'The primary legislation governing digital activities, e-commerce, cybercrime, and electronic records in India. It provides the legal framework for electronic governance and prescribes penalties for various cyber offences.',
  ARRAY[
    'Section 43: Damage to computer systems without access — compensation up to Rs 1 crore',
    'Section 65: Tampering with source documents — imprisonment up to 3 years and/or fine up to Rs 2 lakh',
    'Section 66: Computer-related offences (hacking, identity theft, fraud) — imprisonment up to 3 years and/or fine up to Rs 5 lakh',
    'Section 66C: Identity theft — imprisonment up to 3 years and/or fine up to Rs 1 lakh',
    'Section 66D: Cheating by personation using computer — imprisonment up to 3 years and/or fine up to Rs 1 lakh',
    'Section 66E: Violation of privacy (capturing/transmitting private images) — imprisonment up to 3 years and/or fine up to Rs 2 lakh',
    'Section 67: Publishing or transmitting obscene material in electronic form — imprisonment up to 3 years and/or fine up to Rs 5 lakh',
    'Section 67A: Publishing sexually explicit material — imprisonment up to 5 years and fine up to Rs 10 lakh',
    'Section 72: Breach of confidentiality and privacy — imprisonment up to 2 years and/or fine up to Rs 1 lakh'
  ],
  'Varies by section: imprisonment from 1 to 10 years, fines from Rs 1 lakh to Rs 10 lakh, and compensation claims up to Rs 1 crore.',
  'Local Cyber Crime Cell, National Cyber Crime Reporting Portal (cybercrime.gov.in), Helpline 1930',
  'https://www.meity.gov.in/acts/it-act-2000'
),
(
  'Information Technology (Amendment) Act, 2008',
  'amendment',
  2008,
  'Ministry of Electronics and Information Technology (MeitY)',
  'Major amendment to the IT Act 2000 that added provisions for cyber terrorism, data protection, privacy, and new forms of cybercrime including identity theft and voyeurism.',
  ARRAY[
    'Section 66F: Cyber terrorism — imprisonment for life',
    'Section 67B: Child pornography in electronic form — imprisonment up to 5 years (first conviction)',
    'Section 67C: Intermediary obligations to preserve and retain information',
    'Section 69: Power to issue directions for interception, monitoring, or decryption of information',
    'Added definitions for: communication device, cyber terrorism, electronic signature, identity theft, voyeurism'
  ],
  'Cyber terrorism: life imprisonment. Other offences: 3 to 10 years imprisonment with fines up to Rs 10 lakh.',
  'National Cyber Crime Reporting Portal (cybercrime.gov.in), Helpline 1930',
  'https://www.meity.gov.in/acts/amendments-it-act-2008'
),
(
  'Bharatiya Nyaya Sanhita, 2023 (BNS)',
  'act',
  2023,
  'Ministry of Home Affairs',
  'Replaced the Indian Penal Code (IPC) from July 1, 2024. Contains specific provisions for cyber-related offences including defamation, extortion by threat, voyeurism, and stalking committed through electronic means.',
  ARRAY[
    'Section 351: Criminal force — includes electronic threats causing fear of injury',
    'Section 352: Intentional insult to provoke breach of peace — includes online abuse',
    'Section 354: Assault or criminal force against woman — includes cyber harassment',
    'Section 354D: Stalking — includes monitoring online activity, email, or electronic communication',
    'Section 383: Extortion — includes threats made through electronic communication',
    'Section 499/500: Defamation — includes publication through electronic media'
  ],
  'Varies by offence: imprisonment from 1 to 7 years with fines. Stalking: up to 3 years for repeat offenders. Extortion: up to 3 years with fine.',
  'Local Police Station, Cyber Crime Cell, cybercrime.gov.in',
  'https://www.indiacode.nic.in/'
),
(
  'Digital Personal Data Protection Act, 2023',
  'act',
  2023,
  'Ministry of Electronics and Information Technology (MeitY)',
  'India''s first comprehensive data protection law. Regulates the processing of digital personal data, protects individuals'' data privacy rights, and establishes obligations for data fiduciaries (organizations handling personal data).',
  ARRAY[
    'Consent required for processing personal data — must be free, specific, informed, and unambiguous',
    'Right to access, correct, erase, and nominate (data principal rights)',
    'Data fiduciary obligations: purpose limitation, data minimization, storage limitation, security safeguards',
    'Special protections for children''s data (under 18) — no targeted advertising or behavioral tracking',
    'Significant Data Fiduciaries: additional obligations like Data Protection Impact Assessment',
    'Cross-border data transfer restrictions to countries notified by Central Government',
    'Penalties up to Rs 250 crore per instance for non-compliance'
  ],
  'Financial penalties up to Rs 250 crore per instance. No imprisonment provisions. Penalties determined by Data Protection Board.',
  'Data Protection Board of India (via complaint), MeitY',
  'https://www.meity.gov.in/data-protection-framework'
),
(
  'National Cyber Crime Reporting Portal Guidelines',
  'guideline',
  2019,
  'Ministry of Home Affairs',
  'Official guidelines for reporting cybercrime through the national portal. Covers categories of complaints, evidence requirements, and the procedure for filing online complaints for cybercrime and cyber fraud.',
  ARRAY[
    'Report cybercrime complaints online at cybercrime.gov.in',
    'Categories: cybercrime against women & children, financial cyber fraud, other cybercrime',
    'Required evidence: screenshots, URLs, bank transaction details, communication records',
    'Helpline number 1930 for immediate assistance (24x7)',
    'Complaints forwarded to relevant State/UT police for investigation',
    'Status tracking available through the portal with complaint ID'
  ],
  'Not applicable — reporting guidelines only.',
  'National Cyber Crime Reporting Portal (cybercrime.gov.in), Helpline 1930',
  'https://cybercrime.gov.in'
),
(
  'IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021',
  'rule',
  2021,
  'Ministry of Electronics and Information Technology (MeitY)',
  'Rules regulating intermediaries (social media platforms, OTT platforms, digital news media). Requires platforms to remove unlawful content within strict timelines and establishes a grievance redressal mechanism.',
  ARRAY[
    'Intermediaries must remove unlawful content within 36 hours of receiving a complaint',
    'Grievance Officer must acknowledge complaints within 24 hours and resolve within 15 days',
    'Social media platforms with 5M+ users must publish monthly compliance reports',
    'Significant publishers must appoint a Grievance Officer, Nodal Officer, and Resident Grievance Officer',
    'Self-regulation for OTT platforms: content classification by age (U, U/A 7+, 13+, 16+, A)',
    'Traceability requirement: platforms must identify the originator of messages for investigation purposes'
  ],
  'Non-compliance: loss of safe harbor protection under Section 79 of IT Act. Penalties as determined by authorities.',
  'Grievance Officer of the platform, MeitY, Ministry of Information and Broadcasting',
  'https://www.meity.gov.in/intermediary-guidelines'
),
(
  'Indecent Representation of Women (Prohibition) Act, 1986',
  'act',
  1986,
  'Ministry of Women and Child Development',
  'Prohibits indecent representation of women through advertisements, publications, writings, paintings, or any other manner. Applies to electronic media including social media and online platforms.',
  ARRAY[
    'Section 7: Prohibition of indecent representation of women — imprisonment up to 2 years and fine up to Rs 2,000 (first conviction)',
    'Section 7(2): Subsequent conviction — imprisonment up to 5 years and fine up to Rs 10,000',
    'Applies to electronic media, social media, and online content',
    'Includes depiction of women in a manner that is derogatory to women'
  ],
  'First conviction: up to 2 years imprisonment and fine up to Rs 2,000. Subsequent: up to 5 years and fine up to Rs 10,000.',
  'Local Police Station, National Commission for Women (ncw.nic.in)',
  'https://wcd.nic.in/acts/indecent-representation-women-prohibition-act-1986'
),
(
  'Protection of Children from Sexual Offences (POCSO) Act, 2012',
  'act',
  2012,
  'Ministry of Women and Child Development',
  'Comprehensive law to protect children from sexual abuse, sexual harassment, and pornography. Includes provisions for cyber-enabled offences against children including online child sexual exploitation.',
  ARRAY[
    'Section 11: Sexual harassment — includes showing pornography to a child or making a child expose their body',
    'Section 13: Using a child for pornographic purposes — imprisonment up to 5 years (first conviction)',
    'Section 14: Storing child pornography — imprisonment up to 3 years and/or fine',
    'Section 15: Transmitting child pornography — imprisonment up to 5 years and/or fine',
    'Online enticement, grooming, and sextortion of minors covered',
    'Mandatory reporting of child sexual offences under Section 19'
  ],
  'Child pornography: 5 to 7 years imprisonment. Sexual assault: 3 to 10 years. Aggravated: life imprisonment.',
  'Local Police, NCPCR (ncpcr.gov.in), cybercrime.gov.in',
  'https://wcd.nic.in/acts/1-protection-children-sexual-offences-act-2012'
),
(
  'Reserve Bank of India (Digital Payment Security) Guidelines',
  'guideline',
  2020,
  'Reserve Bank of India',
  'RBI guidelines for secure digital payments, fraud prevention, and customer protection. Covers UPI fraud, unauthorized electronic transactions, and the customer liability framework for digital banking.',
  ARRAY[
    'Zero liability for unauthorized electronic transactions reported within 3 working days',
    'Limited liability: Rs 5,000 for basic accounts, Rs 10,000 for other accounts (reported within 4-7 days)',
    'Banks must resolve fraud complaints within 90 days',
    'Two-factor authentication mandatory for all online card and UPI transactions',
    'Customer must not share OTP, PIN, or CVV with anyone — sharing voids zero liability',
    'Report unauthorized transactions to bank immediately and file complaint at cybercrime.gov.in'
  ],
  'Customer liability limited based on reporting timeline. Banks liable for delayed resolution beyond 90 days.',
  'Bank Grievance Redressal, RBI Ombudsman (cms.rbi.org.in), cybercrime.gov.in',
  'https://www.rbi.org.in/'
),
(
  'National Cyber Security Policy, 2013',
  'policy',
  2013,
  'Ministry of Electronics and Information Technology (MeitY)',
  'India''s first national cyber security policy. Aims to protect information, build resilience, and create a secure cyber ecosystem for individuals, businesses, and government.',
  ARRAY[
    'Objective: Create a secure cyber ecosystem in the country',
    'Encourage organizations to adopt information security best practices',
    'Develop indigenous security technologies through research and development',
    'Create a workforce of 5 lakh trained cyber security professionals',
    'Establish CERT-In as the national nodal agency for cyber incident response',
    'Promote public-private partnerships for cyber security'
  ],
  'Not applicable — policy framework only.',
  'CERT-In (cert-in.org.in), MeitY',
  'https://www.meity.gov.in/national-cyber-security-policy'
),
(
  'IT (Reasonable Security Practices and Sensitive Personal Data or Information) Rules, 2011',
  'rule',
  2011,
  'Ministry of Electronics and Information Technology (MeitY)',
  'Rules under Section 43A of the IT Act defining sensitive personal data (SPDI) and requiring reasonable security practices for handling it. Includes consent requirements and breach notification obligations.',
  ARRAY[
    'Sensitive personal data includes: passwords, financial info, health info, biometric data, sexual orientation, caste/religion, political beliefs',
    'Consent required in writing or electronically for collecting SPDI',
    'Purpose limitation: SPDI can only be used for the purpose disclosed',
    'Disclosure of SPDI requires consent, unless required by law enforcement',
    'Data breach notification required when SPDI is compromised',
    'Reasonable security practices: ISO 27001, or documented security practices and programs'
  ],
  'Compensation claims under Section 43A of IT Act — determined by adjudicating officer, up to Rs 5 crore.',
  'Adjudicating Officer (IT Act), cybercrime.gov.in',
  'https://www.meity.gov.in/rules-it-act'
),
(
  'Cyber Crime Against Women and Children — MHA Advisory',
  'guideline',
  2018,
  'Ministry of Home Affairs',
  'Advisory guidelines issued by MHA to states and UTs for handling cybercrime cases against women and children, including online harassment, stalking, revenge porn, and identity misuse.',
  ARRAY[
    'Dedicated cyber crime cells in every state/UT',
    'Special training for police officers handling cases against women and children',
    'Priority investigation for cases involving minors',
    'Victim confidentiality and identity protection mandatory',
    'Coordination with platforms for swift removal of offensive content',
    'Awareness campaigns in schools and colleges about online safety'
  ],
  'Not applicable — advisory guidelines only.',
  'State Cyber Crime Cells, National Commission for Women, NCPCR',
  'https://www.mha.gov.in/'
),
(
  'Digital India Act (Proposed)',
  'policy',
  2023,
  'Ministry of Electronics and Information Technology (MeitY)',
  'Proposed comprehensive legislation to replace the IT Act 2000. Aims to address modern cyber threats, AI regulation, intermediary liability, data governance, and the digital economy.',
  ARRAY[
    'Proposed regulation of artificial intelligence and emerging technologies',
    'Revised intermediary liability framework with risk-based classification',
    'Enhanced provisions for cybercrime including deepfakes and synthetic media',
    'Digital governance principles for e-government services',
    'Cross-border data flow regulations aligned with DPDP Act 2023',
    'Proposed National Data Governance Framework Policy'
  ],
  'To be determined upon enactment.',
  'MeitY (proposed — not yet enacted)',
  'https://www.meity.gov.in/'
),
(
  'IT (Indian Computer Emergency Response Team) Rules, 2013',
  'rule',
  2013,
  'Ministry of Electronics and Information Technology (MeitY)',
  'Rules establishing CERT-In as the national nodal agency for cyber incident response. Defines mandatory reporting of cyber incidents and sets requirements for service providers, intermediaries, and organizations.',
  ARRAY[
    'Mandatory reporting of cyber incidents within 6 hours of detection',
    'Service providers, intermediaries, and data centers must maintain logs for 180 days',
    'CERT-In can call for information and issue directions for cyber incident response',
    'Organizations must appoint a point of contact for coordination with CERT-In',
    'Syncing ICT system clocks with NPL/NTP servers of NIC or CERT-In',
    'Know Your Customer (KYC) requirements for VPN and data center providers'
  ],
  'Non-compliance: penalties under IT Act Section 70B(7) — imprisonment up to 1 year and/or fine up to Rs 1 lakh.',
  'CERT-In (cert-in.org.in)',
  'https://www.cert-in.org.in/'
);
