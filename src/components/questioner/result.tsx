"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ResultCard({
  imageUrl,
  title,
  description,
  onClick,
}: ResultCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-3xl flex flex-row items-center overflow-hidden cursor-pointer border transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1 hover:bg-muted/40"
      )}
      onClick={() => {
        console.log("Card clicked:", title);
        onClick?.();
      }}
    >
      {/* Left image */}
      <div className="flex-shrink-0 w-28 h-28 md:w-40 md:h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Middle text area */}
      <div className="flex flex-col justify-center flex-1 px-6 py-4">
        <CardTitle className="text-lg md:text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          {description}
        </CardDescription>
      </div>

      {/* Right icon indicating click */}
      <div className="pr-4">
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  );
}
