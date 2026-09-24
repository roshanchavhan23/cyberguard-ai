import { useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useChatSession } from '@/hooks/useChatSession';
import { useState } from 'react';

export default function ChatDrawer() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
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
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold backdrop-blur-md animate-pulse-glow hover:scale-105 transition-transform duration-200"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">AI Guider</span>
        </button>
      )}

      {/* Chat Drawer */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-[420px] h-[80vh] sm:h-[600px] flex flex-col bg-cyber-card border-l border-t border-cyber-border rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-none shadow-2xl animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-cyber-surface border-b border-cyber-border">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Bot className="w-6 h-6 text-neon-cyan" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-cyber-surface"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Guider Bot</h3>
                <p className="text-xs text-neon-green">● Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-card transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'bot'
                      ? 'bg-neon-cyan/10 text-neon-cyan'
                      : 'bg-neon-blue/10 text-neon-blue'
                  }`}
                >
                  {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
              <div className="flex gap-2.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-neon-cyan/10 text-neon-cyan">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-cyber-surface rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-cyber-border">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full text-xs bg-cyber-bg border border-cyber-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-cyber-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={t.guider.placeholder}
                className="flex-1 bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-neon-cyan/40 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-1.5 text-center">
              {t.guider.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
