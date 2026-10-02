import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Scan History ──────────────────────────────────────────────────────────

export async function saveScanHistory(params: {
  inputText: string;
  riskLevel: 'safe' | 'caution' | 'high';
  category: string;
  toxicityScore: number;
  matchedKeywords: string[];
  harassmentTypes: string[];
  language: string;
}) {
  const { error } = await supabase.from('scan_history').insert({
    input_text: params.inputText.slice(0, 5000),
    risk_level: params.riskLevel,
    category: params.category,
    toxicity_score: params.toxicityScore,
    matched_keywords: params.matchedKeywords,
    harassment_types: params.harassmentTypes,
    language: params.language,
  });
  if (error) console.error('[saveScanHistory]', error.message);
}

// ── Distress Logs ─────────────────────────────────────────────────────────

export async function submitDistressLog(params: {
  harassmentType: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  contactRequested: boolean;
  language: string;
}) {
  const { error } = await supabase.from('distress_logs').insert({
    harassment_type: params.harassmentType,
    urgency_level: params.urgencyLevel,
    description: params.description.slice(0, 3000),
    contact_requested: params.contactRequested,
    language: params.language,
  });
  if (error) {
    console.error('[submitDistressLog]', error.message);
    return false;
  }
  return true;
}

// ── Harassment Reports ────────────────────────────────────────────────────

export async function submitHarassmentReport(params: {
  reportType: string;
  platform: string;
  evidenceSummary: string;
  actionTaken: string;
  language: string;
}) {
  const { error } = await supabase.from('harassment_reports').insert({
    report_type: params.reportType,
    platform: params.platform,
    evidence_summary: params.evidenceSummary,
    action_taken: params.actionTaken,
    language: params.language,
  });
  if (error) {
    console.error('[submitHarassmentReport]', error.message);
    return false;
  }
  return true;
}

// ── Resource Feedback ────────────────────────────────────────────────────

export async function submitResourceFeedback(params: {
  resourceId: string;
  rating: number;
  feedbackText: string;
  page: string;
  language: string;
}) {
  const { error } = await supabase.from('resource_feedback').insert({
    resource_id: params.resourceId,
    rating: params.rating,
    feedback_text: params.feedbackText || null,
    page: params.page,
    language: params.language,
  });
  if (error) {
    console.error('[submitResourceFeedback]', error.message);
    return false;
  }
  return true;
}

// ── Chat Sessions (retained from original) ────────────────────────────────

export async function getOrCreateChatSession(token: string, language: string): Promise<string | null> {
  const { data: existing } = await supabase
    .from('chat_sessions')
    .select('id')
    .eq('session_token', token)
    .maybeSingle();

  if (existing) return existing.id as string;

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

  try {
    await supabase.rpc('increment_session_message_count', { p_session_id: params.sessionId }).maybeSingle();
  } catch {
    supabase
      .from('chat_sessions')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', params.sessionId);
  }
}

// ── Resource Views (retained) ─────────────────────────────────────────────

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

// ── Dashboard Stats ────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<{
  totalScans: number;
  threatsDetected: number;
  distressLogs: number;
  criticalCases: number;
  totalReports: number;
} | null> {
  const { data, error } = await supabase
    .from('platform_dashboard_stats')
    .select('total_scans, threats_detected, distress_logs_count, critical_cases, total_reports')
    .maybeSingle();

  if (error || !data) {
    // Fallback to legacy view
    const { data: legacy } = await supabase
      .from('platform_stats')
      .select('total_scans, threats_detected, chat_sessions_count')
      .maybeSingle();
    if (!legacy) return null;
    return {
      totalScans: Number(legacy.total_scans),
      threatsDetected: Number(legacy.threats_detected),
      distressLogs: 0,
      criticalCases: 0,
      totalReports: 0,
    };
  }
  return {
    totalScans: Number(data.total_scans),
    threatsDetected: Number(data.threats_detected),
    distressLogs: Number(data.distress_logs_count),
    criticalCases: Number(data.critical_cases),
    totalReports: Number(data.total_reports),
  };
}
