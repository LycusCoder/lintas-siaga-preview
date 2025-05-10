"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function GrafikBencana() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Banjir", "Gempa Bumi", "Tanah Longsor", "Kebakaran", "Lainnya"],
            datasets: [
              {
                label: "Jumlah Kejadian",
                data: [42, 12, 28, 18, 8],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
