import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    // TODO: Uncomment and configure when you have Firebase set up
    /*
    import { db } from '@/lib/firebase';
    import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

    // Check if email already exists
    const subscribersRef = collection(db, 'newsletter_subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This email is already subscribed to our newsletter.' 
        },
        { status: 400 }
      );
    }

    // Add new subscriber
    await addDoc(subscribersRef, {
      email,
      source,
      subscribedAt: new Date(),
      status: 'active',
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });
    */

    // For now, we'll simulate a successful signup
    console.log('Newsletter signup:', { 
      email, 
      source, 
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
    
    // TODO: Send welcome email
    // Example with SendGrid, Resend, or similar service:
    /*
    await sendWelcomeEmail(email, {
      name: 'Yrdly Newsletter',
      subject: 'Welcome to Yrdly Newsletter!',
      template: 'welcome'
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.' 
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
