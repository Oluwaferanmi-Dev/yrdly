import React from 'react';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">YRDLY – TERMS AND CONDITIONS</h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p className="mb-4">Welcome to Yrdly. These Terms and Conditions (“Terms”) govern your use of the Yrdly web application (the “App”). By creating an account or using the App, you agree to be legally bound by these Terms.</p>
          <p className="mb-6">Please read them carefully before using the App.</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">1. Eligibility</h2>
              <p>You must be at least 18 years old to use Yrdly.</p>
              <p>By accessing or using the App, you confirm that you meet this requirement.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">2. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
              <p>You agree to provide accurate, complete, and up-to-date information when creating your profile.</p>
              <p>You may not create false, misleading, or duplicate accounts.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">3. Verified Profiles</h2>
              <p>Yrdly offers a verified profile status to enhance user safety.</p>
              <p>You are strongly advised to interact primarily with verified profiles.</p>
              <p>Verification involves additional checks as determined by Yrdly, but we do not guarantee the authenticity, conduct, or intentions of any verified profile.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Engage in fraud, scams, or misrepresentation.</li>
                <li>Use the App for any unlawful purpose.</li>
                <li>Harass, abuse, or harm other users.</li>
                <li>Post, transmit, or share offensive, misleading, or prohibited content.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">5. Fraud and Disputes</h2>
              <p>Yrdly is not liable for any fraudulent activity, scams, or losses suffered by users.</p>
              <p>If you believe you have been defrauded:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Contact your local law enforcement agency (e.g., police or relevant authority) immediately.</li>
                <li>Upon request by law enforcement, Yrdly may provide relevant user information or communication logs, subject to applicable privacy laws.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">6. Disclaimers</h2>
              <p>The App is provided “as is” and “as available.”</p>
              <p>We make no guarantees regarding the accuracy or reliability of user profiles.</p>
              <p>We do not screen all users and cannot guarantee their behavior or intentions.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Yrdly is not liable for any indirect, incidental, special, or consequential damages.</li>
                <li>Yrdly is not responsible for interactions between users or for any harm resulting from such interactions.</li>
                <li>Our total liability for any claim relating to the App shall not exceed the amount you have paid us, if any, in the twelve (12) months prior to the claim.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">8. Privacy</h2>
              <p>Your information will be collected, used, and stored in accordance with our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
              <p>By using the App, you consent to the collection and use of your data as described in that policy.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">9. Termination</h2>
              <p>We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct harmful to the community or platform.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">10. Modifications</h2>
              <p>We may update these Terms from time to time.</p>
              <p>Changes will be communicated via email or in-app notifications.</p>
              <p>Continued use of the App after updates constitutes acceptance of the revised Terms.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">11. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to conflict of law principles.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">12. Contact Us</h2>
              <p>If you have any questions or need assistance, please contact us at:</p>
              <p>Email: <a href="mailto:support@yrdly.ng" className="text-blue-600 hover:underline">support@yrdly.ng</a></p>
              <p>Support: <a href="mailto:support@yrdly.ng" className="text-blue-600 hover:underline">support@yrdly.ng</a></p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">By clicking “Agree” or creating an account, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
