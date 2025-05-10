import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatistikKartuProps {
  title: string
  value: string
  icon: ReactNode
  trend?: string
}

export default function StatistikKartu({ title, value, icon, trend }: StatistikKartuProps) {
  const isTrendPositive = trend?.includes("+")
  const trendColor = isTrendPositive ? "text-green-600" : "text-red-600"
  const TrendIcon = isTrendPositive ? ArrowUpRight : ArrowDownRight

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1 animate-pulse">{value}</h3>
            {trend && (
              <div className={`text-xs mt-1 flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-gray-100 shadow-inner">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
