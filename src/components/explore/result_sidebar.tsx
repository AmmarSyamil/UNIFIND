"use client"

import { useState, useMemo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Dynamic expense pie chart with comparison"

// 🧩 Base chart config
const chartConfig = {
  amount: { label: "Amount" },
} satisfies ChartConfig

export default function Results() {
  // 🏙️ State
  const [city, setCity] = useState("Jakarta")
  const [city_from, setCity_from] = useState("Bandung")
  const [date_year, setDate_year] = useState("2024")
  const [change, setChange] = useState(25)
  const [is_change, setIs_change] = useState("naik") // or "turun"

  // 💰 Expense breakdown (for chart)
  const [data, setData] = useState([
    { kategori: "Makanan", amount: 800 },
    { kategori: "Transportasi", amount: 500 },
    { kategori: "Akomodasi", amount: 600 },
    { kategori: "Hiburan", amount: 350 },
  ])

  // 🧮 Derived totals
  const total = useMemo(() => data.reduce((sum, d) => sum + d.amount, 0), [data])
  const total_from = useMemo(
    () => Math.round(total / (1 + (is_change === "naik" ? change / 100 : -change / 100))),
    [total, change, is_change]
  )

  // 🎨 Add fill color automatically (optional)
  const chartData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        fill: `hsl(${(i * 60) % 360}, 70%, 60%)`,
      })),
    [data]
  )

  return (
    <div className="w-100 space-y-6">
      {/* 🥧 Pie chart section */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Rata-rata pengeluaran di {city}</CardTitle>
          <CardDescription>{date_year}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="kategori"
                  label
                  stroke="none"
                >
                  <LabelList
                    dataKey="kategori"
                    className="fill-background"
                    fontSize={12}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="text-muted-foreground leading-none">
            Total pengeluaran rata-rata di {city} adalah{" "}
            <span className="font-semibold text-foreground">{total.toLocaleString()}k</span> per bulan.
          </div>
        </CardFooter>
      </Card>

      {/* 🔄 Comparison section */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Perbandingan pengeluaran {city_from} → {city}</CardTitle>
          <CardDescription>{date_year}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex flex-col items-center gap-4 mt-4">
            {/* City row */}
            <div className="flex items-center justify-between w-full max-w-md text-sm font-medium">
              <span>{city_from}</span>
              {is_change === "naik" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span>{city}</span>
            </div>

            {/* Value row */}
            <div className="flex items-center justify-between w-full max-w-md">
              <span className="text-muted-foreground font-semibold">
                {total_from.toLocaleString()}k
              </span>

              <span
                className={`font-bold ${
                  is_change === "naik" ? "text-green-500" : "text-red-500"
                }`}
              >
                {is_change === "naik"
                  ? `+${change}% ↑`
                  : `-${change}% ↓`}
              </span>

              <span className="text-muted-foreground font-semibold">
                {total.toLocaleString()}k
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Pengeluaran anda berkemungkinan {is_change} {change}% dari tempat asal anda.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
