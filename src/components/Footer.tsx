import { Shield, Phone, ExternalLink, Heart, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { PageId } from '@/types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'detector', label: t.nav.detector },
    { id: 'guidelines', label: t.nav.guidelines },
    { id: 'guider', label: t.nav.guider },
    { id: 'formguide', label: t.nav.formguide },
    { id: 'videos', label: t.nav.videos },
    { id: 'stories', label: t.nav.stories },
  ];

  return (
    <footer className="relative mt-20 border-t border-cyber-border bg-cyber-surface/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Credits Section - Highlighted */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-neon-cyan/10 via-cyber-card to-cyber-card border-2 border-neon-cyan/40 glow-card">
          <div className="text-center">
            <h3 className="text-xs font-bold tracking-widest text-neon-cyan uppercase mb-3">
              {t.footer.createdBy}
            </h3>
            <div className="inline-block px-8 py-4 rounded-xl bg-cyber-bg/60 border border-neon-cyan/30 animate-pulse-glow">
              <p className="text-2xl font-bold text-white glow-text">
                Roshan Balu Chavhan
              </p>
              <p className="text-sm font-semibold text-neon-cyan mt-1 tracking-wide">
                (2AI-47)
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6 text-left">
              {/* Team Members */}
              <div className="p-4 rounded-lg bg-cyber-bg/40 border border-cyber-border">
                <h4 className="text-sm font-bold text-neon-cyan mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {t.footer.teamMembers}
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  <li>Dhanashri Mahendra Hulhule <span className="text-gray-500">(2AI-07)</span></li>
                  <li>Saloni Rajesh Jaiswal <span className="text-gray-500">(2AI-18)</span></li>
                  <li>Prathamesh Nilesh Sable <span className="text-gray-500">(2AI-43)</span></li>
                  <li>Roshan Kishan Chavhan <span className="text-gray-500">(2AI-46)</span></li>
                </ul>
              </div>

              {/* Guide & Institution */}
              <div className="p-4 rounded-lg bg-cyber-bg/40 border border-cyber-border">
                <h4 className="text-sm font-bold text-neon-cyan mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {t.footer.guide}
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  Prof. Gopal S. Ade Sir
                  <span className="block text-xs text-gray-500 mt-0.5">
                    Dept. of AI &amp; Data Science
                  </span>
                </p>
                <h4 className="text-sm font-bold text-neon-cyan mb-2 flex items-center gap-2 mt-3">
                  <MapPin className="w-4 h-4" />
                  {t.footer.institution}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Janata Shikshan Prasarak Mandal's Babasaheb Naik College Of Engineering, Pusad, Yavatmal (MH) 445215
                  <span className="block text-gray-500 mt-1">(2026-2027)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-neon-cyan" fill="rgba(34,211,238,0.15)" />
              <span className="text-lg font-bold text-white">CyberGuard AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              An intelligent online harassment awareness, analysis, and protection platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t.footer.quickLinks}</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm text-gray-400 hover:text-neon-cyan transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t.footer.emergency}</h4>
            <div className="space-y-2">
              <a href="tel:1930" className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Cyber Helpline: 1930</span>
              </a>
              <a href="tel:112" className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Emergency: 112</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-cyber-border">
          <p className="text-xs text-gray-500 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-gray-400">Disclaimer:</strong> {t.footer.disclaimer}
          </p>
          <p className="text-xs text-gray-600 text-center mt-4">
            © 2026 CyberGuard AI — Built with <Heart className="w-3 h-3 inline text-red-500" /> for a safer digital India.
          </p>
        </div>
      </div>
    </footer>
  );
}
