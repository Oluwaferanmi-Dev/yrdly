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

export async function sendWelcomeEmail({ email, name, source }: EmailData) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    // Email configuration
    sendSmtpEmail.subject = "Welcome to Yrdly Newsletter! 🎉";
    sendSmtpEmail.sender = { 
      name: "Yrdly Team", 
      email: "noreply@yrdly.com" 
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
                <a href="https://yrdly-app.vercel.app/" 
                   style="background-color: #16a34a; color: white; padding: 12px 30px; 
                          text-decoration: none; border-radius: 6px; font-weight: bold; 
                          display: inline-block;">
                  Explore Yrdly Now
                </a>
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
      messageId: data.messageId,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true, 
      messageId: data.messageId,
      data 
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
    
    console.log('Brevo SMS sent successfully:', {
      phoneNumber,
      messageId: data.messageId,
      timestamp: new Date().toISOString()
    });
    
    return { success: true, messageId: data.messageId };
    
  } catch (error) {
    console.error('Brevo SMS error:', error);
    return { success: false, error };
  }
}
