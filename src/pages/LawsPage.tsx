import { useState, useEffect } from 'react';
import { Scale, ExternalLink, Gavel, FileText, Shield, AlertTriangle, Building2, Calendar, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { fetchCyberLaws } from '@/data/laws';
import type { CyberLaw, LawCategory } from '@/types';

const categoryConfig: Record<LawCategory, { label: string; icon: typeof Scale; color: string; border: string }> = {
  act: { label: 'Act', icon: Gavel, color: 'text-neon-cyan', border: 'border-neon-cyan/30' },
  amendment: { label: 'Amendment', icon: FileText, color: 'text-neon-blue', border: 'border-neon-blue/30' },
  rule: { label: 'Rule', icon: FileText, color: 'text-neon-amber', border: 'border-neon-amber/30' },
  policy: { label: 'Policy', icon: Shield, color: 'text-neon-green', border: 'border-neon-green/30' },
  guideline: { label: 'Guideline', icon: AlertTriangle, color: 'text-neon-purple', border: 'border-neon-purple/30' },
};

export default function LawsPage() {
  const { t } = useLanguage();
  const [laws, setLaws] = useState<CyberLaw[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCyberLaws().then((data) => {
      setLaws(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'all', label: t.laws.all },
    { id: 'act', label: t.laws.acts },
    { id: 'amendment', label: t.laws.amendments },
    { id: 'rule', label: t.laws.rules },
    { id: 'policy', label: t.laws.policies },
    { id: 'guideline', label: t.laws.guidelines },
  ];

  const filtered = laws.filter((law) => {
    const matchesFilter = filter === 'all' || law.category === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      law.law_name.toLowerCase().includes(q) ||
      law.description.toLowerCase().includes(q) ||
      (law.ministry ?? '').toLowerCase().includes(q) ||
      law.key_provisions.some((p) => p.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-4">
          <Scale className="w-4 h-4" />
          <span>{t.laws.badge}</span>
        </div>
        <h1 className="section-title mb-3">{t.laws.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.laws.subtitle}</span>
          <AudioReadout text={t.laws.subtitle} />
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.laws.searchPlaceholder}
            className="input-base pl-12"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === cat.id
                ? 'bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan glow-border'
                : 'bg-cyber-card border border-cyber-border text-gray-400 hover:text-white hover:border-cyber-muted'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading laws and policies...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <Scale className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">{t.laws.noResults}</p>
        </div>
      )}

      {/* Law Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filtered.map((law) => {
          const cfg = categoryConfig[law.category];
          const Icon = cfg.icon;
          const isOpen = expanded === law.id;
          return (
            <div
              key={law.id}
              className={`card-base p-6 transition-all duration-300 hover:border-neon-cyan/30 hover:glow-card ${
                isOpen ? 'border-neon-cyan/30 glow-card' : ''
              }`}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg border ${cfg.border}`}>
                    <Icon className={`w-6 h-6 ${cfg.color}`} />
                  </div>
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.border} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    {law.year && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {law.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">{law.law_name}</h3>

              {/* Ministry */}
              {law.ministry && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{law.ministry}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{law.description}</p>

              {/* Expand/Collapse */}
              <button
                onClick={() => setExpanded(isOpen ? null : law.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:text-white transition-colors mb-3"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>{t.laws.showLess}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>{t.laws.showMore}</span>
                  </>
                )}
              </button>

              {/* Expanded Details */}
              {isOpen && (
                <div className="animate-fade-in space-y-4 pt-2 border-t border-cyber-border">
                  {/* Key Provisions */}
                  <div>
                    <h4 className="text-sm font-bold text-neon-cyan mb-2 flex items-center gap-1.5">
                      <Gavel className="w-4 h-4" />
                      {t.laws.keyProvisions}
                    </h4>
                    <ul className="space-y-1.5">
                      {law.key_provisions.map((prov, i) => (
                        <li key={i} className="text-sm text-gray-300 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-neon-cyan/50">
                          {prov}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Penalties */}
                  {law.penalties && (
                    <div>
                      <h4 className="text-sm font-bold text-neon-amber mb-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        {t.laws.penalties}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed pl-5">{law.penalties}</p>
                    </div>
                  )}

                  {/* Reporting Authority */}
                  {law.reporting_authority && (
                    <div>
                      <h4 className="text-sm font-bold text-neon-green mb-1.5 flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        {t.laws.reportingAuthority}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed pl-5">{law.reporting_authority}</p>
                    </div>
                  )}

                  {/* Official Link */}
                  {law.official_url && (
                    <a
                      href={law.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{t.laws.viewOfficial}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      {!loading && filtered.length > 0 && (
        <div className="mt-12 p-6 rounded-2xl bg-cyber-card border border-cyber-border text-center">
          <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t.laws.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
