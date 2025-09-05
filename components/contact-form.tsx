"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/hooks/use-contact-form';
import { CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { isLoading, isSuccess, error, message, submitContact, reset } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    await submitContact(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset state when user starts typing
    if (isSuccess || error) {
      reset();
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`${error ? 'border-red-500 focus:border-red-500' : ''} ${isSuccess ? 'border-green-500 focus:border-green-500' : ''}`}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`${error ? 'border-red-500 focus:border-red-500' : ''} ${isSuccess ? 'border-green-500 focus:border-green-500' : ''}`}
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`${error ? 'border-red-500 focus:border-red-500' : ''} ${isSuccess ? 'border-green-500 focus:border-green-500' : ''}`}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us how we can help you..."
            value={formData.message}
            onChange={handleInputChange}
            disabled={isLoading}
            rows={6}
            className={`resize-none ${error ? 'border-red-500 focus:border-red-500' : ''} ${isSuccess ? 'border-green-500 focus:border-green-500' : ''}`}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={isLoading || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>
      </form>

      {/* Success Message */}
      {isSuccess && message && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800 text-sm">{message}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
