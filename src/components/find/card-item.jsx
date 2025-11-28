"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CardItem({
  title,
  subtitle,
  desc,
  image,
  raporAvg,
  snbtAvg,
  acceptanceRate,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="w-full cursor-pointer transition-transform duration-150 hover:scale-[1.01] hover:shadow-md">
          <CardContent className="flex items-center p-4 gap-4">
            <img
              src={image}
              alt={title}
              className="w-20 h-20 rounded-md object-cover"
            />

            {/* TITLE + SUBTITLE */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{title}</span>
                <span className="text-sm text-muted-foreground">
                  {subtitle}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="text-sm text-muted-foreground max-w-[40%]">
              {desc}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* POPUP */}
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <img
            src={image}
            alt={title}
            className="w-32 h-32 rounded-md object-cover mx-auto mb-4"
          />

          {/* TITLE + SUBTITLE IN POPUP */}
          <div className="flex justify-center items-center gap-2">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <span className="text-base text-muted-foreground">
              {subtitle}
            </span>
          </div>

          <DialogDescription className="text-base mt-2">
            {desc}
          </DialogDescription>
        </DialogHeader>

        {/* NEW TABLE */}
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Kriteria</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Rata-rata Nilai Rapor</TableCell>
              <TableCell>{raporAvg}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Rata-rata Nilai SNBT</TableCell>
              <TableCell>{snbtAvg}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Persentase Diterima</TableCell>
              <TableCell>{acceptanceRate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
