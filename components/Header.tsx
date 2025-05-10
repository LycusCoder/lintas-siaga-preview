"use client"

import { useState } from "react"
import { Bell, User, Search } from "lucide-react"
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
      title: "Laporan bencana baru",
      message: "Ada laporan bencana baru di Kota Bandung",
      time: "5 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      title: "Penampungan hampir penuh",
      message: "Penampungan di Kecamatan Cibeunying hampir penuh",
      time: "30 menit yang lalu",
      read: false,
    },
    {
      id: 3,
      title: "Relawan baru terdaftar",
      message: "5 relawan baru telah terdaftar",
      time: "1 jam yang lalu",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1 flex items-center md:ml-64">
        <div className="relative w-full max-w-md hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Cari..." className="pl-8 w-full" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifikasi</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllAsRead}>
                  Tandai semua dibaca
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500">Tidak ada notifikasi</div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start p-3 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-gray-500">{notification.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifikasi" className="w-full text-center text-sm">
                Lihat semua notifikasi
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profil">Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pengaturan">Pengaturan</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
