"use client"

import { useState } from "react"
import { Bell, User, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function Header() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Laporan Bencana Baru",
      message: "Ada laporan banjir di Jakarta Timur",
      time: "2 menit lalu",
      read: false,
    },
    {
      id: 2,
      title: "Penampungan Hampir Penuh",
      message: "Penampungan Depok sudah mencapai 90%",
      time: "30 menit lalu",
      read: false,
    },
    {
      id: 3,
      title: "Relawan Baru",
      message: "3 relawan baru mendaftar hari ini",
      time: "1 jam lalu",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm px-4 h-16 flex items-center justify-between">
      {/* Logo & Hamburger */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-base text-gray-800">
          Sistem Bencana
        </span>
      </div>

      {/* Search (Desktop Only) */}
      <div className="hidden md:block w-full max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Cari lokasi, relawan, laporan..." className="pl-10" />
        </div>
      </div>

      {/* Notifikasi & Akun */}
      <div className="flex items-center gap-2">
        {/* Notifikasi */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifikasi</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllAsRead}>
                  Tandai semua
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500">Tidak ada notifikasi</div>
            ) : (
              notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`flex flex-col items-start p-3 rounded-md transition ${
                    notif.read ? "hover:bg-gray-100" : "bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  <div className="font-medium text-sm">{notif.title}</div>
                  <div className="text-sm text-gray-600">{notif.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifikasi" className="text-sm w-full text-center text-blue-600">
                Lihat semua notifikasi
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu Akun */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profil">Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pengaturan">Pengaturan</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
