'use client';

import { useState } from 'react';
import { supabaseAuthClient } from '@/lib/supabase-auth-client';
import { Loader2, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export function HeroLoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Use the env var for the app URL, fallback to localhost for testing
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://app.yrdly.localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseAuthClient) {
      setError('Authentication is not configured properly.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabaseAuthClient.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });
        
        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }
        
        // If successful, immediately redirect to app
        window.location.href = `${APP_URL}/onboarding`;
      } else {
        const { error: signInError } = await supabaseAuthClient.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        // If successful, redirect to app feed
        window.location.href = `${APP_URL}/home`;
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-sans">
          {isSignUp ? 'Join your neighborhood' : 'Welcome back'}
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-sans">
          {isSignUp ? 'Connect with your neighbors today.' : 'Sign in to see what is happening locally.'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
              className="w-full h-12 pl-4 pr-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
            />
          </div>
        )}

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
          />
        </div>

        <div className="relative">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 bg-[#388E3C] hover:bg-[#2e7d32] text-white font-medium rounded-xl transition-colors flex items-center justify-center font-sans shadow-sm disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            isSignUp ? 'Sign Up' : 'Log In'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center font-sans">
        <p className="text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#388E3C] font-semibold hover:underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
