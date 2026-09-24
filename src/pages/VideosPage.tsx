import { useState } from 'react';
import { Video, Play, X, ExternalLink, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioReadout from '@/components/AudioReadout';
import { videos } from '@/data/videos';
import { trackResourceView } from '@/lib/supabase';
import type { VideoItem } from '@/types';

export default function VideosPage() {
  const { t, lang } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    trackResourceView({ resourceType: 'video_view', resourceId: video.id, resourceTitle: video.title, language: lang });
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-sm font-medium mb-4">
          <Video className="w-4 h-4" />
          <span>Verified Content</span>
        </div>
        <h1 className="section-title mb-3">{t.videos.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>{t.videos.subtitle}</span>
          <AudioReadout text={t.videos.subtitle} />
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="card-base overflow-hidden group hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-1 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-cyber-bg cursor-pointer" onClick={() => handleOpenVideo(video)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/90 via-cyber-bg/20 to-transparent"></div>
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-neon-cyan/20 backdrop-blur-sm border-2 border-neon-cyan/50 flex items-center justify-center group-hover:bg-neon-cyan/30 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 text-neon-cyan ml-1" fill="currentColor" />
                </div>
              </div>
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-bg/80 backdrop-blur-sm border border-cyber-border text-neon-cyan">
                  {video.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">{video.source}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-neon-cyan transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{video.description}</p>
              <button
                onClick={() => handleOpenVideo(video)}
                className="flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:gap-2.5 transition-all"
              >
                <Play className="w-4 h-4" />
                <span>{t.videos.watch}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-cyber-card border border-cyber-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border">
              <div>
                <h3 className="text-base font-bold text-white">{selectedVideo.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedVideo.source}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-bg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Embed */}
            <div className="aspect-video bg-cyber-bg">
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-cyber-border">
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{selectedVideo.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                  <Calendar className="w-3 h-3" />
                  {selectedVideo.category}
                </span>
                <a
                  href={selectedVideo.embedUrl.replace('/embed/', '/watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in new tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
