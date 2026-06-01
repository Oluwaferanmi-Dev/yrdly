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
        <div className="glass rounded-[1.5rem] px-8 py-3 flex items-center justify-between border-white/20 shadow-premium">
          <Link href="/" className="flex items-center space-x-3 group transition-smooth">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-green-600/20 overflow-hidden">
              <img src="/favicon.ico" alt="Yrdly Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              yrdly<span className="text-green-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-gray-50/50 rounded-2xl p-1.5 border border-gray-100">
            {[
              { label: "Home", path: "/", id: "home" },
              { label: "Events", path: "/events", id: "events" },
              { label: "About Us", path: "/about", id: "about" },
              { label: "Learn More", path: "/learn-more", id: "learn-more" },
              { label: "Contact", path: "/contact", id: "contact" },
            ].map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentPage === item.id 
                    ? "bg-white text-green-600 shadow-sm ring-1 ring-gray-100" 
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'}/marketplace`} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <Button className="h-10 px-6 bg-gray-900 hover:bg-green-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-gray-900/10 transition-all active:scale-95">
                Open App
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
