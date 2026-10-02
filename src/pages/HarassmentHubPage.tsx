import { useState, useMemo, useEffect } from 'react';
import {
  ShieldAlert,
  MessageSquareWarning,
  Eye,
  Fingerprint,
  ImageOff,
  MessageCircleWarning,
  Ban,
  Brain,
  FileWarning,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  BookOpen,
  Scale,
  Heart,
  Phone,
  CheckCircle2,
  X,
  Lightbulb,
} from 'lucide-react';
import { harassmentTypes } from '@/data/harassment';
import type { HarassmentType, HarassmentTypeId } from '@/data/harassment';

// Map icon string names to lucide icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert,
  MessageSquareWarning,
  Eye,
  Fingerprint,
  ImageOff,
  MessageCircleWarning,
  Ban,
  Brain,
  FileWarning,
};

const getIcon = (name: string) => iconMap[name] ?? ShieldAlert;

// Tailwind color classes mapped to border/background accents for stat groupings
const colorAccent: Record<string, { border: string; bg: string; ring: string }> = {
  'text-neon-red': {
    border: 'border-neon-red/30',
    bg: 'bg-neon-red/10',
    ring: 'group-hover:border-neon-red/50',
  },
  'text-neon-amber': {
    border: 'border-neon-amber/30',
    bg: 'bg-neon-amber/10',
    ring: 'group-hover:border-neon-amber/50',
  },
  'text-neon-purple': {
    border: 'border-neon-purple/30',
    bg: 'bg-neon-purple/10',
    ring: 'group-hover:border-neon-purple/50',
  },
  'text-neon-cyan': {
    border: 'border-neon-cyan/30',
    bg: 'bg-neon-cyan/10',
    ring: 'group-hover:border-neon-cyan/50',
  },
};

const getAccent = (color: string) =>
  colorAccent[color] ?? colorAccent['text-neon-cyan'];

// Reusable section header inside the modal
function ModalSectionHeader({
  icon: Icon,
  title,
  color = 'text-neon-cyan',
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-cyber-bg border border-cyber-border ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
    </div>
  );
}

export default function HarassmentHubPage() {
  const [selected, setSelected] = useState<HarassmentType | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    warning: true,
    actions: true,
    legal: true,
    mental: true,
    prevention: true,
  });

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Aggregate stats across all harassment types
  const stats = useMemo(() => {
    const warningSigns = harassmentTypes.reduce(
      (n, t) => n + t.warningSigns.length,
      0,
    );
    const immediateActions = harassmentTypes.reduce(
      (n, t) => n + t.immediateActions.length,
      0,
    );
    const legalProvisions = harassmentTypes.reduce(
      (n, t) => n + t.legalProvisions.length,
      0,
    );
    const resources = harassmentTypes.reduce(
      (n, t) => n + t.mentalHealthGuide.resources.length,
      0,
    );
    const preventionTips = harassmentTypes.reduce(
      (n, t) => n + t.prevention.length,
      0,
    );
    return {
      types: harassmentTypes.length,
      warningSigns,
      immediateActions,
      legalProvisions,
      resources,
      preventionTips,
    };
  }, []);

  const statCards = [
    {
      label: 'Harassment Types',
      value: stats.types,
      icon: ShieldAlert,
      color: 'text-neon-cyan',
      accent: getAccent('text-neon-cyan'),
    },
    {
      label: 'Warning Signs',
      value: stats.warningSigns,
      icon: AlertTriangle,
      color: 'text-neon-amber',
      accent: getAccent('text-neon-amber'),
    },
    {
      label: 'Immediate Actions',
      value: stats.immediateActions,
      icon: CheckCircle2,
      color: 'text-neon-green',
      accent: getAccent('text-neon-cyan'),
    },
    {
      label: 'Legal Provisions',
      value: stats.legalProvisions,
      icon: Scale,
      color: 'text-neon-purple',
      accent: getAccent('text-neon-purple'),
    },
    {
      label: 'Support Resources',
      value: stats.resources,
      icon: Phone,
      color: 'text-neon-red',
      accent: getAccent('text-neon-red'),
    },
    {
      label: 'Prevention Tips',
      value: stats.preventionTips,
      icon: Lightbulb,
      color: 'text-neon-cyan',
      accent: getAccent('text-neon-cyan'),
    },
  ];

  const toggleSection = (key: string) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeModal = () => setSelected(null);

  return (
    <div className="animate-fade-in min-h-screen bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm font-medium mb-5">
            <ShieldAlert className="w-4 h-4" />
            <span>Safety &amp; Support Hub</span>
          </div>
          <h1 className="section-title mb-4 max-w-3xl mx-auto leading-tight">
            Comprehensive Harassment &amp; Safety Guide Hub
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Recognize the signs, take immediate action, and access legal,
            mental-health, and prevention resources for nine forms of online
            harassment. You are not alone — help is available 24/7.
          </p>
          <div className="neon-divider w-32 mx-auto mt-6" />
        </div>

        {/* Category Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`card-base p-5 flex flex-col items-center text-center hover:${s.accent.border} hover:-translate-y-1 transition-all duration-300 ${s.accent.bg} ${s.accent.border}`}
              >
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-cyber-bg border border-cyber-border mb-3 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-extrabold ${s.color} leading-none`}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 mt-2 leading-tight">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Harassment Types Grid */}
        <div className="mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-neon-cyan" />
          <h2 className="text-2xl font-bold text-white">Types of Online Harassment</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {harassmentTypes.map((type) => {
            const Icon = getIcon(type.icon);
            const accent = getAccent(type.color);
            return (
              <div
                key={type.id}
                className={`group card-base p-6 flex flex-col hover:glow-card hover:-translate-y-1 transition-all duration-300 ${accent.ring}`}
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg border ${accent.border} ${type.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {type.name}
                  </h3>
                </div>

                {/* Short description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                  {type.shortDesc}
                </p>

                {/* Quick stats row */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-cyber-bg border border-cyber-border text-gray-400">
                    {type.warningSigns.length} warning signs
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-cyber-bg border border-cyber-border text-gray-400">
                    {type.legalProvisions.length} legal provisions
                  </span>
                </div>

                {/* Learn More button */}
                <button
                  onClick={() => setSelected(type)}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${accent.bg} border ${accent.border} ${type.color} hover:brightness-125`}
                >
                  <span>Learn More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Empathetic footer note */}
        <div className="mt-14 card-base p-6 text-center border-neon-cyan/20">
          <div className="flex items-center justify-center gap-2 mb-2 text-neon-cyan">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">You are not alone</span>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            If you or someone you know is in immediate danger, call{' '}
            <span className="text-neon-cyan font-semibold">112</span>. For
            cybercrime reporting, call{' '}
            <span className="text-neon-cyan font-semibold">1930</span> or visit{' '}
            <span className="text-neon-cyan font-semibold">cybercrime.gov.in</span>.
            For mental health crises, call AASRA at{' '}
            <span className="text-neon-cyan font-semibold">9820466726</span>.
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <HarassmentDetailModal
          type={selected}
          expanded={expandedSections}
          onToggle={toggleSection}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

/* ----------------------------- Detail Modal ----------------------------- */

function HarassmentDetailModal({
  type,
  expanded,
  onToggle,
  onClose,
}: {
  type: HarassmentType;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onClose: () => void;
}) {
  const Icon = getIcon(type.icon);
  const accent = getAccent(type.color);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-cyber-card border border-cyber-border rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`flex items-start justify-between px-6 py-5 border-b border-cyber-border ${accent.bg}`}>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg border ${accent.border} ${type.color}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${type.color}`}>{type.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{type.shortDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-bg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Description */}
          <section>
            <ModalSectionHeader
              icon={BookOpen}
              title="Overview"
              color={type.color}
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              {type.description}
            </p>
          </section>

          {/* Warning Signs */}
          <CollapsibleSection
            title="Warning Signs"
            icon={AlertTriangle}
            color="text-neon-amber"
            isOpen={expanded.warning}
            onToggle={() => onToggle('warning')}
          >
            <ul className="space-y-2">
              {type.warningSigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <AlertTriangle className="w-4 h-4 text-neon-amber mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Immediate Actions — numbered */}
          <CollapsibleSection
            title="Immediate Actions"
            icon={CheckCircle2}
            color="text-neon-green"
            isOpen={expanded.actions}
            onToggle={() => onToggle('actions')}
          >
            <ol className="space-y-2.5">
              {type.immediateActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="flex items-center justify-center w-6 h-6 flex-shrink-0 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{action}</span>
                </li>
              ))}
            </ol>
          </CollapsibleSection>

          {/* Legal Provisions */}
          <CollapsibleSection
            title="Legal Provisions"
            icon={Scale}
            color="text-neon-purple"
            isOpen={expanded.legal}
            onToggle={() => onToggle('legal')}
          >
            <ul className="space-y-2">
              {type.legalProvisions.map((law, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Scale className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{law}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Mental Health Guide */}
          <CollapsibleSection
            title="Mental Health Guide"
            icon={Heart}
            color="text-neon-red"
            isOpen={expanded.mental}
            onToggle={() => onToggle('mental')}
          >
            <div className="space-y-5">
              {/* Impact */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-neon-red" />
                  <h4 className="text-sm font-semibold text-white">Psychological Impact</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed pl-6">
                  {type.mentalHealthGuide.impact}
                </p>
              </div>

              {/* Coping Strategies */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                  <h4 className="text-sm font-semibold text-white">Coping Strategies</h4>
                </div>
                <ul className="pl-6 space-y-2">
                  {type.mentalHealthGuide.copingStrategies.map((strat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to Seek Help */}
              <div className="rounded-lg bg-neon-red/5 border border-neon-red/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-neon-red" />
                  <h4 className="text-sm font-semibold text-neon-red">When to Seek Professional Help</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {type.mentalHealthGuide.whenToSeekHelp}
                </p>
              </div>

              {/* Resources */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-neon-green" />
                  <h4 className="text-sm font-semibold text-white">Helpline Resources</h4>
                </div>
                <ul className="pl-6 space-y-2">
                  {type.mentalHealthGuide.resources.map((res, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Phone className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* Prevention Tips */}
          <CollapsibleSection
            title="Prevention Tips"
            icon={Lightbulb}
            color="text-neon-cyan"
            isOpen={expanded.prevention}
            onToggle={() => onToggle('prevention')}
          >
            <ul className="space-y-2">
              {type.prevention.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Lightbulb className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* bottom padding */}
          <div className="h-2" />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-cyber-border bg-cyber-bg/50">
          <p className="text-xs text-gray-500">
            In immediate danger? Call <span className="text-neon-red font-semibold">112</span>.
          </p>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-card border border-cyber-border text-gray-300 hover:text-white hover:border-neon-cyan/40 transition-all text-sm"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Collapsible Section ------------------------- */

function CollapsibleSection({
  title,
  icon: Icon,
  color,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="card-base overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-cyber-bg/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-bg border border-cyber-border ${color}`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <h3 className={`text-base font-bold ${color}`}>{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 animate-fade-in">{children}</div>
      )}
    </section>
  );
}
