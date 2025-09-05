"use client"
import { useState } from "react";
import Link from "next/link";
import { Menu } from 'lucide-react'; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"; 

export default function MobileNav({ links }: { links: { href: string; label: string; isActive?: boolean }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
          {/* Header Section */}
          <div className="px-6 py-6 border-b border-gray-200 bg-white">
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">YRDLY</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">Navigate to any page</DialogDescription>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    link.isActive 
                      ? 'bg-green-50 text-green-700 border-l-4 border-green-600 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)} 
                >
                  <div className="flex items-center">
                    <span className="ml-2">{link.label}</span>
                    {link.isActive && (
                      <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer Section */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Yrdly App</p>
                <p className="text-xs text-gray-500">Community Platform</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
