import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSpeech } from '@/hooks/useSpeech';

interface AudioReadoutProps {
  text: string;
  className?: string;
}

export default function AudioReadout({ text, className = '' }: AudioReadoutProps) {
  const { lang } = useLanguage();
  const { speak, speaking } = useSpeech(lang);

  return (
    <button
      onClick={() => speak(text)}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
        speaking
          ? 'text-neon-green bg-neon-green/10 border border-neon-green/30'
          : 'text-gray-500 hover:text-neon-cyan hover:bg-neon-cyan/5 border border-transparent'
      } ${className}`}
      title={speaking ? 'Stop reading' : 'Read aloud'}
    >
      {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
    </button>
  );
}
