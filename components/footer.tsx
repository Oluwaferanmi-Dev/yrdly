"use client"

import Link from "next/link"
import { Twitter, Instagram, Mail } from 'lucide-react'

const footerLinks = [
  {
    title: "Features",
    links: [
      { label: "SafePay", href: "#" },
      { label: "Marketplace", href: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'}/marketplace` },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Menu",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Learn More", href: "/learn-more" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

const MARQUEE_TEXT = "Make Sales. Make Space."

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-white overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Brand + Newsletter */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group transition-smooth">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-brand/20 overflow-hidden">
                <img src="/favicon.ico" alt="Yrdly Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-display font-extrabold text-3xl tracking-tight text-white">
                yrdly<span className="text-brand">.</span>
              </span>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Just like your local market, but safer. A community-driven commerce platform built for trust.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Stay in the loop</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, href: "https://x.com/yrdlyapp", label: "X (Twitter)" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/yardly.ng", label: "Instagram" },
                { icon: <Mail className="w-4 h-4" />, href: "mailto:yrdly@gmail.com", label: "Email" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white hover:border-brand transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5" />
      </div>

      {/* Scrolling Marquee Strip */}
      <div className="py-6 border-t border-white/5 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white/10 whitespace-nowrap px-8"
            >
              {i % 2 === 0 ? "Make Sales." : "Make Space."}&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 px-6 py-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-medium">
            © 2026 Yrdly Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-gray-600 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
