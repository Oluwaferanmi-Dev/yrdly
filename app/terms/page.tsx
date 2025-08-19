import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"

export default function TermsPage() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "#", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-4">
            <Image
              src="/yrdly-logo.png"
              alt="YRDLY Logo"
              width={62}
              height={44}
            />
          </div>
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm text-gray-900 hover:text-green-600 ${link.isActive ? 'font-semibold' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <MobileNav links={navLinks} />
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
          Join
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[260px] flex items-center justify-center" style={{
        background: `linear-gradient(rgba(26, 42, 48, 0.9), rgba(26, 42, 48, 0.9)), url('/about-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight">
            Terms and Conditions
          </h1>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="prose prose-lg max-w-none">
            <p>Welcome to Yrdly. These Terms and Conditions (“Terms”) govern your use of the Yrdly web application (the “App”). By creating an account or using the App, you agree to be legally bound by these Terms.</p>
            <p>Please read them carefully before using the App.</p>

            <h2>1. Eligibility</h2>
            <p>You must be at least 18 years old to use Yrdly.</p>
            <p>By accessing or using the App, you confirm that you meet this requirement.</p>

            <h2>2. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
            <p>You agree to provide accurate, complete, and up-to-date information when creating your profile.</p>
            <p>You may not create false, misleading, or duplicate accounts.</p>

            <h2>3. Verified Profiles</h2>
            <p>Yrdly offers a verified profile status to enhance user safety.</p>
            <p>You are strongly advised to interact primarily with verified profiles.</p>
            <p>Verification involves additional checks as determined by Yrdly, but we do not guarantee the authenticity, conduct, or intentions of any verified profile.</p>

            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Engage in fraud, scams, or misrepresentation.</li>
              <li>Use the App for any unlawful purpose.</li>
              <li>Harass, abuse, or harm other users.</li>
              <li>Post, transmit, or share offensive, misleading, or prohibited content.</li>
            </ul>

            <h2>5. Fraud and Disputes</h2>
            <p>Yrdly is not liable for any fraudulent activity, scams, or losses suffered by users.</p>
            <p>If you believe you have been defrauded:</p>
            <ul>
              <li>Contact your local law enforcement agency (e.g., police or relevant authority) immediately.</li>
              <li>Upon request by law enforcement, Yrdly may provide relevant user information or communication logs, subject to applicable privacy laws.</li>
            </ul>

            <h2>6. Disclaimers</h2>
            <p>The App is provided “as is” and “as available.”</p>
            <p>We make no guarantees regarding the accuracy or reliability of user profiles.</p>
            <p>We do not screen all users and cannot guarantee their behavior or intentions.</p>

            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul>
              <li>Yrdly is not liable for any indirect, incidental, special, or consequential damages.</li>
              <li>Yrdly is not responsible for interactions between users or for any harm resulting from such interactions.</li>
              <li>Our total liability for any claim relating to the App shall not exceed the amount you have paid us, if any, in the twelve (12) months prior to the claim.</li>
            </ul>

            <h2>8. Privacy</h2>
            <p>Your information will be collected, used, and stored in accordance with our <Link href="/privacy-policy"><a>Privacy Policy</a></Link>.</p>
            <p>By using the App, you consent to the collection and use of your data as described in that policy.</p>

            <h2>9. Termination</h2>
            <p>We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct harmful to the community or platform.</p>

            <h2>10. Modifications</h2>
            <p>We may update these Terms from time to time.</p>
            <p>Changes will be communicated via email or in-app notifications.</p>
            <p>Continued use of the App after updates constitutes acceptance of the revised Terms.</p>

            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Insert jurisdiction], without regard to conflict of law principles.</p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions or need assistance, please contact us at:</p>
            <p>Email: yardlyng234@gmail.com</p>
            <p>Support: yardlyng234@gmail.com</p>

            <p>By clicking “Agree” or creating an account, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <Link href="/about" className="text-sm font-bold text-gray-900 hover:text-green-600">About Us</Link>
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">Contact Us</Link>
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">Help Center</Link>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs font-bold text-gray-900">
              © 2025 Yrdly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-900 hover:text-green-600 underline">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-900 hover:text-green-600 underline">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
