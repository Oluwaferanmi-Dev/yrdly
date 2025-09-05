import { useState } from 'react';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  message: string | null;
}

export function useContactForm() {
  const [state, setState] = useState<ContactState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    message: null,
  });

  const submitContact = async (formData: ContactFormData) => {
    // Reset state
    setState({
      isLoading: true,
      isSuccess: false,
      error: null,
      message: null,
    });

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      
      // Make API request
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setState({
        isLoading: false,
        isSuccess: true,
        error: null,
        message: data.message || 'Message sent successfully! We\'ll get back to you soon.',
      });

    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0]?.message || 'Please check your input';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
        message: null,
      });
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      message: null,
    });
  };

  return {
    ...state,
    submitContact,
    reset,
  };
}
