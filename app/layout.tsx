import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistem Pelaporan dan Penanganan Bencana Alam",
  description: "Aplikasi untuk pelaporan dan penanganan bencana alam",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
