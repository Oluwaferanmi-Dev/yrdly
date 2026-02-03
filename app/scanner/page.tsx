"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2, ScanLine, Clock, User, Calendar } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function ScannerPage() {
  const [ticketId, setTicketId] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword) {
      setIsLoggedIn(true)
      toast.success("Logged in as Admin")
    } else {
      toast.error("Please enter the admin password")
    }
  }

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!ticketId) {
      toast.error("Please enter a ticket ID")
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/events/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId, adminPassword }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast.success("Ticket Validated!")
        setTicketId("") // Clear for next scan
      } else {
        toast.error(data.message || "Invalid Ticket")
        if (response.status === 401) {
          setIsLoggedIn(false) // Force re-login if password is wrong
        }
      }
    } catch (error) {
      console.error("Scan error:", error)
      toast.error("An error occurred during scanning.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/yrdly-logo.png"
              alt="YRDLY Logo"
              width={100}
              height={70}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Event Scanner</h1>
          <p className="text-gray-600 mt-2">Admin Ticket Verification Tool</p>
        </div>

        {!isLoggedIn ? (
          <Card className="shadow-lg border-2 border-green-100">
            <CardHeader className="bg-white">
              <CardTitle className="text-green-700">Admin Login</CardTitle>
              <CardDescription>
                Please enter the event admin password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="h-12"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-green-600 hover:bg-green-700 font-semibold"
                >
                  Access Scanner
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-2 border-green-100">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center text-green-700">
                <ScanLine className="mr-2 h-5 w-5" />
                Scan Ticket ID
              </CardTitle>
              <CardDescription>
                Enter the unique ticket ID shown on the guest's phone.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="e.g. A1B2C3D4"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                    className="text-center text-2xl font-bold tracking-widest h-16 uppercase"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Verify Ticket"
                  )}
                </Button>
              </form>

              {result && (
                <div className={`mt-8 p-6 rounded-xl border-2 ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center mb-4">
                    {result.success ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 mr-3" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 mr-3" />
                    )}
                    <h3 className={`text-xl font-bold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.success ? "ACCESS GRANTED" : "ACCESS DENIED"}
                    </h3>
                  </div>
                  
                  <p className={`text-sm mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>

                  {result.ticket && (
                    <div className="space-y-3 pt-4 border-t border-black/5 text-sm text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-semibold">{result.ticket.eventName}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{result.ticket.email}</span>
                      </div>
                      {result.ticket.used && (
                        <div className="flex items-center text-red-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Used: {new Date(result.ticket.usedAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <Button 
                variant="ghost" 
                onClick={() => setIsLoggedIn(false)}
                className="w-full mt-4 text-gray-500 text-xs"
              >
                Logout from Admin
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-green-600 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
