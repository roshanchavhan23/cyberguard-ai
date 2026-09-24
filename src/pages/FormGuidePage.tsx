import { useState } from 'react';
import {
  ClipboardList,
  Globe,
  User,
  FileText,
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  Camera,
  Link as LinkIcon,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';

export default function FormGuidePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Globe,
      title: 'Visit the Portal',
      description: 'Go to https://cybercrime.gov.in — the official National Cyber Crime Reporting Portal.',
      details: [
        'Open your browser and type cybercrime.gov.in',
        'Click on "File a Complaint" on the homepage',
        'Choose the appropriate category: Financial Fraud, Women/Child Related, or Other Cybercrime',
      ],
      tip: 'Bookmark the portal for future reference. Only use the official .gov.in website.',
    },
    {
      icon: User,
      title: 'Register / Login',
      description: 'Create an account or log in with your mobile number and OTP verification.',
      details: [
        'Enter your mobile number',
        'Verify with the OTP sent to your phone',
        'Fill in your name, email, and state',
        'Create a password for your account',
      ],
      tip: 'Use a mobile number you have regular access to — complaint updates come via SMS.',
    },
    {
      icon: ClipboardList,
      title: 'Select Category & Subcategory',
      description: 'Choose the type of cybercrime that best matches your situation.',
      details: [
        'Financial Cyber Fraud — UPI fraud, fake links, lottery scams',
        'Social Media / Cyber Bullying — harassment, fake profiles, abuse',
        'Online / Social Media Crime — impersonation, hacking',
        'Other Cybercrime — ransomware, data theft, etc.',
      ],
      tip: 'Not sure which category? Use our AI Detector to analyze the content and get a classification.',
    },
    {
      icon: FileText,
      title: 'Fill Incident Details',
      description: 'Describe what happened with dates, times, and full context.',
      details: [
        'Write a clear description of the incident',
        'Include the date and time of the incident',
        'Provide the accused\'s details if known (number, name, profile)',
        'Mention the financial loss amount if applicable',
        'Enter the platform where it happened (WhatsApp, Instagram, etc.)',
      ],
      tip: 'Use our AI Detector\'s "Generate Evidence Summary" feature to create a structured description.',
    },
    {
      icon: Upload,
      title: 'Upload Evidence',
      description: 'Attach screenshots, URLs, and transaction records as proof.',
      details: [
        'Screenshots of chats, messages, or threats',
        'URL of the fraudulent link or fake profile',
        'Transaction ID and bank statement (for financial fraud)',
        'Photos or videos if applicable',
        'Any other relevant digital evidence',
      ],
      tip: 'Take screenshots with timestamps visible. Do NOT edit or crop the evidence.',
    },
    {
      icon: CheckCircle2,
      title: 'Submit & Track',
      description: 'Review your complaint, submit it, and note your complaint number.',
      details: [
        'Review all entered information carefully',
        'Click "Submit" to file your complaint',
        'Note down your Complaint ID / Acknowledgment Number',
        'You will receive SMS and email confirmation',
        'Track status on the portal using your Complaint ID',
      ],
      tip: 'For urgent financial fraud, also call 1930 immediately after filing — they can help freeze the fraudster\'s account.',
    },
  ];

  const evidenceChecklist = [
    { icon: Camera, label: 'Screenshots of messages/threats', desc: 'Capture with date and time visible' },
    { icon: LinkIcon, label: 'URLs of fraudulent links', desc: 'Copy the exact link from the message' },
    { icon: CreditCard, label: 'Transaction IDs (if financial)', desc: 'From your bank app or statement' },
    { icon: User, label: 'Accused details', desc: 'Phone number, name, or profile link' },
    { icon: FileText, label: 'Bank statements', desc: 'Showing the fraudulent transaction' },
    { icon: Globe, label: 'Platform information', desc: 'Where the incident occurred' },
  ];

  const currentStep = steps[step];
  const StepIcon = currentStep.icon;

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-neon-amber text-sm font-medium mb-4">
          <ClipboardList className="w-4 h-4" />
          <span>Interactive Wizard</span>
        </div>
        <h1 className="section-title mb-3">{t.formguide.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.formguide.subtitle}</span>
          <AudioReadout text={t.formguide.subtitle} />
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    i < step
                      ? 'bg-neon-green/20 border-neon-green text-neon-green'
                      : i === step
                      ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan animate-pulse-glow'
                      : 'bg-cyber-card border-cyber-border text-gray-600'
                  }`}
                >
                  {i < step ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-12 h-0.5 mx-1 rounded ${
                      i < step ? 'bg-neon-green/40' : 'bg-cyber-border'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-gray-400">
          {t.formguide.step} {step + 1} {t.formguide.of} {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <div className="card-base p-6 md:p-8 mb-6 animate-fade-in">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
            <StepIcon className="w-7 h-7 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{currentStep.title}</h2>
            <p className="text-gray-400">{currentStep.description}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          {currentStep.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-xs font-bold text-neon-cyan">
                {i + 1}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-neon-amber/5 border border-neon-amber/20">
          <CheckCircle2 className="w-5 h-5 text-neon-amber flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-neon-amber uppercase tracking-wide mb-1">Pro Tip</p>
            <p className="text-sm text-gray-300">{currentStep.tip}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-cyber-border">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.formguide.prev}</span>
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20 transition-all"
            >
              <span>{t.formguide.next}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-neon-green/10 border border-neon-green/50 text-neon-green hover:bg-neon-green/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.formguide.restart}</span>
            </button>
          )}
        </div>
      </div>

      {/* Evidence Checklist */}
      <div className="card-base p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-neon-green" />
          {t.formguide.evidenceTitle}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {evidenceChecklist.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-neon-cyan/20 transition-all">
                <Icon className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold hover:bg-neon-cyan/20 hover:glow-border transition-all"
        >
          <Globe className="w-5 h-5" />
          <span>{t.formguide.portalBtn}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
