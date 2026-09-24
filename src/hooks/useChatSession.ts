import { useState, useCallback, useRef } from 'react';
import { getBotResponse } from '@/data/chatbot';
import { getOrCreateChatSession, saveChatMessage } from '@/lib/supabase';
import type { ChatMessage, Language } from '@/types';

function makeSessionToken(): string {
  return `cg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useChatSession(botIntro: string, lang: Language) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'intro', role: 'bot', text: botIntro, timestamp: Date.now() },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');

  // Lazily resolved DB session ID — created on first real message
  const sessionTokenRef = useRef<string>(makeSessionToken());
  const sessionIdRef = useRef<string | null>(null);

  const ensureSession = useCallback(async () => {
    if (sessionIdRef.current) return sessionIdRef.current;
    const id = await getOrCreateChatSession(sessionTokenRef.current, lang);
    sessionIdRef.current = id;
    return id;
  }, [lang]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setTyping(true);

      // Persist user message in background
      ensureSession().then((sessionId) => {
        if (sessionId) saveChatMessage({ sessionId, role: 'user', text });
      });

      const botText = getBotResponse(text);

      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          role: 'bot',
          text: botText,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);

        // Persist bot response in background
        ensureSession().then((sessionId) => {
          if (sessionId) saveChatMessage({ sessionId, role: 'bot', text: botText });
        });
      }, 800 + Math.random() * 600);
    },
    [ensureSession],
  );

  return { messages, setMessages, typing, input, setInput, sendMessage };
}
