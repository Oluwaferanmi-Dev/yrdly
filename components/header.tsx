"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'About Us', href: '/about' },
    { label: 'Learn More', href: '/learn-more' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Yrdly Logo" className="h-14 w-auto drop-shadow-sm hover:scale-105 transition-transform" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-raleway font-medium transition-colors ${
                  currentPage === link.label.toLowerCase().replace(/\s+/g, '-') 
                    ? 'text-[#82DB7E]' 
                    : 'text-foreground/80 hover:text-[#82DB7E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="https://app.yrdly.ng" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-raleway font-semibold">
                Open App
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block py-2 text-sm font-raleway font-medium ${
                  currentPage === link.label.toLowerCase().replace(/\s+/g, '-') 
                    ? 'text-[#82DB7E]' 
                    : 'text-foreground/80 hover:text-[#82DB7E]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="https://app.yrdly.ng" target="_blank" rel="noopener noreferrer" className="block mt-4">
              <Button className="w-full bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-raleway font-semibold">
                Open App
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
