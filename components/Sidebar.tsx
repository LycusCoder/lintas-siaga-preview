"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  User,
  UserCheck,
  Users,
  Activity,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Daftar Pengguna",
    href: "/pengguna",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Kategori Bencana",
    href: "/kategori-bencana",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    title: "Laporan Bencana",
    href: "/laporan-bencana",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Tempat Penampungan",
    href: "/tempat-penampungan",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Kebutuhan Penampungan",
    href: "/kebutuhan-penampungan",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Relawan",
    href: "/relawan",
    icon: <UserCheck className="h-5 w-5" />,
  },
  {
    title: "Log Aktivitas",
    href: "/log-aktivitas",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Profil",
    href: "/profil",
    icon: <User className="h-5 w-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <span>Lintas Siaga</span>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
