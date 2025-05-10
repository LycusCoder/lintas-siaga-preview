"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash } from "lucide-react"
import {
  getKategoriBencana,
  tambahKategoriBencana,
  editKategoriBencana,
  hapusKategoriBencana,
} from "@/lib/api/kategoriBencana"
import type { KategoriBencana } from "@/lib/types"
import FormKategoriBencana from "@/components/kategoriBencana/FormKategoriBencana"

export default function KelolaBencana() {
  const [kategoriBencana, setKategoriBencana] = useState<KategoriBencana[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedKategori, setSelectedKategori] = useState<KategoriBencana | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKategoriBencana()
        setKategoriBencana(data)
      } catch (error) {
        console.error("Error fetching kategori bencana:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTambah = async (data: Omit<KategoriBencana, "id">) => {
    try {
      const newKategori = await tambahKategoriBencana(data)
      setKategoriBencana([...kategoriBencana, newKategori])
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding kategori bencana:", error)
    }
  }

  const handleEdit = async (id: number, data: Partial<KategoriBencana>) => {
    try {
      const updatedKategori = await editKategoriBencana(id, data)
      setKategoriBencana(kategoriBencana.map((k) => (k.id === id ? updatedKategori : k)))
      setDialogOpen(false)
      setSelectedKategori(null)
    } catch (error) {
      console.error("Error updating kategori bencana:", error)
    }
  }

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await hapusKategoriBencana(id)
        setKategoriBencana(kategoriBencana.filter((k) => k.id !== id))
      } catch (error) {
        console.error("Error deleting kategori bencana:", error)
      }
    }
  }

  const filteredKategori = kategoriBencana.filter((k) =>
    k.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Kategori Bencana</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedKategori(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedKategori ? "Edit Kategori Bencana" : "Tambah Kategori Bencana Baru"}</DialogTitle>
            </DialogHeader>
            <FormKategoriBencana
              kategori={selectedKategori}
              onSubmit={selectedKategori ? (data) => handleEdit(selectedKategori.id, data) : handleTambah}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Cari kategori bencana..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKategori.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    Tidak ada data kategori bencana yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredKategori.map((kategori) => (
                  <TableRow key={kategori.id}>
                    <TableCell className="font-medium">{kategori.nama_kategori}</TableCell>
                    <TableCell>{kategori.deskripsi || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedKategori(kategori)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleHapus(kategori.id)}>
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
