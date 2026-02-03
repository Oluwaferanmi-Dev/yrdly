import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey, 
  process.env.BREVO_API_KEY!
);

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
              <p>© 2025 Yrdly. All rights reserved.</p>
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
              <p>© 2025 Yrdly. All rights reserved.</p>
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
export async function sendTicketEmail({ email, name, eventName, ticketId, qrCodeDataUrl }: EmailData & { eventName: string, ticketId: string, qrCodeDataUrl: string }) {
  try {
    console.log('[v0] sendTicketEmail called with:', { email, name, eventName, ticketId, hasQR: !!qrCodeDataUrl });
    
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = `Your Ticket for ${eventName}`;
    sendSmtpEmail.sender = { 
      name: "Yrdly Team", 
      email: "noreply@yrdly.ng" 
    };
    sendSmtpEmail.to = [{ email, name: name || "Yrdly User" }];
    console.log('[v0] Email recipient set:', sendSmtpEmail.to);
    
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Ticket</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #16a34a;">
              <h1 style="color: #16a34a; margin: 0; font-size: 28px;">Event Ticket</h1>
              <p style="color: #666; margin: 10px 0 0 0;">Yrdly Events</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #333; margin-bottom: 20px;">You're attending ${eventName}!</h2>
              <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                Your ticket ID is: <strong>${ticketId}</strong>
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 250px; height: 250px;">
              </div>
              
              <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                Please show this QR code at the event entrance for check-in.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>© 2025 Yrdly. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    console.log('[v0] About to call apiInstance.sendTransacEmail');
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('[v0] API response received:', { hasData: !!data, messageId: (data.body as any)?.messageId });
    
    console.log('Ticket email sent:', { email, ticketId, messageId: (data.body as any).messageId });
    
    return { 
      success: true, 
      messageId: (data.body as any).messageId
    };
    
  } catch (error) {
    console.error('Ticket email error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
