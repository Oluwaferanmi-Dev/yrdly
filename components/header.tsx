"use client"

import { Button } from "@/components/ui/button"
import { Home, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"

interface HeaderProps {
  currentPage?: string;
  showBackHome?: boolean;
}

export default function Header({ currentPage, showBackHome = false }: HeaderProps) {
  const navLinks = [
    { href: "/", label: "Home", isActive: currentPage === "home" },
    { href: "/events", label: "Events", isActive: currentPage === "events" },
    { href: "/about", label: "About Us", isActive: currentPage === "about" },
    { href: "/learn-more", label: "Learn More", isActive: currentPage === "learn-more" },
    { href: "/coming-soon", label: "Coming Soon", isActive: currentPage === "coming-soon" },
    { href: "/contact", label: "Contact Us", isActive: currentPage === "contact" },
  ];

  const renderNav = (variant: 'desktop' | 'mobile') => {
    if (variant === 'desktop') {
      return (
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-smooth relative py-1 ${
                link.isActive 
                  ? 'font-semibold text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {link.label}
              {link.isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      );
    }

    return <MobileNav links={navLinks} />;
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 glass border-b border-gray-100">
      <Link href="/" className="transition-smooth hover:opacity-80">
        <Image
          src="/yrdly-logo.png"
          alt="YRDLY Logo"
          width={56}
          height={40}
          className="md:w-[62px] md:h-[44px]"
          style={{ width: "auto", height: "auto" }}
        />
      </Link>

      {renderNav('desktop')}

      <div className="flex items-center gap-3 md:gap-4">
        {showBackHome ? (
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 px-2 md:px-4">
              <Home className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back Home</span>
            </Button>
          </Link>
        ) : (
          <Link href="/coming-soon" className="hidden md:block">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-5 md:px-6 h-10 rounded-full transition-smooth hover:shadow-lg hover:shadow-green-600/20">
              Join
            </Button>
          </Link>
        )}
        <div className="md:hidden">
          {renderNav('mobile')}
        </div>
      </div>
    </nav>
  );
}
