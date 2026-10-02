/*
# Fresh CyberGuard AI — Independent Database Schema

## Overview
Creates a fresh, independent persistence layer for the fully rebranded CyberGuard AI platform.
All tables use anon + authenticated RLS policies with USING(true) because this is a
public-facing awareness tool with no user authentication.

## New Tables

### 1. distress_logs
Anonymous distress logs submitted by users needing immediate help.
- id: UUID PK
- harassment_type: which type of harassment (cyberbullying, doxxing, etc.)
- urgency_level: low | medium | high | critical
- description: user's anonymous description of the situation
- contact_requested: whether the user wants to be contacted by authorities
- language: UI language at time of submission
- status: active | resolved | escalated
- created_at: timestamp

### 2. harassment_reports
Structured reports of specific harassment incidents for tracking and analytics.
- id: UUID PK
- report_type: the category of harassment reported
- platform: where the harassment occurred (whatsapp, instagram, etc.)
- evidence_summary: text summary of evidence collected
- action_taken: what action the user has taken so far
- language: UI language
- created_at: timestamp

### 3. scan_history
Security scan / threat scanner results history (replaces scan_reports with expanded schema).
- id: UUID PK
- input_text: text analyzed (truncated to 5000 chars)
- risk_level: safe | caution | high
- category: expanded harassment classification
- toxicity_score: 0-100
- matched_keywords: array of matched keywords
- harassment_types: array of detected harassment type IDs
- language: UI language
- created_at: timestamp

### 4. resource_feedback
User feedback on platform resources (guides, pages, tools).
- id: UUID PK
- resource_id: which resource was rated
- rating: 1-5 stars
- feedback_text: optional comment
- page: which page the feedback was submitted from
- language: UI language
- created_at: timestamp

## Security
- RLS enabled on all tables.
- All policies: TO anon, authenticated (no login required).
- INSERT + SELECT for all; UPDATE/DELETE disabled (append-only).
- USING(true) is intentional: public platform analytics data.

## Indexes
- distress_logs: harassment_type, urgency_level, created_at
- harassment_reports: report_type, platform, created_at
- scan_history: risk_level, category, created_at
- resource_feedback: resource_id, page, created_at
*/

-- ============================================================
-- TABLE: distress_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS distress_logs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  harassment_type  text NOT NULL,
  urgency_level    text NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  description      text NOT NULL,
  contact_requested boolean NOT NULL DEFAULT false,
  language         text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  status           text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'escalated')),
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE distress_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_distress_logs" ON distress_logs;
CREATE POLICY "anon_select_distress_logs" ON distress_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_distress_logs" ON distress_logs;
CREATE POLICY "anon_insert_distress_logs" ON distress_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_distress_logs_type ON distress_logs (harassment_type);
CREATE INDEX IF NOT EXISTS idx_distress_logs_urgency ON distress_logs (urgency_level);
CREATE INDEX IF NOT EXISTS idx_distress_logs_created ON distress_logs (created_at DESC);

-- ============================================================
-- TABLE: harassment_reports
-- ============================================================
CREATE TABLE IF NOT EXISTS harassment_reports (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type     text NOT NULL,
  platform        text NOT NULL,
  evidence_summary text,
  action_taken    text,
  language        text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE harassment_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_harassment_reports" ON harassment_reports;
CREATE POLICY "anon_select_harassment_reports" ON harassment_reports FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_harassment_reports" ON harassment_reports;
CREATE POLICY "anon_insert_harassment_reports" ON harassment_reports FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_harassment_reports_type ON harassment_reports (report_type);
CREATE INDEX IF NOT EXISTS idx_harassment_reports_platform ON harassment_reports (platform);
CREATE INDEX IF NOT EXISTS idx_harassment_reports_created ON harassment_reports (created_at DESC);

-- ============================================================
-- TABLE: scan_history
-- ============================================================
CREATE TABLE IF NOT EXISTS scan_history (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text       text NOT NULL,
  risk_level       text NOT NULL CHECK (risk_level IN ('safe', 'caution', 'high')),
  category         text NOT NULL,
  toxicity_score   integer NOT NULL CHECK (toxicity_score BETWEEN 0 AND 100),
  matched_keywords text[] NOT NULL DEFAULT '{}',
  harassment_types text[] NOT NULL DEFAULT '{}',
  language         text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_scan_history" ON scan_history;
CREATE POLICY "anon_select_scan_history" ON scan_history FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_scan_history" ON scan_history;
CREATE POLICY "anon_insert_scan_history" ON scan_history FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_scan_history_risk ON scan_history (risk_level);
CREATE INDEX IF NOT EXISTS idx_scan_history_category ON scan_history (category);
CREATE INDEX IF NOT EXISTS idx_scan_history_created ON scan_history (created_at DESC);

-- ============================================================
-- TABLE: resource_feedback
-- ============================================================
CREATE TABLE IF NOT EXISTS resource_feedback (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id    text NOT NULL,
  rating         integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback_text  text,
  page           text NOT NULL DEFAULT 'general',
  language       text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'mr')),
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resource_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_resource_feedback" ON resource_feedback;
CREATE POLICY "anon_select_resource_feedback" ON resource_feedback FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_resource_feedback" ON resource_feedback;
CREATE POLICY "anon_insert_resource_feedback" ON resource_feedback FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_resource_feedback_resource ON resource_feedback (resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_feedback_page ON resource_feedback (page);
CREATE INDEX IF NOT EXISTS idx_resource_feedback_created ON resource_feedback (created_at DESC);

-- ============================================================
-- VIEW: platform_dashboard_stats
-- Live aggregate for the homepage dashboard counters.
-- ============================================================
CREATE OR REPLACE VIEW platform_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM scan_history)::bigint                                    AS total_scans,
  (SELECT COUNT(*) FROM scan_history WHERE risk_level IN ('caution', 'high'))::bigint AS threats_detected,
  (SELECT COUNT(*) FROM distress_logs)::bigint                                    AS distress_logs_count,
  (SELECT COUNT(*) FROM distress_logs WHERE urgency_level IN ('high', 'critical'))::bigint AS critical_cases,
  (SELECT COUNT(*) FROM harassment_reports)::bigint                               AS total_reports;
