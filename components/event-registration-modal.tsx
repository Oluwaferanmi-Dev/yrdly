"use client"

import { useState } from "react"
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
import { Loader2, Ticket } from "lucide-react"
import { TicketConfirmationModal } from "@/components/ticket-confirmation-modal"

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  eventName: string
  isSoldOut?: boolean
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventName,
  isSoldOut,
}: EventRegistrationModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState("")

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

      if (data.success) {
        setConfirmationEmail(email)
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <Ticket className="w-5 h-5" />
              <span className="font-semibold uppercase tracking-wider text-xs">Event Registration</span>
            </div>
            <DialogTitle className="text-2xl font-bold">Attend {eventName}</DialogTitle>
            <DialogDescription>
              Enter your email to receive your unique event ticket and QR code.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Ticket...
                  </>
                ) : (
                  "Get My Ticket"
                )}
              </Button>
            </DialogFooter>
          </form>
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
      />
    </>
  )
}
