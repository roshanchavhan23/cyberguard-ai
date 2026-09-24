import { Phone, AlertTriangle, ExternalLink, LogOut } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EmergencyHeader() {
  const { t } = useLanguage();

  const quickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="relative z-50">
      {/* Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-900 border-b border-red-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-blink" />
            <p className="text-sm font-semibold text-amber-100 text-center sm:text-left">
              {t.helpline.banner}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:1930"
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
            >
              <Phone className="w-4 h-4" />
              <span>1930</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600/80 hover:bg-amber-500 text-white text-sm font-medium transition-all duration-200"
            >
              <span>{t.helpline.portal}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Exit / SOS Bar */}
      <div className="bg-cyber-bg/80 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-end">
          <button
            onClick={quickExit}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.helpline.quickExit}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
