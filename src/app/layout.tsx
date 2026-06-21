import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LinkForge — Professional URL Shortener & Analytics",
  description: "Shorten URLs, track clicks, generate QR codes. The smartest link management platform for businesses and creators.",
  keywords: ["url shortener", "link analytics", "qr code", "link management"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
