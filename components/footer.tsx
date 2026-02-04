"use client"

import Link from "next/link"
import { Github, Twitter, Instagram, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Market Place", href: "/market" },
      { label: "Community", href: "/events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 overflow-hidden">
      {/* Top Section - Brand & Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-10">
            <Link href="/" className="flex items-center space-x-3 group transition-smooth">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-green-600/20 overflow-hidden">
                <img src="/favicon.ico" alt="Yrdly Logo" className="w-7 h-7 object-contain" />
              </div>
              <span className="font-black text-3xl tracking-tighter text-gray-900">
                yrdly<span className="text-green-600">.</span>
              </span>
            </Link>
            <p className="text-xl text-gray-500 font-medium max-w-sm leading-relaxed tracking-tight">
              Building the future of neighborhood commerce and community engagement.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/yrdly.ng" },
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:yrdly@gmail.com" },
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:scale-110 transition-all border border-gray-100"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-[13px] font-black text-gray-900 hover:text-green-600 hover:ml-1 transition-all flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            © 2026 YRDLY TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-green-600 transition-colors">
              Privacy Settings
            </Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-green-600 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
