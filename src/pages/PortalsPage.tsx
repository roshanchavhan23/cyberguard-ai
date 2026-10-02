import {
  Globe, Shield, Building2, Phone, ExternalLink, Twitter, MessageCircle,
  AlertTriangle, Lock, Mail, FileText, Landmark, Users,
} from 'lucide-react';

interface Portal {
  name: string;
  url: string;
  description: string;
  category: 'reporting' | 'awareness' | 'authority' | 'financial' | 'social';
  icon: typeof Globe;
  badge?: string;
}

const portals: Portal[] = [
  {
    name: 'National Cyber Crime Reporting Portal',
    url: 'https://cybercrime.gov.in',
    description: 'The official Government of India portal for filing cybercrime complaints online. Report financial fraud, women/child-related crimes, and other cyber offenses directly to law enforcement.',
    category: 'reporting',
    icon: Shield,
    badge: 'Primary Reporting',
  },
  {
    name: 'CyberDost — I4C Official Social Handles',
    url: 'https://www.youtube.com/c/CyberDostI4C',
    description: 'Official cyber safety awareness channel of the Indian Cybercrime Coordination Centre (I4C), Ministry of Home Affairs. Follow for weekly cyber safety guides, scam alerts, and awareness content.',
    category: 'awareness',
    icon: MessageCircle,
    badge: 'Official Awareness',
  },
  {
    name: 'CyberDost on X (Twitter)',
    url: 'https://x.com/Cyberdost',
    description: 'Follow @Cyberdost on X for daily cyber safety tips, scam alerts, and awareness updates from the Indian Cybercrime Coordination Centre (I4C). Over 600K followers.',
    category: 'social',
    icon: Twitter,
  },
  {
    name: 'I4C — Indian Cybercrime Coordination Centre',
    url: 'https://i4c.mha.gov.in',
    description: 'The central agency under the Ministry of Home Affairs coordinating all cybercrime prevention and response activities across India. Access awareness videos, resources, and official guidelines.',
    category: 'authority',
    icon: Building2,
  },
  {
    name: 'I4C Cyber Awareness Videos',
    url: 'https://i4c.mha.gov.in/cyber-awareness-videos.aspx',
    description: 'Download official cyber awareness videos from I4C in Hindi, English, and regional languages. Topics include greed-based scams, fear-based scams, carelessness-based scams, and more.',
    category: 'awareness',
    icon: FileText,
  },
  {
    name: 'CERT-In (Indian Computer Emergency Response Team)',
    url: 'https://www.cert-in.org.in',
    description: 'India\'s national nodal agency for responding to cybersecurity incidents. Report vulnerabilities, access advisories, and get guidance on securing your digital infrastructure.',
    category: 'authority',
    icon: Shield,
    badge: 'Technical Response',
  },
  {
    name: 'National Consumer Helpline (Financial Fraud)',
    url: 'https://consumerhelpline.gov.in',
    description: 'File complaints related to financial fraud, misleading advertisements, and consumer grievances. A government initiative under the Department of Consumer Affairs for protecting citizens from financial exploitation.',
    category: 'financial',
    icon: Phone,
  },
  {
    name: 'RBI — Fraud Prevention & Cyber Awareness',
    url: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    description: 'Reserve Bank of India\'s official resources on fraud prevention, digital banking security, and cyber awareness. Access guidelines on safe digital payments, UPI security, and reporting banking fraud.',
    category: 'financial',
    icon: Landmark,
  },
  {
    name: 'RBI Ombudsman Complaint Portal',
    url: 'https://cms.rbi.org.in',
    description: 'File complaints against banks and NBFCs for deficiency in services including unauthorised transactions, digital banking fraud, and failure to resolve grievance. Integrated Complaint Management System.',
    category: 'financial',
    icon: Building2,
  },
  {
    name: 'NCW — National Commission for Women',
    url: 'https://ncw.nic.in',
    description: 'File online complaints for cyber harassment, stalking, morphing, and other online crimes against women. The NCW provides legal support and takes up cases with law enforcement agencies.',
    category: 'reporting',
    icon: Users,
  },
  {
    name: 'NCPCR — Child Protection Portal',
    url: 'https://ncpcr.gov.in',
    description: 'National Commission for Protection of Child Rights. Report online child abuse, cyberbullying of minors, and child exploitation. Dedicated POCSO e-Box for reporting child sexual offenses.',
    category: 'reporting',
    icon: Shield,
  },
  {
    name: 'Ministry of Electronics & IT (MeitY)',
    url: 'https://www.meity.gov.in',
    description: 'Ministry of Electronics and Information Technology. Access IT Act provisions, data protection policies, digital India initiatives, and cybersecurity frameworks governing India\'s digital space.',
    category: 'authority',
    icon: Landmark,
  },
];

const categoryConfig: Record<Portal['category'], { label: string; color: string; border: string; bg: string }> = {
  reporting: { label: 'Reporting', color: 'text-neon-red', border: 'border-neon-red/30', bg: 'bg-neon-red/10' },
  awareness: { label: 'Awareness', color: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10' },
  authority: { label: 'Government Authority', color: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10' },
  financial: { label: 'Financial Protection', color: 'text-neon-amber', border: 'border-neon-amber/30', bg: 'bg-neon-amber/10' },
  social: { label: 'Social Media', color: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10' },
};

export default function PortalsPage() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-4">
          <Globe className="w-4 h-4" />
          <span>Verified Government Resources</span>
        </div>
        <h1 className="section-title mb-3">Official Cyber Security &amp; Reporting Portals</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Direct links to every official Indian government cyber security website, reporting portal, and awareness resource — all verified, all in one place.
        </p>
        <div className="neon-divider w-32 mx-auto mt-6" />
      </div>

      {/* Quick Access Banner */}
      <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-cyber-card to-cyber-card border border-red-700/30 glow-card-red">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/40 text-red-400 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Need to report a cybercrime right now?</h3>
              <p className="text-sm text-gray-400">Call 1930 or visit cybercrime.gov.in immediately</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:1930" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all hover:scale-105">
              <Phone className="w-4 h-4" />
              <span>Call 1930</span>
            </a>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyber-bg border border-neon-cyan/40 text-neon-cyan font-bold text-sm transition-all hover:glow-border">
              <ExternalLink className="w-4 h-4" />
              <span>cybercrime.gov.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Portals Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portals.map((portal) => {
          const Icon = portal.icon;
          const cfg = categoryConfig[portal.category];
          return (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-base p-5 flex flex-col hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-cyber-bg border ${cfg.border} ${cfg.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.bg} ${cfg.border} border ${cfg.color} whitespace-nowrap`}>
                  {cfg.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-neon-cyan transition-colors">
                {portal.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-3">
                {portal.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-cyber-border">
                <span className="text-xs text-gray-500 truncate max-w-[180px]">
                  {portal.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-neon-cyan group-hover:gap-2 transition-all">
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Badge */}
              {portal.badge && (
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${cfg.bg} ${cfg.border} border ${cfg.color}`}>
                  <Lock className="w-3 h-3" />
                  {portal.badge}
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-12 card-base p-5 text-center border-neon-cyan/20">
        <div className="flex items-center justify-center gap-2 mb-2 text-neon-cyan">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">All links are verified official government resources</span>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
          These portals are operated by the Government of India and its agencies. For any cyber emergency, call{' '}
          <span className="text-neon-red font-bold">1930</span> (24x7) or{' '}
          <span className="text-red-400 font-bold">112</span> for life-threatening situations.
        </p>
      </div>
    </div>
  );
}
