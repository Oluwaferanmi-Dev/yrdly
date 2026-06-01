'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseAuthClient } from '@/lib/supabase-auth-client';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng';

// Inner component that uses useSearchParams — must be inside <Suspense>
function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabaseAuthClient) {
        setStatus('error');
        setMessage('Authentication is not configured.');
        return;
      }

      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (errorParam) {
        setStatus('error');
        setMessage(errorDescription || 'Authentication was denied.');
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authentication code found. Please try again.');
        return;
      }

      try {
        // Exchange code → session. The shared cookie storage adapter in
        // supabaseAuthClient persists the session on .yrdly.ng automatically.
        const { data, error } = await supabaseAuthClient.auth.exchangeCodeForSession(code);

        if (error) {
          setStatus('error');
          setMessage(error.message || 'Failed to complete sign in.');
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Sign in successful! Redirecting...');
          setTimeout(() => {
            window.location.href = `${APP_URL}/home`;
          }, 1000);
        } else {
          setStatus('error');
          setMessage('Session could not be established. Please try again.');
        }
      } catch {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        {/* Logo */}
        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-600/20">
          <img src="/favicon.ico" alt="Yrdly" className="w-8 h-8 object-contain" />
        </div>

        {status === 'loading' && (
          <>
            <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">{message}</h2>
            <p className="text-sm text-gray-400 mt-2">Setting up your neighborhood session…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">You're in!</h2>
            <p className="text-sm text-gray-400 mt-2">Taking you to your neighborhood…</p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Sign In Failed</h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full h-11 bg-gray-900 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Loading skeleton shown while CallbackHandler is being streamed
function CallbackSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-600/20">
          <img src="/favicon.ico" alt="Yrdly" className="w-8 h-8 object-contain" />
        </div>
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Signing you in…</h2>
        <p className="text-sm text-gray-400 mt-2">Just a moment</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackSkeleton />}>
      <CallbackHandler />
    </Suspense>
  );
}
