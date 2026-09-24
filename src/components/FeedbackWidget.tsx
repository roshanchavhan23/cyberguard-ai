import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { submitFeedback } from '@/lib/supabase';

interface FeedbackWidgetProps {
  page?: string;
}

export default function FeedbackWidget({ page = 'general' }: FeedbackWidgetProps) {
  const { lang } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    const ok = await submitFeedback({ rating, feedbackText: text, page, language: lang });
    setSubmitting(false);
    if (ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <CheckCircle className="w-7 h-7 text-neon-green" />
        <p className="text-sm font-medium text-neon-green">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400 font-medium">How helpful was this platform?</p>
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 transition-colors duration-150 ${
                star <= (hovered || rating)
                  ? 'text-neon-amber fill-neon-amber'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
      {/* Optional Text */}
      {rating > 0 && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell us more (optional)..."
          rows={2}
          className="w-full max-w-xs bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-neon-cyan/40 transition-all resize-none"
        />
      )}
      {rating > 0 && (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-40 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{submitting ? 'Submitting...' : 'Submit Feedback'}</span>
        </button>
      )}
    </div>
  );
}
