import React, { useState } from 'react';
import { X, User, Check, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { user, isAuthenticated, login, logout, switchUser, availableUsers, isAuthModalOpen, closeAuthModal } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await login(email, mode === 'register' ? name : undefined);
    setEmail('');
    setName('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden p-6 transition-all"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--card-shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg cursor-pointer hover:opacity-70 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isAuthenticated && user ? (
          /* User Profile View */
          <div className="space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: 'var(--accent-primary)' }}
              />
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  {user.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {user.email}
                </p>
                <span
                  className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  {user.role} tier
                </span>
              </div>
            </div>

            {/* Quick Demo Switcher */}
            <div
              className="p-3.5 rounded-xl border space-y-2 text-xs"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                <span>Switch Test Persona (Node.js/Mongo Auth)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {availableUsers.map((u) => (
                  <button
                    key={u._id}
                    type="button"
                    onClick={() => switchUser(u._id)}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      user._id === u._id ? 'font-bold ring-1' : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: user._id === u._id ? 'var(--accent-primary)' : 'var(--border-strong)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <p className="text-xs truncate">{u.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{u.role}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-rose-500 hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

              <button
                type="button"
                onClick={closeAuthModal}
                className="py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)'
                }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Form */
          <div className="space-y-5">
            <div>
              <h2 id="auth-modal-title" className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {mode === 'signin' ? 'Sign in to Aura' : 'Create an Account'}
              </h2>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Save shipping addresses, track MongoDB orders, and access member perks.
              </p>
            </div>

            {/* Quick Demo Switcher Tabs */}
            <div
              className="p-3 rounded-xl border space-y-2 text-xs"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Instant 1-Click Login:
              </span>
              <div className="flex gap-2">
                {availableUsers.map((u) => (
                  <button
                    key={u._id}
                    type="button"
                    onClick={() => {
                      login(u.email);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {u.name.split(' ')[0]} ({u.role})
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.chen@fullstack.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="demo12345"
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none font-mono"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold cursor-pointer transition-all hover:opacity-90 active:scale-98 shadow-sm"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                  boxShadow: '0 4px 14px var(--accent-glow)'
                }}
              >
                {mode === 'signin' ? 'Sign In' : 'Create Free Account'}
              </button>
            </form>

            <div className="text-center text-xs">
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                className="hover:underline cursor-pointer font-medium"
                style={{ color: 'var(--accent-primary)' }}
              >
                {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already registered? Sign In'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
