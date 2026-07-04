"use client";

import Link from "next/link";
import { Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-12 font-worksans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Yrdly Logo" className="h-16 w-auto drop-shadow-sm hover:scale-105 transition-transform" />
            </Link>
            <p className="text-sm text-muted-foreground font-worksans">
              Your estate & street, connected.
            </p>
            <div className="flex gap-4">
              <Link href="https://x.com/yrdlyapp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.instagram.com/yardly.ng" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="mailto:yrdly@gmail.com" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-raleway font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm font-worksans">
              <li><Link href="/" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Features</Link></li>
              <li><Link href="https://app.yrdly.ng/marketplace" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Marketplace</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Events</Link></li>
              <li><Link href="/learn-more" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Safety</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-raleway font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm font-worksans">
              <li><Link href="/about" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Careers</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Blog</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-raleway font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm font-worksans">
              <li><Link href="/contact" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-[#82DB7E] transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground font-worksans">
          <p>&copy; {new Date().getFullYear()} Yrdly. All rights reserved. Built for Lagos, made with love.</p>
        </div>
      </div>
    </footer>
  );
}
