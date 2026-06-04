"use client"

import Link from "next/link"
import MobileNav from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-smooth px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] px-8 py-3 flex items-center justify-between border border-[var(--color-border-default)] shadow-sm">
          <Link href="/" className="flex items-center space-x-3 group transition-smooth">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-brand/20 overflow-hidden">
              <img src="/favicon.ico" alt="Yrdly Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-[var(--color-text-primary)]">
              yrdly<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", path: "/", id: "home" },
              { label: "How it Works", path: "/#how-it-works", id: "how-it-works" },
              { label: "FAQ", path: "/#faq", id: "faq" },
            ].map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  currentPage === item.id 
                    ? "bg-brand/10 text-brand" 
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'}/marketplace`} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <Button className="btn-primary py-2 px-6 h-auto">
                Shop Now
              </Button>
            </Link>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
