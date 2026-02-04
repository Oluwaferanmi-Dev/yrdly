import * as brevo from '@getbrevo/brevo';

async function diagnostic() {
  const apiKey = process.env.BREVO_API_KEY;
  console.log('--- Brevo Diagnostic ---');
  console.log('API Key detected:', apiKey ? 'YES (starts with ' + apiKey.substring(0, 10) + '...)' : 'NO');
  
  if (!apiKey) {
    console.error('ERROR: BREVO_API_KEY is missing from environment.');
    console.log('Please run this with: node --env-file=.env scripts/test-brevo.mjs');
    return;
  }

  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Brevo Diagnostic Test";
  sendSmtpEmail.sender = { 
    name: "Yrdly Test", 
    email: "noreply@yrdly.ng" 
  };
  sendSmtpEmail.to = [{ email: "thesaintszn@gmail.com", name: "Test Recipient" }];
  sendSmtpEmail.htmlContent = "<html><body><h1>Diagnostic Test</h1><p>If you see this, the API key and sender are valid.</p></body></html>";

  try {
    console.log('Attempting to send test email from noreply@yrdly.ng...');
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('SUCCESS!');
    console.log('Message ID:', result.body.messageId);
  } catch (error) {
    console.error('FAILED TO SEND EMAIL');
    if (error.response && error.response.body) {
      console.error('Status Code:', error.response.statusCode);
      console.error('Response Body:', JSON.stringify(error.response.body, null, 2));
    } else {
      console.error('Error:', error.message || error);
    }
  }
}

diagnostic();
