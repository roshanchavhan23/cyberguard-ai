import { useState } from 'react';
import { FileText, Download, Eye, X, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { guidelines } from '@/data/guidelines';
import { trackResourceView } from '@/lib/supabase';
import type { GuidelineDoc } from '@/types';

export default function GuidelinesPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<GuidelineDoc | null>(null);

  const handlePreview = (doc: GuidelineDoc) => {
    setPreviewDoc(doc);
    trackResourceView({ resourceType: 'guideline_preview', resourceId: doc.id, resourceTitle: doc.title, language: lang });
  };

  const handleDownload = (doc: GuidelineDoc) => {
    trackResourceView({ resourceType: 'guideline_download', resourceId: doc.id, resourceTitle: doc.title, language: lang });
  };

  const categories = [
    { id: 'all', label: t.guidelines.all },
    { id: 'general', label: t.guidelines.general },
    { id: 'financial', label: t.guidelines.financial },
    { id: 'social', label: t.guidelines.social },
    { id: 'victim', label: t.guidelines.victim },
  ];

  const filtered = filter === 'all' ? guidelines : guidelines.filter((g) => g.category === filter);

  const categoryColors: Record<string, string> = {
    general: 'text-neon-cyan border-neon-cyan/30',
    financial: 'text-neon-amber border-neon-amber/30',
    social: 'text-neon-purple border-neon-purple/30',
    victim: 'text-neon-red border-neon-red/30',
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Official Government Resources</span>
        </div>
        <h1 className="section-title mb-3">{t.guidelines.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.guidelines.subtitle}</span>
          <AudioReadout text={t.guidelines.subtitle} />
        </p>
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

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="card-base p-5 flex flex-col hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon + Category Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg border border-cyber-border">
                <FileText className="w-6 h-6 text-neon-cyan" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[doc.category]}`}>
                {categories.find((c) => c.id === doc.category)?.label}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="text-base font-bold text-white mb-2 leading-snug">{doc.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{doc.description}</p>

            {/* Pages + Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-cyber-border">
              <span className="text-xs text-gray-500">{doc.pages} {t.guidelines.pages}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePreview(doc)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-cyber-bg border border-cyber-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.guidelines.preview}</span>
                </button>
                <a
                  href={`/guidelines/${doc.fileName}`}
                  download
                  onClick={() => handleDownload(doc)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] bg-cyber-card border border-cyber-border rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h3 className="text-base font-bold text-white">{previewDoc.title}</h3>
                  <p className="text-xs text-gray-500">{previewDoc.pages} {t.guidelines.pages}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-bg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - PDF Embed */}
            <div className="flex-1 overflow-hidden bg-cyber-bg">
              <iframe
                src={`/guidelines/${previewDoc.fileName}`}
                className="w-full h-[60vh]"
                title={previewDoc.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-cyber-border">
              <p className="text-sm text-gray-400">{previewDoc.description}</p>
              <a
                href={`/guidelines/${previewDoc.fileName}`}
                download
                onClick={() => handleDownload(previewDoc)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-medium text-sm hover:bg-neon-cyan/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.guidelines.download}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
