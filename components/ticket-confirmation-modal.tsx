"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Download } from "lucide-react"

interface TicketConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  email: string
}

export function TicketConfirmationModal({
  isOpen,
  onClose,
  eventName,
  email,
}: TicketConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-green-700">Registration Successful!</DialogTitle>
          <DialogDescription className="text-base mt-4 text-gray-700">
            Your ticket has been sent to <span className="font-semibold text-gray-900">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-3">Next Steps:</h3>
            <ol className="text-sm text-gray-700 space-y-2 text-left">
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">1</span>
                <span>Check your email for your unique ticket QR code</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">2</span>
                <span>Save the email or take a screenshot of the QR code</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">3</span>
                <span>Show your QR code at the {eventName} venue entrance</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">4</span>
                <span>Staff will scan your ticket to verify entry</span>
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your ticket QR code can only be scanned once. Please make sure to have it ready when you arrive at the event.
            </p>
          </div>

          <Button 
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
