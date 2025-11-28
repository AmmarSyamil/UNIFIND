"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function CostCard({
  title,
  city,
  city_from,
  value_from,
  value_to,
  change,
  is_change, // "naik" or "turun"
  year,
}) {
  const Icon = is_change === "naik" ? TrendingUp : TrendingDown
  const color = is_change === "naik" ? "text-green-500" : "text-red-500"

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{year}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 mt-4 pb-0">
        {/* City row */}
        <div className="flex items-center justify-between w-full max-w-md text-sm font-medium">
          <span>{city_from}</span>
          <Icon className={`h-4 w-4 ${color}`} />
          <span>{city}</span>
        </div>

        {/* Values row */}
        <div className="flex items-center justify-between w-full max-w-md">
          <span className="text-muted-foreground font-semibold">
            {value_from.toLocaleString()}k
          </span>

          <span className={`font-bold ${color}`}>
            {is_change === "naik"
              ? `+${change}% ↑`
              : `-${change}% ↓`}
          </span>

          <span className="text-muted-foreground font-semibold">
            {value_to.toLocaleString()}k
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <span className="leading-none font-medium">
          {title} berkemungkinan {is_change} {change}%.
        </span>
      </CardFooter>
    </Card>
  )
}
