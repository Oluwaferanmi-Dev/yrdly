"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletter } from '@/hooks/use-newsletter';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSignupProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  source?: string;
}

export function NewsletterSignup({ 
  placeholder = "Enter your email to sign up for our Newsletter",
  buttonText = "Sign Up",
  className = "",
  source = "newsletter-signup"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const { isLoading, isSuccess, error, message, subscribe, reset } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    await subscribe(email.trim(), source);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Reset state when user starts typing
    if (isSuccess || error) {
      reset();
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Input 
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          className={`flex-1 h-14 bg-white text-gray-900 placeholder:text-gray-500 ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${isSuccess ? 'border-green-500 focus:border-green-500' : ''}`}
          required
        />
        <Button 
          type="submit"
          disabled={isLoading || !email.trim()}
          className="bg-green-600 hover:bg-green-700 h-14 px-8 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing Up...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>

      {/* Success Message */}
      {isSuccess && message && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800 text-sm">{message}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
