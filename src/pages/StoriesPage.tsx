import { Users, Heart, Shield, Quote, MapPin, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { stories } from '@/data/stories';

export default function StoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm font-medium mb-4">
          <Heart className="w-4 h-4" />
          <span>You Are Not Alone</span>
        </div>
        <h1 className="section-title mb-3">{t.stories.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.stories.subtitle}</span>
          <AudioReadout text={t.stories.subtitle} />
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="card-base p-6 hover:border-neon-cyan/20 hover:glow-card transition-all duration-300"
          >
            {/* Person Info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/10 border border-neon-cyan/30 flex items-center justify-center">
                <User className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{story.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span>{story.age} years</span>
                  <span>•</span>
                  <MapPin className="w-3 h-3" />
                  <span>{story.city}</span>
                </p>
              </div>
            </div>

            {/* Quote Icon */}
            <div className="flex items-start gap-2 mb-4">
              <Quote className="w-5 h-5 text-neon-cyan/30 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300 leading-relaxed italic">
                {story.incident}
              </p>
            </div>

            {/* Incident */}
            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                <p className="text-xs font-semibold text-neon-amber uppercase tracking-wide mb-1">
                  {t.stories.incident}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{story.incident}</p>
              </div>

              <div className="p-3 rounded-lg bg-cyber-bg border border-cyber-border">
                <p className="text-xs font-semibold text-neon-cyan uppercase tracking-wide mb-1">
                  {t.stories.action}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{story.action}</p>
              </div>

              <div className="p-3 rounded-lg bg-neon-green/5 border border-neon-green/20">
                <p className="text-xs font-semibold text-neon-green uppercase tracking-wide mb-1">
                  {t.stories.outcome}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{story.outcome}</p>
              </div>
            </div>

            {/* Advice */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-neon-cyan/5 to-transparent border border-neon-cyan/20">
              <Heart className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neon-cyan uppercase tracking-wide mb-1">
                  {t.stories.advice}
                </p>
                <p className="text-sm text-gray-200 leading-relaxed">{story.advice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-cyber-card to-cyber-card border border-neon-cyan/20">
        <Shield className="w-10 h-10 text-neon-cyan mx-auto mb-4 animate-float" fill="rgba(34,211,238,0.1)" />
        <h3 className="text-xl font-bold text-white mb-2">Every Story Has a Safe Ending</h3>
        <p className="text-gray-400 max-w-xl mx-auto mb-4">
          These survivors took action and got help. You can too. Call 1930 or talk to our AI Guider — your story matters.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <AudioReadout text="Every story has a safe ending. These survivors took action and got help. You can too. Call 1930 or talk to our AI Guider." />
          <span>Read aloud</span>
        </div>
      </div>
    </div>
  );
}
