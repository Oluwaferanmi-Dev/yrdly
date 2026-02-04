import * as brevo from '@getbrevo/brevo';

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  console.warn('WARNING: BREVO_API_KEY is not defined in environment variables.');
}

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();

if (BREVO_API_KEY) {
  console.log('[Brevo] Initializing with API key');
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey, 
    BREVO_API_KEY
  );
} else {
  console.error('[Brevo] ERROR: BREVO_API_KEY is missing');
}

export interface EmailData {
  email: string;
  name?: string;
  source?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendWelcomeEmail({ email, name, source }: EmailData) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    // Email configuration
    sendSmtpEmail.subject = "Welcome to Yrdly Newsletter! 🎉";
    sendSmtpEmail.sender = { 
      name: "Yrdly Team", 
      email: "noreply@yrdly.ng" 
    };
    sendSmtpEmail.to = [{ email, name: name || "Yrdly User" }];
    
    // HTML content
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Yrdly</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #16a34a;">
              <h1 style="color: #16a34a; margin: 0; font-size: 28px;">Welcome to Yrdly!</h1>
              <p style="color: #666; margin: 10px 0 0 0;">Your Neighborhood Network</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              <h2 style="color: #333; margin-bottom: 20px;">Thanks for joining our community! 🎉</h2>
              
              <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                Hi${name ? ` ${name}` : ''}! We're excited to have you as part of the Yrdly community. 
                You'll now receive updates about what's happening in your neighborhood.
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;">
                <h3 style="color: #16a34a; margin-top: 0;">What you'll receive:</h3>
                <ul style="color: #555; line-height: 1.8;">
                  <li>🏠 <strong>New local listings</strong> - Items for sale in your area</li>
                  <li>🎉 <strong>Community events</strong> - Meetups and local happenings</li>
                  <li>💰 <strong>Special deals</strong> - Exclusive offers from local businesses</li>
                  <li>📱 <strong>Platform updates</strong> - New features and improvements</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #16a34a; font-weight: bold; font-size: 18px;">
                  Stay tuned for the Yrdly app launch!
                </p>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.5;">
                <strong>Signup Source:</strong> ${source || 'Newsletter'}<br>
                <strong>Date:</strong> ${new Date().toLocaleDateString()}
              </p>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>© 2026 Yrdly. All rights reserved.</p>
              <p>
                <a href="https://yrdly.com/unsubscribe" style="color: #16a34a;">Unsubscribe</a> | 
                <a href="https://yrdly.com/privacy" style="color: #16a34a;">Privacy Policy</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('Brevo email sent successfully:', {
      email,
      source,
      messageId: (data.body as any).messageId,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true, 
      messageId: (data.body as any).messageId,
      data: data.body 
    };
    
  } catch (error) {
    console.error('Brevo email error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Optional: Send SMS notification (if you have SMS credits)
export async function sendWelcomeSMS(phoneNumber: string, name?: string) {
  try {
    const apiInstance = new brevo.TransactionalSMSApi();
    apiInstance.setApiKey(
      brevo.TransactionalSMSApiApiKeys.apiKey, 
      process.env.BREVO_API_KEY!
    );
    
    const sendTransacSms = new brevo.SendTransacSms();
    sendTransacSms.sender = "Yrdly";
    sendTransacSms.recipient = phoneNumber;
    sendTransacSms.content = `Welcome to Yrdly${name ? ` ${name}` : ''}! 🎉 Your neighborhood network is now connected. Check your email for more details.`;
    
    const data = await apiInstance.sendTransacSms(sendTransacSms);
    
    return { success: true, messageId: (data.body as any).messageId };
    
  } catch (error) {
    console.error('Brevo SMS error:', error);
    return { success: false, error };
  }
}

// Send contact form email to support team
export async function sendContactEmail({ name, email, subject, message }: ContactData) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    // Email configuration
    sendSmtpEmail.subject = `Contact Form: ${subject}`;
    sendSmtpEmail.sender = { 
      name: name || "Contact Form User", 
      email: email 
    };
    sendSmtpEmail.to = [{ email: "support@yrdly.ng", name: "Yrdly Support Team" }];
    sendSmtpEmail.replyTo = { email, name: name || "Contact Form User" };
    
    // HTML content
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
            <!-- Header -->
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #16a34a;">
              <h1 style="color: #16a34a; margin: 0; font-size: 24px;">Contact Form Message</h1>
              <p style="color: #666; margin: 10px 0 0 0;">From: ${name} (${email})</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #16a34a; margin-top: 0;">Contact Details</h3>
                <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #16a34a;">${email}</a></p>
                <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: ${subject || 'Your Yrdly Inquiry'}" 
                   style="background-color: #16a34a; color: white; padding: 12px 30px; 
                          text-decoration: none; border-radius: 6px; font-weight: bold; 
                          display: inline-block; margin-right: 10px;">
                  Reply to ${name}
                </a>
                <a href="https://yrdly.ng/admin/contacts" 
                   style="background-color: #6b7280; color: white; padding: 12px 30px; 
                          text-decoration: none; border-radius: 6px; font-weight: bold; 
                          display: inline-block;">
                  View in Admin
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #eee; padding: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>© 2026 Yrdly. All rights reserved.</p>
              <p>This message was sent via the Yrdly contact form by ${name} (${email})</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('Contact email sent successfully:', {
      from: email,
      to: 'support@yrdly.ng',
      name,
      subject,
      messageId: (data.body as any).messageId,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true, 
      messageId: (data.body as any).messageId,
      data: data.body 
    };
    
  } catch (error) {
    console.error('Contact email error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
// Send ticket email with QR code
export async function sendTicketEmail({ 
  email, 
  name, 
  eventName, 
  ticketId, 
  qrCodeDataUrl,
  qrCode // Handle the parameter name used in register-v2
}: EmailData & { 
  eventName: string, 
  ticketId: string, 
  qrCodeDataUrl?: string,
  qrCode?: string 
}) {
  try {
    const finalQrCode = qrCode || qrCodeDataUrl;

    if (!finalQrCode) {
      throw new Error('QR code data is missing');
    }

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not configured');
    }

    console.log('[v0] sendTicketEmail called for:', { email, eventName, ticketId });
    
    // Extract base64 content from Data URL (remove "data:image/png;base64," prefix)
    const base64Content = finalQrCode.split(',')[1];
    
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = `Your Ticket for ${eventName} - ${ticketId}`;
    sendSmtpEmail.sender = { 
      name: "Yrdly Team", 
      email: "noreply@yrdly.ng" 
    };
    sendSmtpEmail.to = [{ email, name: name || "Yrdly User" }];

    // Add QR Code as an inline attachment
    sendSmtpEmail.attachment = [{
      content: base64Content,
      name: 'ticket-qr.png'
    }];

    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Ticket</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #16a34a; padding: 32px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">YOUR TICKET</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Yrdly Community Events</p>
            </div>
            
            <div style="padding: 40px 32px; text-align: center;">
              <div style="margin-bottom: 32px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Event Details</p>
                <h2 style="color: #111827; margin: 8px 0 0 0; font-size: 20px; font-weight: 700;">${eventName}</h2>
              </div>
              
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; display: inline-block; margin-bottom: 32px;">
                <!-- Use CID for better email client compatibility -->
                <img src="cid:ticket-qr.png" alt="Ticket QR Code" style="width: 200px; height: 200px; display: block;">
                <div style="margin-top: 16px; border-top: 1px dashed #d1d5db; pt-16px;">
                   <p style="margin: 8px 0 0 0; font-family: monospace; font-size: 18px; color: #111827; font-weight: 700; letter-spacing: 0.1em;">${ticketId}</p>
                </div>
              </div>
              
              <div style="text-align: left; background-color: #fdf2f2; border-left: 4px solid #ef4444; padding: 16px; margin-bottom: 32px;">
                <p style="color: #b91c1c; margin: 0; font-size: 14px; line-height: 1.5;">
                  <strong>Important:</strong> Please show this QR code at the event entrance. This ticket is unique and can only be scanned once.
                </p>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 12px;">© 2026 Yrdly. Powered by neighborhood trust.</p>
              <div style="margin-top: 12px;">
                <a href="https://yrdly.ng" style="color: #16a34a; text-decoration: none; font-size: 12px; font-weight: 600;">Visit our website</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Ticket email sent:', { email, ticketId, messageId: (data.body as any).messageId });
    
    return { 
      success: true, 
      messageId: (data.body as any).messageId
    };
    
  } catch (error: any) {
    console.error('Ticket email error details:', {
      message: error.message,
      body: error.response?.body,
      statusCode: error.response?.statusCode
    });
    
    let errorMessage = error.message;
    if (error.response?.body?.message) {
      errorMessage = error.response.body.message;
    }
    
    return { 
      success: false, 
      error: errorMessage || 'Unknown error during email delivery'
    };
  }
}

// Store attendee email in Brevo as a contact
export async function addAttendeeContact({ email, name, eventName }: { email: string, name?: string, eventName: string }) {
  try {
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not configured');
    }

    const contactsApi = new brevo.ContactsApi();
    contactsApi.setApiKey(
      brevo.ContactsApiApiKeys.apiKey,
      BREVO_API_KEY
    );

    // Create or update contact
    const createContact = new brevo.CreateContact();
    createContact.email = email;
    createContact.attributes = {
      'FIRSTNAME': name || email.split('@')[0],
      'EVENT_NAME': eventName,
      'REGISTRATION_DATE': new Date().toISOString()
    };
    // Add to default list (usually ID 1 or 2) - allow failure if list doesn't exist
    createContact.listIds = [1]; 

    const data = await contactsApi.createContact(createContact);
    
    console.log('[v0] Attendee contact stored in Brevo:', { email, eventName, contactId: (data.body as any).id });
    
    return { 
      success: true, 
      contactId: (data.body as any).id
    };
    
  } catch (error: any) {
    // If contact already exists, that's okay - just log it
    if (error.response?.body?.code === 'duplicate_parameter') {
      console.log('[v0] Contact already exists in Brevo:', email);
      return { success: true, message: 'Contact already exists' };
    }
    
    console.error('[v0] Error storing attendee contact in Brevo:', {
      message: error.message,
      body: error.response?.body,
      statusCode: error.response?.statusCode
    });
    
    return { 
      success: false, 
      error: error.response?.body?.message || error.message || 'Unknown error'
    };
  }
}
