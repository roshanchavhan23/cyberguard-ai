import { useState, useEffect } from 'react';
import {
  ScanLine,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  AlertCircle,
  FileText,
  Copy,
  Download,
  CheckCircle,
  Loader2,
  Tag,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { analyzeContent, sampleTexts } from '@/data/detector';
import { guidelines } from '@/data/guidelines';
import { saveScanHistory } from '@/lib/supabase';
import type { DetectionResult, RiskLevel, ThreatCategory } from '@/types';

export default function DetectorPage() {
  const { t, lang } = useLanguage();
  const [text, setText] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Persist each completed analysis to the database
  useEffect(() => {
    if (!result) return;
    saveScanHistory({
      inputText: text,
      riskLevel: result.risk,
      category: result.category,
      toxicityScore: result.toxicityScore,
      matchedKeywords: result.matchedKeywords,
      harassmentTypes: result.harassmentTypes,
      language: lang,
    });
  // Only fire when result changes, not on every text/lang change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeContent(text));
      setAnalyzing(false);
    }, 1200);
  };

  const handleSample = (key: string) => {
    setText(sampleTexts[key] || '');
    setResult(null);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberguard-evidence-summary-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const riskConfig: Record<RiskLevel, { color: string; bg: string; border: string; icon: typeof ShieldCheck; glow: string }> = {
    safe: { color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30', icon: ShieldCheck, glow: 'glow-card-green' },
    caution: { color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/30', icon: AlertCircle, glow: 'glow-card-amber' },
    high: { color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/30', icon: AlertTriangle, glow: 'glow-card-red' },
  };

  const categoryLabel: Record<ThreatCategory, string> = {
    cyberbullying: t.detector.cat_cyberbullying,
    financial_fraud: t.detector.cat_financial_fraud,
    threat_blackmail: t.detector.cat_threat_blackmail,
    identity_abuse: t.detector.cat_identity_abuse,
    safe: t.detector.cat_safe,
  };

  const samples = [
    { key: 'blackmail', label: t.detector.sampleBlackmail },
    { key: 'fraud', label: t.detector.sampleFraud },
    { key: 'bullying', label: t.detector.sampleBullying },
    { key: 'identity', label: t.detector.sampleIdentity },
  ];

  const matchedGuidelineDocs = result
    ? guidelines.filter((g) => result.guidelines.includes(g.id))
    : [];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-4">
          <ScanLine className="w-4 h-4" />
          <span>AI-Powered NLP Analysis</span>
        </div>
        <h1 className="section-title mb-3">{t.detector.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.detector.subtitle}</span>
          <AudioReadout text={t.detector.subtitle} />
        </p>
      </div>

      {/* Input Section */}
      <div className="card-base p-6 mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.detector.placeholder}
          rows={6}
          className="input-base resize-none font-mono text-sm"
        />

        {/* Sample Buttons */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.detector.samples}</p>
          <div className="flex flex-wrap gap-2">
            {samples.map((sample) => (
              <button
                key={sample.key}
                onClick={() => handleSample(sample.key)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyber-bg border border-cyber-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || analyzing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold transition-all duration-200 hover:bg-neon-cyan/20 hover:glow-border disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanLine className="w-4 h-4" />}
            <span>{analyzing ? t.detector.analyzing : t.detector.analyze}</span>
          </button>
          <button
            onClick={() => {
              setText('');
              setResult(null);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-bg border border-cyber-border text-gray-400 font-medium transition-all duration-200 hover:text-red-400 hover:border-red-500/30"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.detector.clear}</span>
          </button>
        </div>
      </div>

      {/* Analyzing Animation */}
      {analyzing && (
        <div className="card-base p-8 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan"></div>
          </div>
          <Loader2 className="w-10 h-10 text-neon-cyan animate-spin mx-auto mb-3" />
          <p className="text-gray-400">{t.detector.analyzing}</p>
        </div>
      )}

      {/* Results */}
      {result && !analyzing && (
        <div className="space-y-6 animate-slide-up">
          {/* Risk Level Card */}
          {(() => {
            const cfg = riskConfig[result.risk];
            const RiskIcon = cfg.icon;
            return (
              <div className={`card-base p-6 ${cfg.glow} border-2 ${cfg.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{t.detector.riskLevel}</h3>
                  <AudioReadout text={`${t.detector.riskLevel}: ${result.risk === 'safe' ? t.detector.safe : result.risk === 'caution' ? t.detector.caution : t.detector.high}`} />
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${cfg.bg} ${cfg.border} border`}>
                    <RiskIcon className={`w-7 h-7 ${cfg.color}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${cfg.color}`}>
                      {result.risk === 'safe' ? t.detector.safe : result.risk === 'caution' ? t.detector.caution : t.detector.high}
                    </p>
                    <p className="text-sm text-gray-400">{categoryLabel[result.category]}</p>
                  </div>
                </div>

                {/* Toxicity Meter */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-400">{t.detector.toxicity}</span>
                    <span className={`text-sm font-bold ${cfg.color}`}>{result.toxicityScore}/100</span>
                  </div>
                  <div className="h-3 rounded-full bg-cyber-bg overflow-hidden border border-cyber-border">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.risk === 'safe'
                          ? 'bg-gradient-to-r from-neon-green to-neon-green/60'
                          : result.risk === 'caution'
                          ? 'bg-gradient-to-r from-neon-amber to-neon-amber/60'
                          : 'bg-gradient-to-r from-neon-red to-neon-red/60'
                      }`}
                      style={{ width: `${result.toxicityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Matched Keywords */}
          {result.matchedKeywords.length > 0 && (
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {t.detector.matchedKeywords}
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm bg-cyber-bg border border-neon-red/20 text-neon-red/80 font-mono"
                  >
                    "{kw}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Matched Guidelines */}
          {matchedGuidelineDocs.length > 0 && (
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t.detector.matchedGuidelines}
              </h3>
              <div className="space-y-2">
                {matchedGuidelineDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-cyber-bg border border-cyber-border hover:border-neon-cyan/30 transition-all"
                  >
                    <FileText className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{doc.title}</p>
                      <p className="text-xs text-gray-500">{doc.pages} {t.guidelines.pages}</p>
                    </div>
                    <a
                      href={`/guidelines/${doc.fileName}`}
                      download
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all"
                    >
                      {t.guidelines.download}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Summary */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t.detector.generateSummary}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-cyber-bg border border-cyber-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-neon-green" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : t.detector.copySummary}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.detector.downloadSummary}</span>
                </button>
              </div>
            </div>
            <pre className="bg-cyber-bg border border-cyber-border rounded-lg p-4 text-xs font-mono text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap">
              {result.summary}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
