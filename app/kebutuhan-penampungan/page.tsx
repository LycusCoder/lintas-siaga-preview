"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash } from "lucide-react"
import {
  getKebutuhanPenampungan,
  tambahKebutuhanPenampungan,
  editKebutuhanPenampungan,
  hapusKebutuhanPenampungan,
} from "@/lib/api/kebutuhanPenampungan"
import type { KebutuhanPenampungan } from "@/lib/types"
import FormKebutuhanPenampungan from "@/components/kebutuhanPenampungan/FormKebutuhanPenampungan"

export default function KebutuhanPenampungan() {
  const [kebutuhan, setKebutuhan] = useState<KebutuhanPenampungan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedKebutuhan, setSelectedKebutuhan] = useState<KebutuhanPenampungan | null>(null)
  const [filterKategori, setFilterKategori] = useState<string>("semua")
  const [filterStatus, setFilterStatus] = useState<string>("semua")
  const [filterPrioritas, setFilterPrioritas] = useState<string>("semua")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKebutuhanPenampungan()
        setKebutuhan(data)
      } catch (error) {
        console.error("Error fetching kebutuhan penampungan:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTambah = async (data: Omit<KebutuhanPenampungan, "id">) => {
    try {
      const newKebutuhan = await tambahKebutuhanPenampungan(data)
      setKebutuhan([...kebutuhan, newKebutuhan])
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding kebutuhan penampungan:", error)
    }
  }

  const handleEdit = async (id: number, data: Partial<KebutuhanPenampungan>) => {
    try {
      const updatedKebutuhan = await editKebutuhanPenampungan(id, data)
      setKebutuhan(kebutuhan.map((k) => (k.id === id ? updatedKebutuhan : k)))
      setDialogOpen(false)
      setSelectedKebutuhan(null)
    } catch (error) {
      console.error("Error updating kebutuhan penampungan:", error)
    }
  }

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kebutuhan ini?")) {
      try {
        await hapusKebutuhanPenampungan(id)
        setKebutuhan(kebutuhan.filter((k) => k.id !== id))
      } catch (error) {
        console.error("Error deleting kebutuhan penampungan:", error)
      }
    }
  }

  const filteredKebutuhan = kebutuhan.filter((k) => {
    const matchesSearch = k.nama_kebutuhan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesKategori = filterKategori === "semua" || k.kategori === filterKategori
    const matchesStatus = filterStatus === "semua" || k.status === filterStatus
    const matchesPrioritas = filterPrioritas === "semua" || k.prioritas === filterPrioritas
    return matchesSearch && matchesKategori && matchesStatus && matchesPrioritas
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kebutuhan Tempat Penampungan</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedKebutuhan(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Kebutuhan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>
                {selectedKebutuhan ? "Edit Kebutuhan Penampungan" : "Tambah Kebutuhan Penampungan Baru"}
              </DialogTitle>
            </DialogHeader>
            <FormKebutuhanPenampungan
              kebutuhan={selectedKebutuhan}
              onSubmit={selectedKebutuhan ? (data) => handleEdit(selectedKebutuhan.id, data) : handleTambah}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari kebutuhan..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterKategori} onValueChange={setFilterKategori}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Kategori</SelectItem>
            <SelectItem value="makanan">Makanan</SelectItem>
            <SelectItem value="air">Air</SelectItem>
            <SelectItem value="obat">Obat</SelectItem>
            <SelectItem value="pakaian">Pakaian</SelectItem>
            <SelectItem value="selimut">Selimut</SelectItem>
            <SelectItem value="lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Status</SelectItem>
            <SelectItem value="dibutuhkan">Dibutuhkan</SelectItem>
            <SelectItem value="terpenuhi_sebagian">Terpenuhi Sebagian</SelectItem>
            <SelectItem value="terpenuhi">Terpenuhi</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPrioritas} onValueChange={setFilterPrioritas}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Prioritas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Prioritas</SelectItem>
            <SelectItem value="rendah">Rendah</SelectItem>
            <SelectItem value="sedang">Sedang</SelectItem>
            <SelectItem value="tinggi">Tinggi</SelectItem>
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
                <TableHead>Nama Kebutuhan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tempat Penampungan</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKebutuhan.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Tidak ada data kebutuhan penampungan yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredKebutuhan.map((kebutuhan) => (
                  <TableRow key={kebutuhan.id}>
                    <TableCell className="font-medium">{kebutuhan.nama_kebutuhan}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          kebutuhan.kategori === "makanan"
                            ? "bg-green-100 text-green-800"
                            : kebutuhan.kategori === "air"
                              ? "bg-blue-100 text-blue-800"
                              : kebutuhan.kategori === "obat"
                                ? "bg-red-100 text-red-800"
                                : kebutuhan.kategori === "pakaian"
                                  ? "bg-purple-100 text-purple-800"
                                  : kebutuhan.kategori === "selimut"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {kebutuhan.kategori.charAt(0).toUpperCase() + kebutuhan.kategori.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{kebutuhan.tempat_penampungan.nama}</TableCell>
                    <TableCell>{kebutuhan.jumlah}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          kebutuhan.prioritas === "tinggi"
                            ? "bg-red-100 text-red-800"
                            : kebutuhan.prioritas === "sedang"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {kebutuhan.prioritas.charAt(0).toUpperCase() + kebutuhan.prioritas.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          kebutuhan.status === "dibutuhkan"
                            ? "bg-red-100 text-red-800"
                            : kebutuhan.status === "terpenuhi_sebagian"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {kebutuhan.status === "dibutuhkan"
                          ? "Dibutuhkan"
                          : kebutuhan.status === "terpenuhi_sebagian"
                            ? "Terpenuhi Sebagian"
                            : "Terpenuhi"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedKebutuhan(kebutuhan)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleHapus(kebutuhan.id)}>
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
    </div>
  )
}
