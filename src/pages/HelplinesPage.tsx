import { useState } from 'react';
import {
  Phone, AlertTriangle, ExternalLink, Globe, Heart, Brain, Shield,
  Send, CheckCircle2, Clock, Building2, MessageSquare, Lock,
} from 'lucide-react';
import { submitDistressLog } from '@/lib/supabase';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const harassmentOptions = [
  'Cyberbullying', 'Doxxing', 'Cyberstalking', 'Morphing & Deepfakes',
  'Non-Consensual Image Sharing', 'Trolling', 'Hate Speech',
  'Sextortion', 'Gaslighting', 'Other',
];

const urgencyConfig: Record<string, { color: string; border: string; bg: string; label: string }> = {
  low: { color: 'text-neon-green', border: 'border-neon-green/30', bg: 'bg-neon-green/10', label: 'Low' },
  medium: { color: 'text-neon-amber', border: 'border-neon-amber/30', bg: 'bg-neon-amber/10', label: 'Medium' },
  high: { color: 'text-neon-red', border: 'border-neon-red/30', bg: 'bg-neon-red/10', label: 'High' },
  critical: { color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/10', label: 'Critical' },
};

const emergencyHelplines = [
  { name: 'National Cyber Helpline', number: '1930', desc: '24x7 — Cybercrime reporting & assistance', icon: Shield, color: 'text-neon-cyan', border: 'border-neon-cyan/30', bg: 'bg-neon-cyan/10' },
  { name: 'Emergency Services', number: '112', desc: 'Life-threatening emergencies & immediate danger', icon: AlertTriangle, color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10' },
  { name: 'Women Helpline', number: '1091', desc: '24x7 — Women in distress', icon: Heart, color: 'text-neon-purple', border: 'border-neon-purple/30', bg: 'bg-neon-purple/10' },
  { name: 'Child Helpline', number: '1098', desc: '24x7 — Children in need of care & protection', icon: Phone, color: 'text-neon-amber', border: 'border-neon-amber/30', bg: 'bg-neon-amber/10' },
];

const mentalHealthHelplines = [
  { name: 'AASRA', number: '9820466726', desc: '24x7 crisis intervention & suicide prevention', icon: Heart, color: 'text-neon-red' },
  { name: 'iCall (Tata Institute)', number: '9152987821', desc: 'Free psychosocial helpline — Mon-Sat 8am-10pm', icon: Brain, color: 'text-neon-cyan' },
  { name: 'NIMHANS', number: '080-46110007', desc: 'National mental health helpline', icon: Brain, color: 'text-neon-green' },
  { name: 'Kiran Helpline', number: '1800-599-0019', desc: 'Government mental health support — 24x7', icon: Phone, color: 'text-neon-amber' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', desc: '24x7 mental health helpline', icon: Heart, color: 'text-neon-purple' },
];

const reportingPortals = [
  { name: 'cybercrime.gov.in', desc: 'National Cyber Crime Reporting Portal — File complaints online', url: 'https://cybercrime.gov.in', icon: Globe },
  { name: 'NCW Complaint Portal', desc: 'National Commission for Women — Online complaint filing', url: 'https://ncw.nic.in', icon: Building2 },
  { name: 'NCPCR', desc: 'National Commission for Protection of Child Rights', url: 'https://ncpcr.gov.in', icon: Shield },
  { name: 'RBI Ombudsman', desc: 'Reserve Bank of India — Financial fraud complaint portal', url: 'https://cms.rbi.org.in', icon: Building2 },
];

export default function HelplinesPage() {
  const [form, setForm] = useState({
    harassmentType: '',
    urgencyLevel: '' as '' | 'low' | 'medium' | 'high' | 'critical',
    description: '',
    contactRequested: false,
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async () => {
    if (!form.harassmentType || !form.urgencyLevel || !form.description.trim()) return;
    setStatus('submitting');
    const ok = await submitDistressLog({
      harassmentType: form.harassmentType,
      urgencyLevel: form.urgencyLevel,
      description: form.description,
      contactRequested: form.contactRequested,
      language: 'en',
    });
    setStatus(ok ? 'success' : 'error');
    if (ok) {
      setForm({ harassmentType: '', urgencyLevel: '', description: '', contactRequested: false });
    }
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-4">
          <Phone className="w-4 h-4" />
          <span>Emergency &amp; Support</span>
        </div>
        <h1 className="section-title mb-3">Official Helplines &amp; Reporting</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Immediate help is one call away. Reach out to official helplines, file complaints online, or submit an anonymous distress log — all in one place.
        </p>
      </div>

      {/* Emergency Helplines */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Emergency Helplines
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {emergencyHelplines.map((h) => {
            const Icon = h.icon;
            return (
              <a
                key={h.name}
                href={`tel:${h.number}`}
                className={`card-base p-5 flex items-center gap-4 hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-0.5 transition-all duration-300 ${h.bg} ${h.border}`}
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-cyber-bg border ${h.border} ${h.color} flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white">{h.name}</h3>
                  <p className="text-xs text-gray-400 mb-1">{h.desc}</p>
                  <p className={`text-2xl font-bold ${h.color}`}>{h.number}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold ${h.bg} border ${h.border} ${h.color} whitespace-nowrap`}>
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mental Health Helplines */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Brain className="w-5 h-5 text-neon-purple" />
          Mental Health &amp; Crisis Support
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentalHealthHelplines.map((h) => {
            const Icon = h.icon;
            return (
              <a
                key={h.name}
                href={`tel:${h.number}`}
                className="card-base p-5 hover:border-neon-purple/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-cyber-bg border border-cyber-border ${h.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{h.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-2 leading-relaxed">{h.desc}</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-500" />
                  <span className={`text-lg font-bold ${h.color}`}>{h.number}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Online Reporting Portals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Globe className="w-5 h-5 text-neon-cyan" />
          Online Reporting Portals
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {reportingPortals.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-5 flex items-start gap-4 hover:border-neon-cyan/30 hover:glow-card hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Anonymous Distress Log Form */}
      <div className="mb-12">
        <div className="card-base overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 bg-cyber-surface border-b border-cyber-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Anonymous Distress Log</h2>
                <p className="text-xs text-gray-400">Share what you're experiencing — no name or account required</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-5">
            {status === 'success' ? (
              <div className="text-center py-8 animate-fade-in">
                <CheckCircle2 className="w-14 h-14 text-neon-green mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Your distress log has been received</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto mb-5">
                  We've logged your report anonymously. If you need immediate help, please call 1930 or 112 right now.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary text-sm"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <>
                {/* Harassment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type of Harassment</label>
                  <select
                    value={form.harassmentType}
                    onChange={(e) => setForm({ ...form, harassmentType: e.target.value })}
                    className="input-base cursor-pointer"
                  >
                    <option value="">Select a type...</option>
                    {harassmentOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Urgency Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(urgencyConfig).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setForm({ ...form, urgencyLevel: key as 'low' | 'medium' | 'high' | 'critical' })}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                          form.urgencyLevel === key
                            ? `${cfg.bg} ${cfg.border} ${cfg.color} glow-border`
                            : 'bg-cyber-bg border-cyber-border text-gray-400 hover:text-white'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe What Happened
                    <span className="text-gray-500 ml-2 text-xs">({form.description.length}/3000)</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value.slice(0, 3000) })}
                    rows={5}
                    placeholder="Share as much or as little as you're comfortable with. This helps us understand the scope of the problem..."
                    className="input-base resize-none"
                  />
                </div>

                {/* Contact Requested */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.contactRequested}
                    onChange={(e) => setForm({ ...form, contactRequested: e.target.checked })}
                    className="w-5 h-5 rounded border-cyber-border bg-cyber-bg text-neon-cyan focus:ring-neon-cyan/30"
                  />
                  <span className="text-sm text-gray-300">
                    I would like authorities to reach out to me (optional — you can remain fully anonymous)
                  </span>
                </label>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!form.harassmentType || !form.urgencyLevel || !form.description.trim() || status === 'submitting'}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-purple/10 border border-neon-purple/50 text-neon-purple font-semibold transition-all duration-300 hover:bg-neon-purple/20 hover:glow-border disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Anonymously</span>
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-400">Something went wrong. Please try again or call 1930 directly.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reference: Do's and Don'ts */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-5 border-neon-green/20">
          <h4 className="text-sm font-bold text-neon-green mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Do's
          </h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li>Save all evidence — screenshots, URLs, timestamps</li>
            <li>Call 1930 immediately for any cybercrime</li>
            <li>File a complaint at cybercrime.gov.in</li>
            <li>Tell someone you trust about what's happening</li>
            <li>Block the harasser on all platforms</li>
            <li>Seek mental health support if overwhelmed</li>
          </ul>
        </div>
        <div className="card-base p-5 border-neon-red/20">
          <h4 className="text-sm font-bold text-neon-red mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Don'ts
          </h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li>Do NOT pay any money to blackmailers</li>
            <li>Do NOT delete original messages or evidence</li>
            <li>Do NOT respond to or engage with the harasser</li>
            <li>Do NOT share personal details with strangers</li>
            <li>Do NOT suffer in silence — help is available</li>
            <li>Do NOT hesitate to call mental health helplines</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
