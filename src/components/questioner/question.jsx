"use client";

import { memo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const labels = {
  1: "Sangat Rendah",
  2: "Rendah",
  3: "Netral",
  4: "Tinggi",
  5: "Sangat Tinggi",
};

const badgeColors = {
  1: "bg-red-100 text-red-600 border-red-300",
  2: "bg-orange-100 text-orange-600 border-orange-300",
  3: "bg-gray-100 text-gray-600 border-gray-300",
  4: "bg-lime-100 text-lime-600 border-lime-300",
  5: "bg-green-100 text-green-600 border-green-300",
};

const colors = {
  1: "border-red-400 text-red-500 hover:bg-red-50",
  2: "border-orange-300 text-orange-500 hover:bg-orange-50",
  3: "border-gray-400 text-gray-600 hover:bg-gray-50",
  4: "border-lime-400 text-lime-600 hover:bg-lime-50",
  5: "border-green-500 text-green-600 hover:bg-green-50",
};

const selectedColors = {
  1: "bg-red-500 text-white hover:bg-red-600",
  2: "bg-orange-400 text-white hover:bg-orange-500",
  3: "bg-gray-500 text-white hover:bg-gray-600",
  4: "bg-lime-500 text-white hover:bg-lime-600",
  5: "bg-green-500 text-white hover:bg-green-600",
};

const Question = ({ title, description, nilai, onResultChange }) => {
  return (
    <Card
      className="
        w-full shadow-sm border border-muted/50 rounded-xl transition-all duration-200 
        hover:shadow-lg hover:scale-[1.015]
      "
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center gap-3 mt-3">
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = nilai === num;
            return (
              <div key={num} className="flex flex-col items-center">
                <Button
                  variant="outline"
                  onClick={() => onResultChange(num)}
                  className={`
                    w-10 h-10 p-0 rounded-full border 
                    transition-all duration-150 active:scale-90
                    hover:shadow-md hover:-translate-y-0.5
                    ${
                      isSelected
                        ? selectedColors[num]
                        : `${colors[num]} bg-white`
                    }
                  `}
                >
                  {num}
                </Button>
                <span className="text-[11px] mt-1 text-muted-foreground text-center w-14 leading-tight">
                  {labels[num]}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>

      <CardFooter>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${badgeColors[nilai]}
            transition-all duration-200`}
        >
          <span>Pilihan Kamu:</span>
          <span>{nilai} ({labels[nilai]})</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(Question);
