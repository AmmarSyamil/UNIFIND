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
        className="w-[1000px] h-[600px] max-w-none p-0 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #fff8f0 0%, #fffaf5 100%)",
          border: "2px solid rgba(139, 92, 46, 0.2)"
        }}
      >
        {/* HEADER */}
        <DialogHeader 
          className="px-8 pt-8 pb-6"
          style={{
            background: "linear-gradient(135deg, rgba(255, 232, 199, 0.4) 0%, rgba(255, 220, 177, 0.4) 100%)",
            borderBottom: "2px solid rgba(139, 92, 46, 0.15)"
          }}
        >
          <DialogTitle 
            className="text-3xl font-bold"
            style={{ color: "#6b4423" }}
          >
            {person.name}
          </DialogTitle>
          <DialogDescription 
            className="text-base mt-2"
            style={{ color: "#8b5c2e" }}
          >
            {person.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-8 h-[480px] px-8 py-6">
          {/* LEFT — PERSON CARD */}
          <div className="w-[350px] shrink-0">
            <div 
              className="rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "2px solid rgba(139, 92, 46, 0.2)",
                boxShadow: "0 4px 12px rgba(139, 92, 46, 0.1)"
              }}
            >
              <div className="relative mb-5 group">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    border: "2px solid rgba(139, 92, 46, 0.15)"
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, rgba(107, 68, 35, 0.3), transparent)"
                  }}
                />
              </div>

              <h2 
                className="text-xl font-bold mb-1"
                style={{ color: "#6b4423" }}
              >
                {person.name}
              </h2>

              <p 
                className="text-sm mb-4"
                style={{ color: "#8b5c2e" }}
              >
                {person.description}
              </p>

              <div className="space-y-3 text-sm">
                <div 
                  className="p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: "rgba(255, 232, 199, 0.3)",
                    border: "1px solid rgba(139, 92, 46, 0.15)"
                  }}
                >
                  <span 
                    className="font-semibold block mb-1"
                    style={{ color: "#6b4423" }}
                  >
                    Specialties
                  </span>
                  <span style={{ color: "#8b5c2e" }}>
                    {person.specialties}
                  </span>
                </div>
                
                <div 
                  className="p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: "rgba(255, 232, 199, 0.3)",
                    border: "1px solid rgba(139, 92, 46, 0.15)"
                  }}
                >
                  <span 
                    className="font-semibold block mb-1"
                    style={{ color: "#6b4423" }}
                  >
                    Email
                  </span>
                  <span style={{ color: "#8b5c2e" }}>
                    {person.email}
                  </span>
                </div>
                
                <div 
                  className="p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: "rgba(255, 232, 199, 0.3)",
                    border: "1px solid rgba(139, 92, 46, 0.15)"
                  }}
                >
                  <span 
                    className="font-semibold block mb-1"
                    style={{ color: "#6b4423" }}
                  >
                    Phone
                  </span>
                  <span style={{ color: "#8b5c2e" }}>
                    {person.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — CALENDAR */}
          <div className="flex flex-col w-full">
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: "#6b4423" }}
            >
              📅 Select an Available Date
            </h3>

            <div
              className="rounded-xl p-4 w-full flex justify-center items-center h-[360px] overflow-visible transition-all duration-300 hover:shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "2px solid rgba(139, 92, 46, 0.2)",
                boxShadow: "0 4px 12px rgba(139, 92, 46, 0.1)"
              }}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => {
                  if (isAvailable(day)) setDate(day);
                }}
                className="rounded-md scale-[0.88]"
                captionLayout="dropdown"
                disabled={(day) => !isAvailable(day)}
                modifiers={{
                  available: availableDates,
                  selected: date ? [date] : [],
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: "rgba(139, 92, 46, 0.15)",
                    color: "#6b4423",
                    borderRadius: "8px",
                    transition: "0.2s",
                    fontWeight: "600"
                  },
                  selected: {
                    backgroundColor: "#8b5c2e",
                    color: "white",
                    borderRadius: "8px",
                    transform: "scale(1.05)",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(139, 92, 46, 0.4)"
                  },
                }}
              />
            </div>

            {date && (
              <div 
                className="mt-4 p-3 rounded-lg animate-in fade-in duration-300"
                style={{
                  background: "rgba(139, 92, 46, 0.1)",
                  border: "1px solid rgba(139, 92, 46, 0.2)"
                }}
              >
                <span 
                  className="text-sm font-semibold"
                  style={{ color: "#6b4423" }}
                >
                  ✓ Selected: {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}

            <Button 
              className="mt-4 w-fit px-8 py-5 text-base font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
              disabled={!date}
              style={{
                background: date 
                  ? "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)"
                  : "rgba(139, 92, 46, 0.4)",
                color: "white",
                border: "none",
                boxShadow: date ? "0 4px 12px rgba(139, 92, 46, 0.3)" : "none"
              }}
            >
              Request Counseling Session →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}