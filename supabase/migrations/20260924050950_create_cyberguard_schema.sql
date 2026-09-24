/*
# CyberGuard AI — Initial Database Schema

## Overview
Creates the full persistence layer for the CyberGuard AI platform.
The app has no user authentication (public-facing awareness tool), so all tables
use anon + authenticated RLS policies with USING(true) / WITH CHECK(true)
because the data is intentionally shared/public analytics.

## New Tables

### 1. scan_reports
Records every AI detector analysis run anonymously.
- id: UUID primary key
- input_text: The text submitted for analysis (truncated to 5000 chars)
- risk_level: 'safe' | 'caution' | 'high'
- category: threat category classification
- toxicity_score: 0–100 integer score
- matched_keywords: array of matched threat keywords
- language: UI language at time of scan (en/hi/mr)
- created_at: timestamp

### 2. chat_sessions
Tracks anonymous AI Guider chat sessions.
- id: UUID primary key
- session_token: a client-generated random token to link messages to session
- language: UI language at session start
- message_count: denormalised count updated on insert
- created_at: timestamp

### 3. chat_messages
Individual messages within a chat session.
- id: UUID primary key
- session_id: FK to chat_sessions
- role: 'user' | 'bot'
- message_text: the message content
- created_at: timestamp

### 4. resource_views
Tracks guideline PDF previews/downloads and video opens for analytics.
- id: UUID primary key
- resource_type: 'guideline_preview' | 'guideline_download' | 'video_view'
- resource_id: the string ID of the guideline or video (e.g. 'victim-sop')
- resource_title: human-readable title at time of event
- language: UI language at time of event
- created_at: timestamp

### 5. platform_feedback
Optional star-rating + text feedback submitted by visitors.
- id: UUID primary key
- rating: integer 1–5
- feedback_text: optional free-text comment
- page: which page feedback was submitted from
- language: UI language at time of submission
- created_at: timestamp

## Security
- RLS enabled on all tables.
- All policies are TO anon, authenticated (no login required).
- INSERT/SELECT allowed for all; UPDATE/DELETE disabled (append-only analytics).
- USING(true) is intentional: this is public platform analytics data.

## Indexes
- scan_reports: risk_level, category, created_at for analytics queries
- chat_messages: session_id for efficient session fetch
- resource_views: resource_id, resource_type for popularity queries
*/

-- ============================================================
-- TABLE: scan_reports
-- ============================================================
CREATE TABLE IF NOT EXISTS scan_reports (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text    text NOT NULL,
  risk_level    text NOT NULL CHECK (risk_level IN ('safe', 'caution', 'high')),
  category      text NOT NULL CHECK (category IN (
                  'cyberbullying', 'financial_fraud',
                  'threat_blackmail', 'identity_abuse', 'safe')),
  toxicity_score integer NOT NULL CHECK (toxicity_score BETWEEN 0 AND 100),
  matched_keywords text[] NOT NULL DEFAULT '{}',
  language      text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scan_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_scan_reports" ON scan_reports;
CREATE POLICY "anon_select_scan_reports" ON scan_reports FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_scan_reports" ON scan_reports;
CREATE POLICY "anon_insert_scan_reports" ON scan_reports FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_scan_reports_risk ON scan_reports (risk_level);
CREATE INDEX IF NOT EXISTS idx_scan_reports_category ON scan_reports (category);
CREATE INDEX IF NOT EXISTS idx_scan_reports_created ON scan_reports (created_at DESC);

-- ============================================================
-- TABLE: chat_sessions
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text NOT NULL UNIQUE,
  language      text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  message_count integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_active_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_sessions" ON chat_sessions;
CREATE POLICY "anon_select_chat_sessions" ON chat_sessions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_sessions" ON chat_sessions;
CREATE POLICY "anon_insert_chat_sessions" ON chat_sessions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_chat_sessions" ON chat_sessions;
CREATE POLICY "anon_update_chat_sessions" ON chat_sessions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_token ON chat_sessions (session_token);

-- ============================================================
-- TABLE: chat_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    uuid NOT NULL REFERENCES chat_sessions (id) ON DELETE CASCADE,
  role          text NOT NULL CHECK (role IN ('user', 'bot')),
  message_text  text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages (session_id);

-- ============================================================
-- TABLE: resource_views
-- ============================================================
CREATE TABLE IF NOT EXISTS resource_views (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type  text NOT NULL CHECK (resource_type IN (
                   'guideline_preview', 'guideline_download', 'video_view')),
  resource_id    text NOT NULL,
  resource_title text NOT NULL,
  language       text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resource_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_resource_views" ON resource_views;
CREATE POLICY "anon_select_resource_views" ON resource_views FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_resource_views" ON resource_views;
CREATE POLICY "anon_insert_resource_views" ON resource_views FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_resource_views_id ON resource_views (resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_type ON resource_views (resource_type);

-- ============================================================
-- TABLE: platform_feedback
-- ============================================================
CREATE TABLE IF NOT EXISTS platform_feedback (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating        integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback_text text,
  page          text NOT NULL DEFAULT 'general',
  language      text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE platform_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_feedback" ON platform_feedback;
CREATE POLICY "anon_select_feedback" ON platform_feedback FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_feedback" ON platform_feedback;
CREATE POLICY "anon_insert_feedback" ON platform_feedback FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ============================================================
-- HELPER VIEW: platform_stats
-- A live aggregate the homepage can query for the stat counters.
-- ============================================================
CREATE OR REPLACE VIEW platform_stats AS
SELECT
  (SELECT COUNT(*) FROM scan_reports)::bigint                                  AS total_scans,
  (SELECT COUNT(*) FROM scan_reports WHERE risk_level IN ('caution', 'high'))::bigint AS threats_detected,
  (SELECT COUNT(*) FROM chat_messages WHERE role = 'user')::bigint             AS user_messages,
  (SELECT COUNT(DISTINCT session_id) FROM chat_messages)::bigint              AS chat_sessions_count;
