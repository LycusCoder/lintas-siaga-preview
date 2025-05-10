"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash } from "lucide-react"
import { getRelawan, tambahRelawan, editRelawan, hapusRelawan } from "@/lib/api/relawan"
import type { Relawan } from "@/lib/types"
import FormRelawan from "@/components/relawan/FormRelawan"
import DetailRelawan from "@/components/relawan/DetailRelawan"

export default function RelawanPage() {
  const [relawan, setRelawan] = useState<Relawan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);
  const [filterKetersediaan, setFilterKetersediaan] = useState<string>("semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRelawan();
        setRelawan(data);
      } catch (error) {
        console.error("Error fetching relawan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTambah = async (data: Omit<Relawan, "id">) => {
    try {
      const newRelawan = await tambahRelawan(data);
      setRelawan([...relawan, newRelawan]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding relawan:", error);
    }
  };

  const handleEdit = async (id: number, data: Partial<Relawan>) => {
    try {
      const updatedRelawan = await editRelawan(id, data);
      setRelawan(relawan.map(r => r.id === id ? updatedRelawan : r));
      setDialogOpen(false);
      setSelectedRelawan(null);
    } catch (error) {
      console.error("Error updating relawan:", error);
    }
  };

  const handleHapus = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus relawan ini?")) {
      try {
        await hapusRelawan(id);
        setRelawan(relawan.filter(r => r.id !== id));
      } catch (error) {
        console.error("Error deleting relawan:", error);
      }
    }
  };

  const filteredRelawan = relawan.filter(r => {
    const matchesSearch = r.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKetersediaan = filterKetersediaan === "semua" || r.ketersediaan === filterKetersediaan;
    return matchesSearch && matchesKetersediaan;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relawan</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedRelawan(null)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Relawan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>
                {selectedRelawan ? "Edit Relawan" : "Tambah Relawan Baru"}
              </DialogTitle>
            </DialogHeader>
            <FormRelawan 
              relawan={selectedRelawan} 
              onSubmit={selectedRelawan 
                ? (data) => handleEdit(selectedRelawan.id, data) 
                : handleTambah
              } 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari relawan..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterKetersediaan} onValueChange={setFilterKetersediaan}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Ketersediaan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Status</SelectItem>
            <SelectItem value="tersedia">Tersedia</SelectItem>
            <SelectItem value="siaga">Siaga</SelectItem>
            <SelectItem value="bertugas">Bertugas</SelectItem>
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
                <TableHead>Keahlian</TableHead>
                <TableHead>Ketersediaan</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Terakhir Aktif</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelawan.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data relawan yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredRelawan.map((relawanItem) => (
                  <TableRow key={relawanItem.id}>
                    <TableCell className="font-medium">{relawanItem.user.name}</TableCell>
                    <TableCell>
                      {relawanItem.keahlian.slice(0, 2).join(', ')}
                      {relawanItem.keahlian.length > 2 && '...'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        relawanItem.ketersediaan === 'tersedia' ? 'bg-green-100 text-green-800' :
                        relawanItem.ketersediaan === 'siaga' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {relawanItem.ketersediaan.charAt(0).toUpperCase() + relawanItem.ketersediaan.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {relawanItem.rating.toFixed(1)}
                        <span className="ml-1 text-yellow-500">★</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(relawanItem.terakhir_aktif).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedRelawan(relawanItem);
                          setDetailDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedRelawan(relawanItem);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleHapus(relawanItem.id)}
                      >
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

      {/* Dialog untuk detail relawan */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Detail Relawan</DialogTitle>
          </DialogHeader>
          {selectedRelawan && <DetailRelawan relawan={selectedRelawan} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}