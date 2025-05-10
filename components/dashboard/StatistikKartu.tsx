import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatistikKartuProps {
  title: string
  value: string
  icon: ReactNode
  trend?: string
}

export default function StatistikKartu({ title, value, icon, trend }: StatistikKartuProps) {
  const isTrendPositive = trend?.includes("+")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && <p className={`text-xs mt-1 ${isTrendPositive ? "text-green-600" : "text-red-600"}`}>{trend}</p>}
          </div>
          <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
