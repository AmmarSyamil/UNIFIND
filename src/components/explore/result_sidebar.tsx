"use client"

import { useMemo } from "react"
import {
  TrendingUp,
  TrendingDown,
  UtensilsCrossed,
  Bus,
  Bed,
  Smile,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function Results({
  city = "Jakarta",
  previousCity = "Bandung",
  year = 2024,
  change = 25,
  isChange = "naik",
}) {
  const data = {
    city,
    previousCity,
    year,
    change,
    isChange,
    data: [
      { kategori: "Makanan", amount: 800, icon: UtensilsCrossed },
      { kategori: "Transportasi", amount: 500, icon: Bus },
      { kategori: "Akomodasi", amount: 600, icon: Bed },
      { kategori: "Hiburan", amount: 350, icon: Smile },
    ],
  }

  const total = useMemo(
    () => data.data.reduce((a, b) => a + b.amount, 0),
    [data.data]
  )

  return (
    <div className="flex flex-col gap-6">

      {/* MAIN SUMMARY CARD with hover animation */}
      <Card
        className="
          shadow-lg border border-gray-200 
          hover:shadow-xl 
          hover:scale-[1.02]
          transition-all duration-300 
        "
      >
        <CardHeader>
          <CardTitle>Total Living Cost — {city}</CardTitle>
          <CardDescription>{year}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-extrabold">{total.toLocaleString()}k</div>
            <p className="text-muted-foreground text-sm">per bulan</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-3">
            <span className="text-sm font-medium">{previousCity}</span>

            {isChange === "naik" ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}

            <span className="text-sm font-medium">{city}</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-1">
          <div
            className={`font-semibold text-center ${
              isChange === "naik" ? "text-green-600" : "text-red-600"
            }`}
          >
            {isChange === "naik" ? `+${change}% lebih mahal` : `-${change}% lebih murah`}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Dibandingkan rata-rata pengeluaran di {previousCity}
          </p>
        </CardFooter>
      </Card>

      {/* CATEGORY CARDS — Full width, hover animation + unique progress colors */}
      {data.data.map((item, i) => {
        const Icon = item.icon
        const contribution = Math.round((item.amount / total) * 100)

        // ⭐ Unique color per card line using rotating hue
        const hue = (i * 80) % 360
        const barColor = `hsl(${hue}, 70%, 55%)`

        return (
          <Card
            key={i}
            className="
              w-full 
              shadow-sm 
              border border-gray-200 
              hover:shadow-xl 
              hover:scale-[1.02] 
              transition-all 
              duration-300 
              cursor-pointer
            "
          >
            <CardContent className="flex flex-col gap-4 py-4">

              {/* ICON + INFO */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-base">{item.kategori}</h3>
                  <p className="text-2xl font-bold">{item.amount.toLocaleString()}k</p>
                  <p className="text-sm text-muted-foreground">per bulan</p>
                </div>
              </div>

              {/* CONTRIBUTION BAR */}
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Kontribusi</span>
                  <span>{contribution}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${contribution}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>

            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
