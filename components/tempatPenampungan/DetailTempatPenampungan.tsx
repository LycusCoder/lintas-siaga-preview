import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { TempatPenampungan } from "@/lib/types"
import { Home, MapPin, User, Phone, Calendar, Users } from 'lucide-react'

interface DetailTempatPenampunganProps {
  penampungan: TempatPenampungan
}

export default function DetailTempatPenampungan({ penampungan }: DetailTempatPenampunganProps) {
  // Hitung persentase kapasitas yang terisi
  const persentaseTerisi = Math.round((penampungan.jumlah_penghuni_saat_ini / penampungan.kapasitas) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{penampungan.nama}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{penampungan.alamat}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <Badge
            className={
              penampungan.status === "tersedia"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : penampungan.status === "terbatas"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            {penampungan.status === "tersedia" ? "Tersedia" : penampungan.status === "terbatas" ? "Terbatas" : "Penuh"}
          </Badge>
        </div>
      </div>

      {penampungan.deskripsi && (
        <Card>
          <CardContent className="p-4">
            <p className="whitespace-pre-line">{penampungan.deskripsi}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Informasi Kapasitas</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Kapasitas Terisi: {penampungan.jumlah_penghuni_saat_ini} dari {penampungan.kapasitas}</span>
                  <span>{persentaseTerisi}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      persentaseTerisi >= 90
                        ? "bg-red-500"
                        : persentaseTerisi >= 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${persentaseTerisi}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Kapasitas Total:</p>
                  <p className="font-semibold">{penampungan.kapasitas} orang</p>
                </div>
                <div>
                  <p className="text-gray-500">Jumlah Penghuni:</p>
                  <p className="font-semibold">{penampungan.jumlah_penghuni_saat_ini} orang</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Lokasi</h3>
            </div>
            <div className="space-y-2">
              <p><span className="text-gray-500">Alamat:</span> {penampungan.alamat}</p>
              <p><span className="text-gray-500">Kota:</span> {penampungan.kota}</p>
              <p><span className="text-gray-500">Provinsi:</span> {penampungan.provinsi}</p>
              <p><span className="text-gray-500">Koordinat:</span> {penampungan.latitude}, {penampungan.longitude}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Kontak</h3>
            </div>
            {penampungan.nama_kontak && penampungan.telepon_kontak ? (
              <div className="space-y-2">
                <p><span className="text-gray-500">Nama:</span> {penampungan.nama_kontak}</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${penampungan.telepon_kontak}`} className="text-blue-500 hover:underline">
                    {penampungan.telepon_kontak}
                  </a>
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada informasi kontak</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Informasi Pelaporan</h3>
            </div>
            <div className="space-y-2">
              <p><span className="text-gray-500">Dilaporkan oleh:</span> {penampungan.pelapor.name}</p>
              <p><span className="text-gray-500">Tanggal pelaporan:</span> {new Date(penampungan.created_at).toLocaleDateString("id-ID")}</p>
              
              {penampungan.verifikator && (
                <>
                  <Separator className="my-2" />
                  <p><span className="text-gray-500">Diverifikasi oleh:</span> {penampungan.verifikator.name}</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(penampungan.diverifikasi_pada!).toLocaleString("id-ID")}</span>
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {penampungan.kebutuhan && penampungan.kebutuhan.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Kebutuhan Penampungan</h3>
            </div>
            <div className="space-y-4">
              {penampungan.kebutuhan.map((kebutuhan, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{kebutuhan.nama_kebutuhan}</p>
                    <p className="text-sm text-gray-500">
                      {kebutuhan.kategori.charAt(0).toUpperCase() + kebutuhan.kategori.slice(1)} • 
                      Jumlah: {kebutuhan.jumlah}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        kebutuhan.prioritas === "tinggi"
                          ? "bg-red-100 text-red-800"
                          : kebutuhan.prioritas === "sedang"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {kebutuhan.prioritas.charAt(0).toUpperCase() + kebutuhan.prioritas.slice(1)}
                    </Badge>
                    <Badge
                      className={
                        kebutuhan.status === "dibutuhkan"
                          ? "bg-red-100 text-red-800"
                          : kebutuhan.status === "terpenuhi_sebagian"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {kebutuhan.status === "dibutuhkan"
                        ? "Dibutuhkan"
                        : kebutuhan.status === "terpenuhi_sebagian"
                          ? "Terpenuhi Sebagian"
                          : "Terpenuhi"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}