"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Ticket, CheckCircle2, ShieldCheck, Zap, Mail } from "lucide-react"
import { TicketConfirmationModal } from "@/components/ticket-confirmation-modal"

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  eventName: string
  isSoldOut?: boolean
}

type LoadingStep = "idle" | "validating" | "connecting" | "generating" | "finalizing";

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventName,
  isSoldOut,
}: EventRegistrationModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<LoadingStep>("idle")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState("")
  const [ticketData, setTicketData] = useState<{ticketId: string, qrCode: string} | null>(null)

  // Simulate loading steps for better UX feedback
  useEffect(() => {
    if (isLoading) {
      const steps: LoadingStep[] = ["validating", "connecting", "generating", "finalizing"];
      let currentStepIndex = 0;
      
      const interval = setInterval(() => {
        if (currentStepIndex < steps.length - 1) {
          currentStepIndex++;
          setLoadingStep(steps[currentStepIndex]);
        } else {
          clearInterval(interval);
        }
      }, 800);
      
      return () => clearInterval(interval);
    } else {
      setLoadingStep("idle");
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/events/register-v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          eventId,
          eventName,
        }),
      })

      const data = await response.json()
      console.log("[v0] Registration response data:", data)
      
      if (data.ticket) {
        console.log("[v0] Ticket generated successfully:", data.ticket.ticketId);
        if (data.ticket.qrCode) {
          console.log("[v0] QR Code data present (length):", data.ticket.qrCode.length);
        } else {
          console.warn("[v0] QR Code data missing from response!");
        }
      }

      // Small delay to ensure the user sees the final loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      if (data.success) {
        setConfirmationEmail(email)
        setTicketData({
          ticketId: data.ticket?.ticketId || "UNKNOWN",
          qrCode: data.ticket?.qrCode || ""
        })
        setShowConfirmation(true)
        setEmail("")
      } else {
        toast.error(data.message || "Failed to register. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Registration error:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case "validating": return "Verifying invitation...";
      case "connecting": return "Securing connection...";
      case "generating": return "Creating unique ticket...";
      case "finalizing": return "Ready to go!";
      default: return "Processing...";
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none glass rounded-[2.5rem] shadow-premium">
          <div className="relative p-8 md:p-10">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
            
            <DialogHeader className="relative text-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/20">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px] text-green-600">
                  Secure Entry
                </span>
              </div>
              <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                Join the <span className="text-green-600">Circle</span>
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-base leading-relaxed pt-2">
                Register for <span className="font-bold text-gray-900">{eventName}</span>. Your high-security ticket will be sent instantly.
              </DialogDescription>
            </DialogHeader>

            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-8 animate-scale-in">
                <div className="relative">
                  <div className="w-24 h-24 border-[6px] border-green-50 border-t-green-600 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {loadingStep === "validating" && <ShieldCheck className="w-8 h-8 text-green-600 animate-pulse" />}
                    {loadingStep === "connecting" && <Zap className="w-8 h-8 text-green-600 animate-pulse" />}
                    {loadingStep === "generating" && <Ticket className="w-8 h-8 text-green-600 animate-pulse" />}
                    {loadingStep === "finalizing" && <CheckCircle2 className="w-8 h-8 text-green-600" />}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-black text-gray-900 tracking-tight mb-1">{getLoadingMessage()}</p>
                  <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">{loadingStep}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 py-8 relative">
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                    Your Official Email
                  </label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      id="email"
                      placeholder="alex@neighborhood.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                      className="h-16 pl-14 pr-6 rounded-2xl bg-gray-50/50 border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all text-base font-medium placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 pt-4">
                  <Button 
                    type="submit" 
                    className="h-16 bg-gray-900 hover:bg-green-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-gray-900/10 hover:shadow-green-600/20 transition-all active:scale-95" 
                    disabled={isLoading}
                  >
                    Generate My Ticket
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={onClose} 
                    disabled={isLoading}
                    className="h-12 rounded-xl text-gray-400 hover:text-gray-600 font-bold"
                  >
                    Not this time
                  </Button>
                </div>
              </form>
            )}
            
            {/* Footer Trust Badge */}
            <div className="mt-4 pb-2 text-center">
              <p className="flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3 mr-1.5 text-green-500" />
                End-to-end encrypted validation
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TicketConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false)
          onClose()
        }}
        eventName={eventName}
        email={confirmationEmail}
        ticketId={ticketData?.ticketId || ""}
        qrCode={ticketData?.qrCode || ""}
      />
    </>
  )
}
