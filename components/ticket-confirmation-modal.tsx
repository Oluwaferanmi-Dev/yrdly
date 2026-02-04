"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { CheckCircle2, Download, Ticket, Mail, Calendar, MapPin, Share2 } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface TicketConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  email: string
  ticketId: string
  qrCode: string
}

export function TicketConfirmationModal({
  isOpen,
  onClose,
  eventName,
  email,
  ticketId,
  qrCode,
}: TicketConfirmationModalProps) {
  const handleDownload = () => {
    if (!qrCode) {
      console.error("No QR code data found for download");
      toast.error("Ticket QR code not available.");
      return
    }
    
    try {
      // Split the data URL to get the content and type
      const parts = qrCode.split(';base64,')
      if (parts.length !== 2) throw new Error("Invalid base64 format");
      
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      
      const blob = new Blob([uInt8Array], { type: contentType })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `Ticket-${eventName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${ticketId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success("Ticket saved to device!")
    } catch (err) {
      console.error("Download failed, using fallback:", err)
      // Fallback to simple link click if blob fails
      const link = document.createElement('a')
      link.href = qrCode
      link.download = `Yrdly-Ticket-${ticketId}.png`
      link.click()
      toast.success("Ticket downloaded!")
    }
  }

  const handleShare = async () => {
    const text = `I'm going to ${eventName}! Get your tickets at yrdly.ng`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${eventName}`,
          text: text,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(text)
        toast.success("Link copied to clipboard! Share it anywhere.")
      } catch (err) {
        toast.error("Failed to share. Please copy the link manually.")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] p-0 !bg-transparent border-none shadow-none !ring-0 !outline-none">
        <VisuallyHidden>
          <DialogTitle>Ticket Confirmation: {eventName}</DialogTitle>
          <DialogDescription>Your registration for {eventName} is confirmed. Ticket ID: {ticketId}</DialogDescription>
        </VisuallyHidden>
        <div className="relative animate-scale-in">
          {/* Main Horizontal Ticket Container */}
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-premium flex flex-col md:flex-row h-auto md:h-[240px] border border-gray-100 mx-4 sm:mx-0">
            
            {/* Left Section - Event Info */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  <span className="text-[9px] uppercase font-black tracking-widest text-green-600">Verified Pass</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight line-clamp-2">{eventName}</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Owner</p>
                    <p className="text-xs font-bold text-gray-900 truncate">{email}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    className="flex-1 h-10 rounded-xl border-gray-100 font-bold text-[10px] uppercase tracking-wider hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                  >
                    <Download className="w-3.5 h-3.5 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className="flex-1 h-10 rounded-xl border-gray-100 font-bold text-[10px] uppercase tracking-wider hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                  >
                    <Share2 className="w-3.5 h-3.5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Perforated Divider (Vertical on desktop) */}
            <div className="relative w-full md:w-auto h-px md:h-full flex md:flex-col items-center justify-center py-4 md:py-0 px-0 md:px-4">
              <div className="absolute top-[-15px] left-1/2 md:left-auto md:top-[-15px] md:left-[-15px] w-8 h-8 bg-[#fafaf9] rounded-full shadow-inner z-10" />
              <div className="absolute bottom-[-15px] left-1/2 md:left-auto md:bottom-[-15px] md:left-[-15px] w-8 h-8 bg-[#fafaf9] rounded-full shadow-inner z-10" />
              <div className="w-full md:w-px h-px md:h-full border-t-2 md:border-l-2 border-dashed border-gray-100" />
            </div>

            {/* Right Section - QR Code Stub */}
            <div className="w-full md:w-[200px] bg-gray-50/50 p-6 flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-white border-2 border-dashed border-gray-100 rounded-2xl shadow-sm">
                {qrCode ? (
                  <img src={qrCode} alt="QR" className="w-24 h-24 block" />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center text-gray-200">
                    <Ticket className="w-10 h-10" />
                  </div>
                )}
              </div>
              <p className="text-[10px] font-mono font-black tracking-widest text-gray-400">{ticketId}</p>
              
              <Button 
                onClick={onClose}
                className="w-full h-10 bg-gray-900 hover:bg-green-600 text-white font-black text-xs rounded-xl shadow-lg shadow-gray-900/10 transition-all active:scale-95 mt-2"
              >
                Go Back
              </Button>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
