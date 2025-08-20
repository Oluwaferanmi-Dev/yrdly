import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Yrdly Privacy Policy</h1>
        <p className="text-center text-gray-500 mb-8">Last updated: August 20, 2025</p>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p className="mb-4">At Yrdly, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">1. Information We Collect</h2>
              <p>When you use Yrdly, we may collect:</p>
              <ul className="list-disc list-inside pl-4">
                <li><strong>Account details:</strong> Name, email, phone number, and profile information you provide.</li>
                <li><strong>Usage data:</strong> Listings you create, events you attend, items you purchase, and how you interact with the app.</li>
                <li><strong>Device information:</strong> IP address, browser type, and device identifiers, used to help keep your account secure.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Enable core features such as creating listings, purchasing items, and joining events.</li>
                <li>Personalize your experience and suggest content relevant to your neighborhood.</li>
                <li>Improve our services through analytics and user feedback.</li>
                <li>Communicate with you about updates, promotions, or customer support.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">3. Sharing of Information</h2>
              <p>We do not sell your personal data.</p>
              <p>We may share information only with:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Trusted service providers who support our platform (e.g., hosting, payment processing).</li>
                <li>Law enforcement or legal authorities, if required by law.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">4. Data Security</h2>
              <p>We use industry-standard measures to protect your data. However, no system is 100% secure, so we also encourage you to keep your login details private.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">5. Your Choices</h2>
              <p>You can:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Update or delete your account information in your profile settings.</li>
                <li>Opt out of promotional emails by clicking the “unsubscribe” link.</li>
                <li>Contact us if you want your account permanently deleted.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">6. Children’s Privacy</h2>
              <p>Yrdly is not intended for children under 13.</p>
              <p>We do not knowingly collect personal data from minors.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">7. Updates to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated “Last updated” date.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">8. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please reach out to us:</p>
              <p>📩 <a href="mailto:yardlyng234@gmail.com" className="text-blue-600 hover:underline">yardlyng234@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;