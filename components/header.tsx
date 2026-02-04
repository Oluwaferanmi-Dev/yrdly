"use client"

import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const navLinks = [
    { href: "/", label: "Home", isActive: currentPage === "home" },
    { href: "/events", label: "Events", isActive: currentPage === "events" },
    { href: "/about", label: "About Us", isActive: currentPage === "about" },
    { href: "/learn-more", label: "Learn More", isActive: currentPage === "learn-more" },
    { href: "/coming-soon", label: "Coming Soon", isActive: currentPage === "coming-soon" },
    { href: "/contact", label: "Contact Us", isActive: currentPage === "contact" },
  ];

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

      <MobileNav links={navLinks} />
    </nav>
  );
}
