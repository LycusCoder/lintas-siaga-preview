"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash } from "lucide-react"
import {
  getLaporanBencana,
  tambahLaporanBencana,
  editLaporanBencana,
  hapusLaporanBencana,
} from "@/lib/api/laporanBencana"
import type { LaporanBencana as LaporanBencanaType } from "@/lib/types"
import FormLaporanBencana from "@/components/laporanBencana/FormLaporanBencana"
import DetailLaporanBencana from "@/components/laporanBencana/DetailLaporanBencana"

export default function LaporanBencana() {
  const [laporan, setLaporan] = useState<LaporanBencanaType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedLaporan, setSelectedLaporan] = useState<LaporanBencanaType | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("semua")
  const [filterKategori, setFilterKategori] = useState<string>("semua")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLaporanBencana()
        setLaporan(data)
      } catch (error) {
        console.error("Error fetching laporan bencana:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTambah = async (data: Omit<LaporanBencanaType, "id">) => {
    try {
      const newLaporan = await tambahLaporanBencana(data)
      setLaporan([...laporan, newLaporan])
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding laporan bencana:", error)
    }
  }

  const handleEdit = async (id: number, data: Partial<LaporanBencanaType>) => {
    try {
      const updatedLaporan = await editLaporanBencana(id, data)
      setLaporan(laporan.map((l) => (l.id === id ? updatedLaporan : l)))
      setDialogOpen(false)
      setSelectedLaporan(null)
    } catch (error) {
      console.error("Error updating laporan bencana:", error)
    }
  }

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        await hapusLaporanBencana(id)
        setLaporan(laporan.filter((l) => l.id !== id))
      } catch (error) {
        console.error("Error deleting laporan bencana:", error)
      }
    }
  }

  const filteredLaporan = laporan.filter((l) => {
    const matchesSearch = l.judul.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "semua" || l.status === filterStatus
    const matchesKategori = filterKategori === "semua" || l.kategori.nama_kategori === filterKategori
    return matchesSearch && matchesStatus && matchesKategori
  })

  // Mendapatkan daftar unik kategori dari data laporan
  const uniqueKategori = Array.from(new Set(laporan.map((l) => l.kategori.nama_kategori)))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Laporan Kejadian Bencana</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedLaporan(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Laporan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{selectedLaporan ? "Edit Laporan Bencana" : "Tambah Laporan Bencana Baru"}</DialogTitle>
            </DialogHeader>
            <FormLaporanBencana
              laporan={selectedLaporan}
              onSubmit={selectedLaporan ? (data) => handleEdit(selectedLaporan.id, data) : handleTambah}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari laporan bencana..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Status</SelectItem>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="ditangani">Ditangani</SelectItem>
            <SelectItem value="selesai">Selesai</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterKategori} onValueChange={setFilterKategori}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Kategori</SelectItem>
            {uniqueKategori.map((kategori) => (
              <SelectItem key={kategori} value={kategori}>
                {kategori}
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
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Waktu Kejadian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLaporan.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data laporan bencana yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredLaporan.map((laporan) => (
                  <TableRow key={laporan.id}>
                    <TableCell className="font-medium">{laporan.judul}</TableCell>
                    <TableCell>{laporan.kategori.nama_kategori}</TableCell>
                    <TableCell>{laporan.kota?.nama || "-"}</TableCell>
                    <TableCell>{new Date(laporan.waktu_kejadian).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          laporan.status === "aktif"
                            ? "bg-red-100 text-red-800"
                            : laporan.status === "ditangani"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {laporan.status === "aktif"
                          ? "Aktif"
                          : laporan.status === "ditangani"
                            ? "Ditangani"
                            : "Selesai"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedLaporan(laporan)
                          setDetailDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedLaporan(laporan)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleHapus(laporan.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog untuk detail laporan */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Detail Laporan Bencana</DialogTitle>
          </DialogHeader>
          {selectedLaporan && <DetailLaporanBencana laporan={selectedLaporan} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
