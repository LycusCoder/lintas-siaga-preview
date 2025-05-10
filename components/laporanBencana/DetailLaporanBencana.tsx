import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { LaporanBencana } from "@/lib/types"
import { AlertTriangle, Calendar, MapPin, User, FileText, BarChart } from 'lucide-react'

interface DetailLaporanBencanaProps {
  laporan: LaporanBencana
}

export default function DetailLaporanBencana({ laporan }: DetailLaporanBencanaProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{laporan.judul}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date(laporan.waktu_kejadian).toLocaleString("id-ID")}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 flex items-center gap-2">
          <Badge
            className={
              laporan.status === "aktif"
                ? "bg-red-100 text-red-800 hover:bg-red-200"
                : laporan.status === "ditangani"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
            }
          >
            {laporan.status === "aktif" ? "Aktif" : laporan.status === "ditangani" ? "Ditangani" : "Selesai"}
          </Badge>
          <Badge
            className={
              laporan.tingkat_keparahan === "tinggi"
                ? "bg-red-100 text-red-800 hover:bg-red-200"
                : laporan.tingkat_keparahan === "sedang"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
            }
          >
            Keparahan: {laporan.tingkat_keparahan.charAt(0).toUpperCase() + laporan.tingkat_keparahan.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Kategori & Jenis</h3>
            </div>
            <p>{laporan.kategori.nama_kategori}</p>
            {laporan.jenis && <p className="text-gray-500">{laporan.jenis.replace("_", " ")}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Lokasi</h3>
            </div>
            <p>{laporan.kota?.nama || "Tidak ada data lokasi"}</p>
            {laporan.lokasi_kejadian && (
              <p className="text-gray-500">
                Koordinat: {laporan.lokasi_kejadian.x}, {laporan.lokasi_kejadian.y}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Pelapor</h3>
            </div>
            <p>{laporan.pelapor.name}</p>
            <p className="text-gray-500">{laporan.pelapor.email}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Deskripsi</h3>
          </div>
          <p className="whitespace-pre-line">{laporan.deskripsi}</p>
        </CardContent>
      </Card>

      {laporan.gambar && laporan.gambar.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Gambar & Dokumentasi</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {laporan.gambar.map((gambar, index) => (
                <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                  <img
                    src={gambar.path || "/placeholder.svg"}
                    alt={gambar.keterangan || `Gambar ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {gambar.keterangan && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                      {gambar.keterangan}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {laporan.verifikator && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Informasi Verifikasi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Diverifikasi oleh:</p>
                <p>{laporan.verifikator.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Waktu verifikasi:</p>
                <p>{new Date(laporan.diverifikasi_pada!).toLocaleString("id-ID")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}