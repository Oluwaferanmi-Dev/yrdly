import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Privacy Policy Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="prose prose-lg max-w-none">
            <p>This is a placeholder for the Privacy Policy page. Please provide the content for this page.</p>
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
