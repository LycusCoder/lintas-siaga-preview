"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash } from "lucide-react"
import { getPengguna, tambahPengguna, editPengguna, hapusPengguna } from "@/lib/api/pengguna"
import type { Pengguna } from "@/lib/types"
import FormPengguna from "@/components/pengguna/FormPengguna"

export default function DaftarPengguna() {
  const [pengguna, setPengguna] = useState<Pengguna[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPengguna, setSelectedPengguna] = useState<Pengguna | null>(null)
  const [filterRole, setFilterRole] = useState<string>("semua")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPengguna()
        setPengguna(data)
      } catch (error) {
        console.error("Error fetching pengguna:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTambah = async (data: Omit<Pengguna, "id">) => {
    try {
      const newPengguna = await tambahPengguna(data)
      setPengguna([...pengguna, newPengguna])
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding pengguna:", error)
    }
  }

  const handleEdit = async (id: number, data: Partial<Pengguna>) => {
    try {
      const updatedPengguna = await editPengguna(id, data)
      setPengguna(pengguna.map((p) => (p.id === id ? updatedPengguna : p)))
      setDialogOpen(false)
      setSelectedPengguna(null)
    } catch (error) {
      console.error("Error updating pengguna:", error)
    }
  }

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await hapusPengguna(id)
        setPengguna(pengguna.filter((p) => p.id !== id))
      } catch (error) {
        console.error("Error deleting pengguna:", error)
      }
    }
  }

  const filteredPengguna = pengguna.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "semua" || p.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPengguna(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedPengguna ? "Edit Pengguna" : "Tambah Pengguna Baru"}</DialogTitle>
            </DialogHeader>
            <FormPengguna
              pengguna={selectedPengguna}
              onSubmit={selectedPengguna ? (data) => handleEdit(selectedPengguna.id, data) : handleTambah}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari pengguna..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Role</SelectItem>
            <SelectItem value="publik">Publik</SelectItem>
            <SelectItem value="relawan">Relawan</SelectItem>
            <SelectItem value="admin_ltsg">Admin LS</SelectItem>
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
                <TableHead>Email</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPengguna.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data pengguna yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredPengguna.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.phone}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          p.role === "admin_ltsg"
                            ? "bg-red-100 text-red-800"
                            : p.role === "relawan"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.role === "admin_ltsg" ? "Admin LS" : p.role === "relawan" ? "Relawan" : "Publik"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          p.status === "aktif"
                            ? "bg-green-100 text-green-800"
                            : p.status === "tidak_aktif"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status === "aktif" ? "Aktif" : p.status === "tidak_aktif" ? "Tidak Aktif" : "Diblokir"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPengguna(p)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleHapus(p.id)}>
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
