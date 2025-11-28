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


export default function PeopleCounselorPopup({ open, onClose, person }) {
  const [date, setDate] = React.useState(null);
  const [showPayment, setShowPayment] = React.useState(false);

  const availableDates = [
    new Date(2025, 10, 15),
    new Date(2025, 10, 18),
    new Date(2025, 10, 21),
    new Date(2025, 10, 26),
  ];

  if (!person) return null;

  const normalize = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const isAvailable = (day) =>
    availableDates.some((d) => normalize(d) === normalize(day));

  return (
    <>
      {/* POPUP UTAMA */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="!fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-[900px] sm:max-w-[900px] max-h-[90vh] p-8 rounded-2xl shadow-xl flex flex-col"
          style={{
            background: "linear-gradient(180deg, #fff8f0 0%, #fffaf5 100%)",
            border: "2px solid rgba(139, 92, 46, 0.2)"
          }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle 
              className="text-3xl font-semibold"
              style={{ color: "#6b4423" }}
            >
              {person.name}
            </DialogTitle>
            <DialogDescription
              className="text-base"
              style={{ color: "#8b5c2e" }}
            >
              {person.desc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-1 gap-8 overflow-visible">
            {/* PANEL KIRI */}
            <div className="w-[45%] pr-4 flex flex-col">
              <div className="space-y-2 text-[15px] leading-snug">
                <p style={{ color: "#4a5568" }}>
                  <span 
                    className="font-semibold"
                    style={{ color: "#6b4423" }}
                  >
                    Keahlian:
                  </span>{" "}
                  {person.specialties.join(", ")}
                </p>
                <p style={{ color: "#4a5568" }}>
                  <span 
                    className="font-semibold"
                    style={{ color: "#6b4423" }}
                  >
                    Email:
                  </span>{" "}
                  {person.email}
                </p>
                <p style={{ color: "#4a5568" }}>
                  <span 
                    className="font-semibold"
                    style={{ color: "#6b4423" }}
                  >
                    Nomor Telepon:
                  </span>{" "}
                  {person.phone}
                </p>
              </div>

              {date && (
                <div 
                  className="mt-6 text-sm font-medium p-3 rounded-lg transition-all duration-300"
                  style={{
                    color: "#6b4423",
                    background: "rgba(139, 92, 46, 0.1)",
                    border: "2px solid rgba(139, 92, 46, 0.3)"
                  }}
                >
                  Jadwal Dipilih:{" "}
                  <span className="font-semibold">
                    {date.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              <div className="flex-1" />

              <Button
                disabled={!date}
                className={`w-fit px-8 py-5 text-base self-start font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  date ? "opacity-100" : "opacity-50"
                }`}
                style={{
                  background: date 
                    ? "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)"
                    : "rgba(139, 92, 46, 0.4)",
                  color: "white",
                  border: "none"
                }}
                onClick={() => setShowPayment(true)}
              >
                Ajukan Sesi Konseling
              </Button>
            </div>

            {/* PANEL KANAN */}
            <div 
              className="w-[55%] rounded-xl shadow-sm p-4 overflow-visible transition-all duration-300 hover:shadow-md"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "2px solid rgba(139, 92, 46, 0.2)"
              }}
            >
              <div className="pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day) => {
                    if (day && isAvailable(day)) setDate(day);
                  }}
                  className="rounded-md scale-[0.92] overflow-visible"
                  showOutsideDays={true}
                  fixedWeeks={true}
                  disabled={(day) => !isAvailable(day)}
                  modifiers={{
                    available: availableDates,
                    availableHover: availableDates,
                    unavailable: (day) => !isAvailable(day),
                  }}
                  modifiersStyles={{
                    available: {
                      backgroundColor: "rgba(139, 92, 46, 0.15)",
                      color: "#6b4423",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "0.25s ease",
                      boxShadow: "0 0 8px rgba(139, 92, 46, 0.40)",
                      fontWeight: "600"
                    },
                    availableHover: {
                      backgroundColor: "rgba(139, 92, 46, 0.25)",
                      boxShadow: "0 0 14px rgba(107, 68, 35, 0.60)",
                      transform: "scale(1.06)",
                    },
                    unavailable: {
                      opacity: 0.35,
                      cursor: "not-allowed",
                    },
                  }}
                />

                <p 
                  className="text-xs mt-2 pl-1"
                  style={{ color: "#8b5c2e" }}
                >
                  Hanya tanggal berwarna coklat yang tersedia untuk pemesanan sesi konseling.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* POPUP PEMBAYARAN */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent 
          className="p-8 rounded-2xl max-w-[420px] transition-all duration-300"
          style={{
            background: "linear-gradient(180deg, #fff8f0 0%, #fffaf5 100%)",
            border: "2px solid rgba(139, 92, 46, 0.2)"
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="text-xl font-semibold"
              style={{ color: "#6b4423" }}
            >
              Pembayaran Konseling
            </DialogTitle>

            <DialogDescription 
              className="text-sm"
              style={{ color: "#8b5c2e" }}
            >
              Silakan scan kode QR di bawah untuk melakukan pembayaran sesi konseling.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center mt-4">
            <p 
              className="text-lg font-semibold mb-2"
              style={{ color: "#6b4423" }}
            >
              Harga: Rp 15.000
            </p>

            {/* QR IMAGE */}
            <img
              src="/public/qr.png"
              alt="QR Pembayaran"
              className="w-64 h-64 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
              style={{ border: "2px solid rgba(139, 92, 46, 0.2)" }}
            />

            <Button
              className="mt-6 w-full py-5 text-base font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)",
                color: "white",
                border: "none"
              }}
              onClick={() => setShowPayment(false)}
            >
              Selesai
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
