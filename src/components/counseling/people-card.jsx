"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function PeoplePopup({ open, onClose, person }) {
  const [date, setDate] = React.useState(null);

  // Pre-configured available dates
  const availableDates = [
    new Date(2025, 0, 15),
    new Date(2025, 0, 18),
    new Date(2025, 0, 21),
    new Date(2025, 0, 26),
  ];

  if (!person) return null;

  // Check if a date is in availableDates
  const isAvailable = (day) =>
    availableDates.some(
      (d) =>
        d.getFullYear() === day.getFullYear() &&
        d.getMonth() === day.getMonth() &&
        d.getDate() === day.getDate()
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[1000px]
          h-[600px]
          max-w-none
          p-8
          rounded-2xl
          shadow-xl
          overflow-hidden 
        "
      >
        {/* HEADER */}
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-semibold">
            {person.name}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {person.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-8 h-[480px]">
          {/* LEFT — PERSON CARD */}
          <div className="w-[350px] shrink-0">
            <div className="border rounded-xl shadow-sm p-5 h-full">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-48 object-cover rounded-xl mb-5"
              />

              <h2 className="text-xl font-semibold mb-1">{person.name}</h2>

              <p className="text-muted-foreground text-sm mb-3">
                {person.description}
              </p>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Specialties:</span>{" "}
                  {person.specialties}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {person.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {person.phone}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — CALENDAR */}
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-semibold mb-3">
              Select an Available Date
            </h3>

            <div
              className="
                border rounded-xl shadow-sm 
                p-2 
                w-full 
                flex justify-center 
                items-center 
                h-[360px]      /* smaller calendar height */
                overflow-visible
              "
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => {
                  if (isAvailable(day)) setDate(day);
                }}
                className="rounded-md scale-[0.88]"   // Slightly smaller
                captionLayout="dropdown"
                disabled={(day) => !isAvailable(day)}
                modifiers={{
                  available: availableDates,
                  selected: date ? [date] : [],
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: "rgba(59,130,246,0.15)",
                    color: "#2563eb",
                    borderRadius: "8px",
                    transition: "0.2s",
                  },
                  selected: {
                    backgroundColor: "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    transform: "scale(1.05)",
                  },
                }}
              />
            </div>

            <Button className="mt-4 w-fit px-8 py-5 text-base">
              Request Counseling Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
