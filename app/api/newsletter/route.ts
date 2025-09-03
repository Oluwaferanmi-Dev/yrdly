import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/brevo-email';

// Validation schema for newsletter signup
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('newsletter-signup'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    const { email, source } = validatedData;

    // Here you would typically:
    // 1. Save to your database (Firebase Firestore, PostgreSQL, etc.)
    // 2. Send to email service provider (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // Log the signup
    console.log('Newsletter signup:', { email, source, timestamp: new Date().toISOString() });
    
    // Send welcome email via Brevo
    const emailResult = await sendWelcomeEmail({
      email,
      source,
      name: undefined // You can add name field later if needed
    });
    
    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Don't fail the signup if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter! Check your email for a welcome message.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to subscribe. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
