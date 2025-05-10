"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { getLogAktivitas } from "@/lib/api/logAktivitas"
import type { LogAktivitas } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function LogAktivitasPage() {
  const [logs, setLogs] = useState<LogAktivitas[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterUser, setFilterUser] = useState<string>("semua")
  const [filterAksi, setFilterAksi] = useState<string>("semua")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLogAktivitas()
        setLogs(data)
      } catch (error) {
        console.error("Error fetching log aktivitas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Mendapatkan daftar unik user dan aksi dari data logs
  const uniqueUsers = Array.from(new Set(logs.map((log) => log.user?.name || "Unknown")))
  const uniqueAksi = Array.from(new Set(logs.map((log) => log.aksi)))

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      log.aksi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUser = filterUser === "semua" || log.user?.name === filterUser
    const matchesAksi = filterAksi === "semua" || log.aksi === filterAksi
    return matchesSearch && matchesUser && matchesAksi
  })

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Log Aktivitas</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari log aktivitas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterUser} onValueChange={setFilterUser}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Pengguna" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Pengguna</SelectItem>
            {uniqueUsers.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAksi} onValueChange={setFilterAksi}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Aksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Aksi</SelectItem>
            {uniqueAksi.map((aksi) => (
              <SelectItem key={aksi} value={aksi}>
                {aksi}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Tidak ada data log aktivitas yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.created_at).toLocaleString("id-ID")}</TableCell>
                    <TableCell>{log.user?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.aksi.includes("tambah")
                            ? "bg-green-100 text-green-800"
                            : log.aksi.includes("edit") || log.aksi.includes("ubah")
                              ? "bg-blue-100 text-blue-800"
                              : log.aksi.includes("hapus")
                                ? "bg-red-100 text-red-800"
                                : log.aksi.includes("login")
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.aksi}
                      </span>
                    </TableCell>
                    <TableCell>{log.deskripsi || "-"}</TableCell>
                    <TableCell>{log.alamat_ip || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t">
              <div className="text-sm text-gray-500">
                Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} dari{" "}
                {filteredLogs.length} data
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber =
                    currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i

                  if (pageNumber <= totalPages && pageNumber > 0) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  }
                  return null
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
