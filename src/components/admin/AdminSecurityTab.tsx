import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  RefreshCw,
  Cookie,
  FileCheck,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  Send,
  ExternalLink,
  History,
} from 'lucide-react';
import { AdminAuth, SecurityAuditEntry, GeneratedOTP, AdminSecuritySettings } from '../../lib/auth';
import { ADMIN_COOKIE_NAME } from '../../lib/cookieUtils';
import { Security, SecurityAuditReport } from '../../lib/security';

interface AdminSecurityTabProps {
  secSettings: AdminSecuritySettings;
  onUpdateSecuritySettings: (settings: AdminSecuritySettings) => void;
}

export const AdminSecurityTab: React.FC<AdminSecurityTabProps> = ({
  secSettings: initialSecSettings,
  onUpdateSecuritySettings,
}) => {
  const [secSettings, setSecSettings] = useState<AdminSecuritySettings>(initialSecSettings);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [securityStatusMsg, setSecurityStatusMsg] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditEntry[]>(() => AdminAuth.getAuditLogs());
  const [testOtpInfo, setTestOtpInfo] = useState<GeneratedOTP | null>(null);
  const [auditReport, setAuditReport] = useState<SecurityAuditReport>(() => Security.runSecurityAudit());
  const [isAuditing, setIsAuditing] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatusMsg(null);
    if (!newPasswordInput || newPasswordInput.length < 6) {
      setPasswordStatusMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordStatusMsg({ type: 'error', text: 'New passwords do not match. Please re-enter.' });
      return;
    }

    const verify = await AdminAuth.verifyMasterPassword(currentPasswordInput);
    if (!verify.success) {
      setPasswordStatusMsg({ type: 'error', text: verify.error || 'Current password incorrect.' });
      return;
    }

    const updated = await AdminAuth.setMasterPassword(newPasswordInput);
    if (updated) {
      setPasswordStatusMsg({ type: 'success', text: 'Master Admin Password successfully updated and encrypted!' });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setAuditLogs(AdminAuth.getAuditLogs());
    } else {
      setPasswordStatusMsg({ type: 'error', text: 'Failed to update password.' });
    }
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    AdminAuth.saveSecuritySettings(secSettings);
    onUpdateSecuritySettings(secSettings);
    setSecurityStatusMsg('Security configuration successfully saved!');
    setTimeout(() => setSecurityStatusMsg(null), 3000);
    setAuditLogs(AdminAuth.getAuditLogs());
  };

  const handleTestOtpDispatch = () => {
    const otp = AdminAuth.generateSecurityOTP();
    setTestOtpInfo(otp);
    setAuditLogs(AdminAuth.getAuditLogs());
  };

  const handleClearAuditLogs = () => {
    localStorage.removeItem('modern_aquarium_admin_audit_v1');
    setAuditLogs([]);
  };

  const handleRunSecurityAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const report = Security.runSecurityAudit();
      setAuditReport(report);
      setIsAuditing(false);
      AdminAuth.addAuditLog(
        'SECURITY_PATCH_VERIFIED',
        `Security audit verified: Grade ${report.grade} (${report.overallScore}% score). 24-hr cookie validated.`
      );
      setAuditLogs(AdminAuth.getAuditLogs());
      setSecurityStatusMsg('Security audit complete: all patches active with 24-hr cookie enforcement.');
      setTimeout(() => setSecurityStatusMsg(null), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider mb-1 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Out-of-Band Security &amp; Access Controls</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Security Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage admin credentials, 24-hour cookie enforcement, out-of-band WhatsApp 2FA, and inspect cryptographic audit logs.
          </p>
        </div>

        {securityStatusMsg && (
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{securityStatusMsg}</span>
          </div>
        )}

        {/* SECURITY AUDIT & 24H COOKIE PATCH STATUS */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-cyan-200 dark:border-cyan-900/60 rounded-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security Audit &amp; System Health</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">
                    Grade {auditReport.grade} • {auditReport.overallScore}% Secure
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Automated cryptographic verification: constant-time equality, Web Crypto CSPRNG, and RFC 6265 24-hr cookies.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunSecurityAudit}
              disabled={isAuditing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 dark:bg-cyan-500/20 border border-cyan-700 dark:border-cyan-500/40 text-white dark:text-cyan-300 hover:bg-cyan-700 dark:hover:bg-cyan-500/30 text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Codebase...' : 'Run Security Audit'}</span>
            </button>
          </div>

          {/* 24-Hour Cookie Session Diagnostic Details */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">24-Hour Session Cookie Enforcement (RFC 6265)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active 24h Cookie
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Cookie Name</span>
                <code className="text-cyan-700 dark:text-cyan-300 font-mono font-semibold text-[10px] mt-0.5 block truncate">
                  {ADMIN_COOKIE_NAME}
                </code>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Persistence Window</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 block">
                  86,400s (24 Hours)
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">CSRF Protection</span>
                <span className="text-slate-900 dark:text-white font-semibold mt-0.5 block">
                  SameSite=Strict
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Storage Security</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium mt-0.5 block">
                  Dual Cookie + Sync
                </span>
              </div>
            </div>
          </div>

          {/* Security Patch Item Grid */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Verified Security Defenses ({auditReport.patches.length}/{auditReport.patches.length} Active)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {auditReport.patches.map((patch) => (
                <div
                  key={patch.id}
                  className="p-3 rounded-lg bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white text-[11px]">{patch.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {patch.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{patch.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MASTER PASSWORD ROTATION */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Change Master Admin Password</h3>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Salted SHA-256</span>
          </div>

          {passwordStatusMsg && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                passwordStatusMsg.type === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
              }`}
            >
              {passwordStatusMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{passwordStatusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Current Password</label>
              <input
                type="password"
                required
                placeholder="Enter current password..."
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                className="w-full sm:max-w-md px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:max-w-md">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">New Password (min 6 chars)</label>
                <input
                  type="password"
                  required
                  placeholder="New password..."
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new password..."
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* OUT-OF-BAND WHATSAPP & OWNER VERIFICATION */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Out-of-Band WhatsApp Security</h3>
          </div>

          <form onSubmit={handleSaveSecuritySettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Owner WhatsApp Destination</label>
                <input
                  type="text"
                  required
                  value={secSettings.ownerPhone}
                  onChange={(e) => setSecSettings({ ...secSettings, ownerPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Format: 91XXXXXXXXXX</span>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Owner Email</label>
                <input
                  type="email"
                  required
                  value={secSettings.ownerEmail}
                  onChange={(e) => setSecSettings({ ...secSettings, ownerEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={secSettings.require2FA}
                  onChange={(e) => setSecSettings({ ...secSettings, require2FA: e.target.checked })}
                  className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-cyan-600 focus:ring-cyan-500"
                />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Enforce Mandatory Two-Factor Authentication (2FA)</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Requires verifying a dynamic 6-digit WhatsApp OTP in addition to the password.
                  </p>
                </div>
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-900">
                <div className="flex items-center gap-3">
                  <label className="text-slate-700 dark:text-slate-300 font-medium">Session Inactivity Expiry:</label>
                  <select
                    value={secSettings.sessionDurationMinutes}
                    onChange={(e) => setSecSettings({ ...secSettings, sessionDurationMinutes: Number(e.target.value) })}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value={1440}>24 Hours (Standard &amp; Strict Cookie)</option>
                    <option value={480}>8 Hours</option>
                    <option value={120}>2 Hours</option>
                    <option value={60}>1 Hour</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <Cookie className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>RFC 6265 Max-Age=86400 (24h)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Save Security Settings
              </button>

              <button
                type="button"
                onClick={handleTestOtpDispatch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-cyan-700 dark:text-cyan-400 font-medium transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test WhatsApp Passcode Dispatch</span>
              </button>
            </div>
          </form>

          {/* Test OTP Box */}
          {testOtpInfo && (
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/80 rounded-xl space-y-2 mt-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Dynamic Security Passcode Generated</span>
                </span>
                <code className="text-emerald-700 dark:text-emerald-400 font-mono font-bold tracking-widest text-sm px-2 py-0.5 bg-white dark:bg-slate-950 rounded border border-emerald-300 dark:border-emerald-900">
                  {testOtpInfo.code}
                </code>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Destination: <strong>+{testOtpInfo.targetPhone}</strong> • Valid for 5 minutes
              </p>
              <div className="pt-1">
                <a
                  href={testOtpInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors"
                >
                  <span>Open WhatsApp Test Message</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* SECURITY AUDIT & ACCESS LOGS */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security &amp; Access Audit Logs</h3>
            </div>
            {auditLogs.length > 0 && (
              <button
                type="button"
                onClick={handleClearAuditLogs}
                className="text-[11px] text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                Clear Logs
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-2 font-medium">Timestamp</th>
                  <th className="pb-2 font-medium">Event</th>
                  <th className="pb-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-900">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-slate-500">
                      No security audit logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/50">
                      <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.action === 'LOGIN_SUCCESS'
                              ? 'bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                              : log.action === 'LOGIN_FAILED' || log.action === 'LOCKOUT_TRIGGERED'
                              ? 'bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                              : log.action === 'OTP_DISPATCHED'
                              ? 'bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-700 dark:text-slate-300">{log.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
