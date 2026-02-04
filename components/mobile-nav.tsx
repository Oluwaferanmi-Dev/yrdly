"use client"
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Calendar, Info, BookOpen, Clock, Mail, ChevronRight } from 'lucide-react'; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navIcons: Record<string, React.ReactNode> = {
  "Home": <Home className="w-5 h-5" />,
  "Events": <Calendar className="w-5 h-5" />,
  "About Us": <Info className="w-5 h-5" />,
  "Learn More": <BookOpen className="w-5 h-5" />,
  "Coming Soon": <Clock className="w-5 h-5" />,
  "Contact Us": <Mail className="w-5 h-5" />,
};

export default function MobileNav({ links }: { links: { href: string; label: string; isActive?: boolean }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-green-100 hover:text-green-600 transition-all duration-300 rounded-lg"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96 p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-gradient-to-b from-white via-green-50/30 to-white">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <p className="text-xs text-gray-500 mt-1">Navigate Yrdly</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    link.isActive 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={link.isActive ? 'text-white' : 'text-gray-500 group-hover:text-green-600'}>
                    {navIcons[link.label]}
                  </span>
                  <span className="flex-1 font-medium text-sm">{link.label}</span>
                  {link.isActive ? (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors" />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer CTA */}
          <div className="px-6 py-5 border-t border-gray-100 bg-gradient-to-t from-green-50 to-transparent">
            <Link href="/coming-soon" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30">
                Join Yrdly
              </Button>
            </Link>
            <p className="text-xs text-gray-500 text-center mt-3">
              Be part of your neighborhood
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
