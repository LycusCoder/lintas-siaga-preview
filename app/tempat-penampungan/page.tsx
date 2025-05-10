"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash } from "lucide-react"
import {
  getTempatPenampungan,
  tambahTempatPenampungan,
  editTempatPenampungan,
  hapusTempatPenampungan,
} from "@/lib/api/tempatPenampungan"
import type { TempatPenampungan } from "@/lib/types"
import FormTempatPenampungan from "@/components/tempatPenampungan/FormTempatPenampungan"
import DetailTempatPenampungan from "@/components/tempatPenampungan/DetailTempatPenampungan"

export default function TempatPenampungan() {
  const [penampungan, setPenampungan] = useState<TempatPenampungan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedPenampungan, setSelectedPenampungan] = useState<TempatPenampungan | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("semua")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTempatPenampungan()
        setPenampungan(data)
      } catch (error) {
        console.error("Error fetching tempat penampungan:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTambah = async (data: Omit<TempatPenampungan, "id">) => {
    try {
      const newPenampungan = await tambahTempatPenampungan(data)
      setPenampungan([...penampungan, newPenampungan])
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding tempat penampungan:", error)
    }
  }

  const handleEdit = async (id: number, data: Partial<TempatPenampungan>) => {
    try {
      const updatedPenampungan = await editTempatPenampungan(id, data)
      setPenampungan(penampungan.map((p) => (p.id === id ? updatedPenampungan : p)))
      setDialogOpen(false)
      setSelectedPenampungan(null)
    } catch (error) {
      console.error("Error updating tempat penampungan:", error)
    }
  }

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tempat penampungan ini?")) {
      try {
        await hapusTempatPenampungan(id)
        setPenampungan(penampungan.filter((p) => p.id !== id))
      } catch (error) {
        console.error("Error deleting tempat penampungan:", error)
      }
    }
  }

  const filteredPenampungan = penampungan.filter((p) => {
    const matchesSearch =
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "semua" || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tempat Penampungan</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPenampungan(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Penampungan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>
                {selectedPenampungan ? "Edit Tempat Penampungan" : "Tambah Tempat Penampungan Baru"}
              </DialogTitle>
            </DialogHeader>
            <FormTempatPenampungan
              penampungan={selectedPenampungan}
              onSubmit={selectedPenampungan ? (data) => handleEdit(selectedPenampungan.id, data) : handleTambah}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari tempat penampungan..."
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
            <SelectItem value="tersedia">Tersedia</SelectItem>
            <SelectItem value="terbatas">Terbatas</SelectItem>
            <SelectItem value="penuh">Penuh</SelectItem>
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
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Penghuni</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPenampungan.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data tempat penampungan yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredPenampungan.map((penampungan) => (
                  <TableRow key={penampungan.id}>
                    <TableCell className="font-medium">{penampungan.nama}</TableCell>
                    <TableCell>{penampungan.alamat}</TableCell>
                    <TableCell>{penampungan.kapasitas}</TableCell>
                    <TableCell>{penampungan.jumlah_penghuni_saat_ini}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          penampungan.status === "tersedia"
                            ? "bg-green-100 text-green-800"
                            : penampungan.status === "terbatas"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {penampungan.status === "tersedia"
                          ? "Tersedia"
                          : penampungan.status === "terbatas"
                            ? "Terbatas"
                            : "Penuh"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPenampungan(penampungan)
                          setDetailDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPenampungan(penampungan)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleHapus(penampungan.id)}>
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

      {/* Dialog untuk detail penampungan */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Detail Tempat Penampungan</DialogTitle>
          </DialogHeader>
          {selectedPenampungan && <DetailTempatPenampungan penampungan={selectedPenampungan} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
