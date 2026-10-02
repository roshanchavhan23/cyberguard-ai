import {
  ScanLine,
  Bot,
  FileText,
  MessageSquare,
  ClipboardList,
  Video,
  Users,
  Shield,
  Phone,
  ArrowRight,
  Brain,
  Lock,
  Zap,
  Globe,
  Scale,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import type { PageId } from '@/types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  const dbStats = usePlatformStats();

  const features = [
    {
      icon: ScanLine,
      title: t.nav.detector,
      desc: 'AI-powered analysis of suspicious messages with instant risk assessment and evidence generation.',
      page: 'detector' as PageId,
      color: 'text-neon-cyan',
    },
    {
      icon: FileText,
      title: t.nav.guidelines,
      desc: 'Official government PDFs, handbooks, and brochures for cyber safety awareness.',
      page: 'guidelines' as PageId,
      color: 'text-neon-blue',
    },
    {
      icon: MessageSquare,
      title: t.nav.guider,
      desc: '24/7 empathetic AI companion guiding victims through every step of recovery.',
      page: 'guider' as PageId,
      color: 'text-neon-green',
    },
    {
      icon: ClipboardList,
      title: t.nav.formguide,
      desc: 'Visual step-by-step wizard for filing complaints on cybercrime.gov.in.',
      page: 'formguide' as PageId,
      color: 'text-neon-amber',
    },
    {
      icon: Video,
      title: t.nav.videos,
      desc: 'Verified awareness tutorials and expert cyber safety video guides.',
      page: 'videos' as PageId,
      color: 'text-neon-purple',
    },
    {
      icon: Users,
      title: t.nav.stories,
      desc: 'Real stories from survivors who overcame cyber threats with the right help.',
      page: 'stories' as PageId,
      color: 'text-neon-red',
    },
    {
      icon: Scale,
      title: t.nav.laws,
      desc: 'Government of India cyber laws, rules, policies, and regulations for digital safety.',
      page: 'laws' as PageId,
      color: 'text-neon-cyan',
    },
  ];

  const stats = [
    {
      value: dbStats ? (dbStats.chatSessions > 0 ? `${dbStats.chatSessions.toLocaleString()}+` : '0') : '...',
      label: t.home.statVictims,
      icon: Users,
    },
    {
      value: dbStats ? (dbStats.threatsDetected > 0 ? `${dbStats.threatsDetected.toLocaleString()}+` : '0') : '...',
      label: t.home.statThreats,
      icon: ScanLine,
    },
    { value: '9', label: t.home.statGuides, icon: FileText },
    { value: '3', label: t.home.statLanguages, icon: Globe },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background grid + glow */}
        <div className="absolute inset-0 bg-cyber-grid bg-grid-32 opacity-30"></div>
        <div className="absolute inset-0 bg-radial-glow"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-6 animate-fade-in">
            <Brain className="w-4 h-4" />
            <span>{t.home.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto mb-6">
            {t.home.headline.split('. ').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 ? '. ' : ''}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.home.subheading}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('detector')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold transition-all duration-300 hover:bg-neon-cyan/20 hover:glow-border hover:scale-105"
            >
              <ScanLine className="w-5 h-5" />
              <span>{t.home.scanBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('guider')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyber-card border border-cyber-border text-cyber-text font-semibold transition-all duration-300 hover:border-neon-green/50 hover:text-neon-green hover:scale-105"
            >
              <Bot className="w-5 h-5" />
              <span>{t.home.guiderBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Shield Visual */}
          <div className="relative inline-block mb-4">
            <div className="relative">
              <Shield
                className="w-24 h-24 text-neon-cyan mx-auto animate-float"
                fill="rgba(34,211,238,0.08)"
                strokeWidth={1}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-neon-cyan/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative border-y border-cyber-border bg-cyber-surface/30">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 mb-3">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white glow-text">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">{t.home.featuresTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.home.featuresSubtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <button
                key={i}
                onClick={() => onNavigate(feature.page)}
                className="group card-base p-6 text-left hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg border border-cyber-border mb-4 ${feature.color} group-hover:border-current/30 transition-all`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{feature.desc}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/40 via-cyber-card to-amber-950/30 border border-red-700/30 p-8 md:p-12 text-center glow-card-red">
          <div className="absolute inset-0 bg-cyber-grid bg-grid-32 opacity-20"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Immediate Help Available</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t.home.ctaTitle}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">{t.home.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:1930"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                <Phone className="w-5 h-5" />
                <span>{t.home.ctaCall}</span>
              </a>
              <button
                onClick={() => onNavigate('guider')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-card border border-cyber-border text-cyber-text font-semibold transition-all duration-300 hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <Bot className="w-5 h-5" />
                <span>{t.home.ctaChat}</span>
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
              <AudioReadout text={`${t.home.ctaTitle}. ${t.home.ctaSubtitle}`} />
              <span>Read this section aloud</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
