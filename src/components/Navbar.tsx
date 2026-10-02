import { useState } from 'react';
import { Shield, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language, PageId } from '@/types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'detector', label: t.nav.detector },
    { id: 'harassment', label: t.nav.harassment },
    { id: 'guider', label: t.nav.guider },
    { id: 'helplines', label: t.nav.helplines },
    { id: 'portals', label: t.nav.portals },
    { id: 'laws', label: t.nav.laws },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'hi', label: 'हिन्दी', flag: 'HI' },
    { code: 'mr', label: 'मराठी', flag: 'MR' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 glass border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <Shield className="w-8 h-8 text-neon-cyan animate-pulse-glow" fill="rgba(34,211,238,0.15)" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white glow-text tracking-tight">
                CyberGuard
              </span>
              <span className="text-[10px] font-semibold text-neon-cyan tracking-widest">
                AI PLATFORM
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-neon-cyan bg-neon-cyan/10 glow-border'
                    : 'text-gray-400 hover:text-white hover:bg-cyber-card'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-cyber-card transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-neon-cyan" />
                <span className="hidden sm:inline">{languages.find((l) => l.code === lang)?.flag}</span>
              </button>
              {langOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-36 rounded-lg bg-cyber-card border border-cyber-border shadow-xl z-50 animate-fade-in overflow-hidden">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-150 ${
                          lang === l.code
                            ? 'text-neon-cyan bg-neon-cyan/10'
                            : 'text-gray-300 hover:text-white hover:bg-cyber-surface'
                        }`}
                      >
                        <span className="mr-2 text-xs font-bold opacity-60">{l.flag}</span>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-cyber-card transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-gray-400 hover:text-white hover:bg-cyber-card'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
