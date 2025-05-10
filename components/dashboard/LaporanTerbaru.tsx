import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

// Data dummy untuk laporan terbaru
const laporanTerbaru = [
  {
    id: 1,
    judul: "Banjir di Kelurahan Sukajadi",
    kategori: "Banjir",
    lokasi: "Bandung",
    waktu: "2023-05-10T08:30:00",
    status: "aktif",
  },
  {
    id: 2,
    judul: "Kebakaran Pasar Baru",
    kategori: "Kebakaran",
    lokasi: "Jakarta",
    waktu: "2023-05-09T14:15:00",
    status: "ditangani",
  },
  {
    id: 3,
    judul: "Tanah Longsor di Puncak",
    kategori: "Tanah Longsor",
    lokasi: "Bogor",
    waktu: "2023-05-08T06:45:00",
    status: "selesai",
  },
  {
    id: 4,
    judul: "Gempa Bumi 5.2 SR",
    kategori: "Gempa Bumi",
    lokasi: "Sukabumi",
    waktu: "2023-05-07T22:10:00",
    status: "ditangani",
  },
  {
    id: 5,
    judul: "Banjir Bandang Sungai Ciliwung",
    kategori: "Banjir",
    lokasi: "Jakarta",
    waktu: "2023-05-06T19:30:00",
    status: "selesai",
  },
]

export default function LaporanTerbaru() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laporanTerbaru.map((laporan) => (
            <TableRow key={laporan.id}>
              <TableCell className="font-medium">{laporan.judul}</TableCell>
              <TableCell>{laporan.kategori}</TableCell>
              <TableCell>{laporan.lokasi}</TableCell>
              <TableCell>{new Date(laporan.waktu).toLocaleDateString("id-ID")}</TableCell>
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
                  {laporan.status === "aktif" ? "Aktif" : laporan.status === "ditangani" ? "Ditangani" : "Selesai"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/laporan-bencana/${laporan.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-right">
        <Link href="/laporan-bencana">
          <Button variant="outline">Lihat Semua Laporan</Button>
        </Link>
      </div>
    </div>
  )
}
