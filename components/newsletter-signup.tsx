"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletter } from '@/hooks/use-newsletter';
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface NewsletterSignupProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  source?: string;
}

export function NewsletterSignup({ 
  placeholder = "Join our neighborhood circle",
  buttonText = "Subscribe",
  className = "",
  source = "newsletter-signup"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const { isLoading, isSuccess, error, message, subscribe, reset } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await subscribe(email.trim(), source);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isSuccess || error) reset();
  };

  return (
    <div className={`${className} animate-fade-in`}>
      <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
        <div className="flex items-center bg-white rounded-xl shadow-premium border border-gray-100 p-1.5 focus-within:border-green-200 transition-all">
          <Input 
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
            className="flex-1 h-12 bg-transparent border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400 font-medium px-4 text-sm"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading || !email.trim()}
            className="bg-green-600 hover:bg-green-700 text-white h-12 px-6 rounded-lg font-black uppercase tracking-widest text-[10px] shadow-sm transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 group whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {buttonText}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        <div className="absolute -bottom-12 left-0 right-0 overflow-hidden">
          {isSuccess && message && (
            <div className="flex items-center justify-center gap-2 text-green-600 animate-slide-up">
              <CheckCircle className="w-4 h-4" />
              <p className="text-xs font-black uppercase tracking-widest leading-none">{message}</p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 animate-slide-up">
              <AlertCircle className="w-4 h-4" />
              <p className="text-xs font-black uppercase tracking-widest leading-none">{error}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
