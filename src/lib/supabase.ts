import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Typed helpers ──────────────────────────────────────────────────────────

export async function saveScanReport(params: {
  inputText: string;
  riskLevel: 'safe' | 'caution' | 'high';
  category: string;
  toxicityScore: number;
  matchedKeywords: string[];
  language: string;
}) {
  const { error } = await supabase.from('scan_reports').insert({
    input_text: params.inputText.slice(0, 5000),
    risk_level: params.riskLevel,
    category: params.category,
    toxicity_score: params.toxicityScore,
    matched_keywords: params.matchedKeywords,
    language: params.language,
  });
  if (error) console.error('[saveScanReport]', error.message);
}

export async function getOrCreateChatSession(token: string, language: string): Promise<string | null> {
  // Try to find existing session
  const { data: existing } = await supabase
    .from('chat_sessions')
    .select('id')
    .eq('session_token', token)
    .maybeSingle();

  if (existing) return existing.id as string;

  // Create new session
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({ session_token: token, language })
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('[getOrCreateChatSession]', error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function saveChatMessage(params: {
  sessionId: string;
  role: 'user' | 'bot';
  text: string;
}) {
  const { error } = await supabase.from('chat_messages').insert({
    session_id: params.sessionId,
    role: params.role,
    message_text: params.text,
  });
  if (error) console.error('[saveChatMessage]', error.message);

  // Update session message count + last_active_at
  await supabase.rpc('increment_session_message_count', { p_session_id: params.sessionId }).maybeSingle().catch(() => {
    // RPC may not exist yet; update directly instead
    supabase
      .from('chat_sessions')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', params.sessionId);
  });
}

export async function trackResourceView(params: {
  resourceType: 'guideline_preview' | 'guideline_download' | 'video_view';
  resourceId: string;
  resourceTitle: string;
  language: string;
}) {
  const { error } = await supabase.from('resource_views').insert({
    resource_type: params.resourceType,
    resource_id: params.resourceId,
    resource_title: params.resourceTitle,
    language: params.language,
  });
  if (error) console.error('[trackResourceView]', error.message);
}

export async function submitFeedback(params: {
  rating: number;
  feedbackText: string;
  page: string;
  language: string;
}) {
  const { error } = await supabase.from('platform_feedback').insert({
    rating: params.rating,
    feedback_text: params.feedbackText || null,
    page: params.page,
    language: params.language,
  });
  if (error) {
    console.error('[submitFeedback]', error.message);
    return false;
  }
  return true;
}

export async function getPlatformStats(): Promise<{
  totalScans: number;
  threatsDetected: number;
  chatSessions: number;
} | null> {
  const { data, error } = await supabase
    .from('platform_stats')
    .select('total_scans, threats_detected, chat_sessions_count')
    .maybeSingle();

  if (error || !data) return null;
  return {
    totalScans: Number(data.total_scans),
    threatsDetected: Number(data.threats_detected),
    chatSessions: Number(data.chat_sessions_count),
  };
}
