import { useRef, useEffect } from 'react';
import { Bot, User, Send, MessageSquare, Phone, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useChatSession } from '@/hooks/useChatSession';

export default function GuiderPage() {
  const { t, lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, setMessages, typing, input, setInput, sendMessage } =
    useChatSession(t.guider.botIntro, lang);

  // Sync intro text when language switches
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => (m.id === 'intro' ? { ...m, text: t.guider.botIntro } : m))
    );
  }, [t.guider.botIntro, setMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const quickPrompts = [t.guider.qp1, t.guider.qp2, t.guider.qp3, t.guider.qp4];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm font-medium mb-4">
          <MessageSquare className="w-4 h-4" />
          <span>Available 24/7</span>
        </div>
        <h1 className="section-title mb-3">{t.guider.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t.guider.subtitle}</p>
      </div>

      {/* Quick Resource Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <a
          href="tel:1930"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium hover:bg-red-600/20 transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>Call 1930</span>
        </a>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/20 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span>cybercrime.gov.in</span>
        </a>
      </div>

      {/* Chat Container */}
      <div className="card-base overflow-hidden flex flex-col" style={{ height: '600px' }}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-3 bg-cyber-surface border-b border-cyber-border">
          <div className="relative">
            <Bot className="w-8 h-8 text-neon-cyan" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-cyber-surface"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Guider Bot</h3>
            <p className="text-xs text-neon-green">● Online — Empathetic & Confidential</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                  msg.role === 'bot'
                    ? 'bg-neon-cyan/10 text-neon-cyan'
                    : 'bg-neon-blue/10 text-neon-blue'
                }`}
              >
                {msg.role === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'bot'
                    ? 'bg-cyber-surface text-gray-200 rounded-tl-sm'
                    : 'bg-neon-cyan/10 text-neon-cyan rounded-tr-sm border border-neon-cyan/20'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-neon-cyan/10 text-neon-cyan">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-cyber-surface rounded-tl-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2 border-t border-cyber-border">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-1.5 rounded-full text-xs bg-cyber-bg border border-cyber-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-cyber-border">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder={t.guider.placeholder}
              className="flex-1 bg-cyber-bg border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-neon-cyan/40 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-center">{t.guider.disclaimer}</p>
        </div>
      </div>

      {/* Do's and Don'ts Quick Reference */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="card-base p-5 border-neon-green/20">
          <h4 className="text-sm font-bold text-neon-green mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Do's
          </h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li>• Save all evidence — screenshots, URLs, timestamps</li>
            <li>• Call 1930 immediately</li>
            <li>• File a complaint at cybercrime.gov.in</li>
            <li>• Tell someone you trust</li>
            <li>• Block the harasser</li>
          </ul>
        </div>
        <div className="card-base p-5 border-neon-red/20">
          <h4 className="text-sm font-bold text-neon-red mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Don'ts
          </h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li>• Do NOT pay any money to blackmailers</li>
            <li>• Do NOT delete original messages</li>
            <li>• Do NOT respond to the harasser</li>
            <li>• Do NOT share personal details</li>
            <li>• Do NOT panic — help is available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
