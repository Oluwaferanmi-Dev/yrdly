import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
   title: 'Yrdly - Your Neighborhood Network',
  description: 'Connect with your neighbors, share updates, and build a stronger community with Yrdly.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}<CookieConsent /><Analytics /></body>
    </html>
  )
}
