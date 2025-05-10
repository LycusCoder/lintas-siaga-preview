import StatistikKartu from "@/components/dashboard/StatistikKartu"
import GrafikBencana from "@/components/dashboard/GrafikBencana"
import PetaBencana from "@/components/dashboard/PetaBencana"
import LaporanTerbaru from "@/components/dashboard/LaporanTerbaru"
import { AlertTriangle, Home, Users, FileText } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatistikKartu
          title="Total Laporan"
          value="124"
          icon={<FileText className="h-8 w-8 text-blue-500" />}
          trend="+12% dari bulan lalu"
        />
        <StatistikKartu
          title="Bencana Aktif"
          value="18"
          icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
          trend="+5% dari bulan lalu"
        />
        <StatistikKartu
          title="Tempat Penampungan"
          value="42"
          icon={<Home className="h-8 w-8 text-green-500" />}
          trend="+8% dari bulan lalu"
        />
        <StatistikKartu
          title="Relawan Aktif"
          value="256"
          icon={<Users className="h-8 w-8 text-purple-500" />}
          trend="+15% dari bulan lalu"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Statistik Bencana</h2>
          <GrafikBencana />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Peta Sebaran Bencana</h2>
          <PetaBencana />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Laporan Terbaru</h2>
        <LaporanTerbaru />
      </div>
    </div>
  )
}
