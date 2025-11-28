"use client";

import * as React from "react";
import PeopleCounselorPopup from "./people-popup.jsx";
import { NavigationMenuMain } from "@/layouts/navigation.jsx";

// Lucide icons
import { GraduationCap, Users, Brain } from "lucide-react";

export default function TeamPage() {
  const members = [
    {
      name: "Dr. Lestari Widyaningsih",
      desc: "Konselor pendidikan berpengalaman yang membantu siswa menemukan jurusan sesuai potensi.",
      specialties: ["Penentuan Jurusan Kuliah", "Minat & Bakat", "Psikotes Akademik", "Perencanaan Karier"],
      image: "/lestari.jpg",
      phone: "+62 812-7788-1122",
      email: "lestari@konselingkampus.id",
    },
    {
      name: "Budi Santoso, M.Psi.",
      desc: "Psikolog pendidikan yang berfokus pada pemetaan minat, bakat, dan gaya belajar.",
      specialties: ["Tes Minat Bakat", "Pemetaan Jurusan", "Gaya Belajar", "Karier Mahasiswa"],
      image: "/budi.png",
      phone: "+62 813-6655-9988",
      email: "budi@konselingkampus.id",
    },
    {
      name: "Anisa Putri Rahmadani",
      desc: "Konselor karier yang membantu menentukan jurusan berdasarkan tujuan jangka panjang siswa.",
      specialties: ["Career Planning", "Jurusan Kuliah", "Self-Discovery", "Arah Masa Depan"],
      image: "/anisa.jpg",
      phone: "+62 811-5522-4477",
      email: "anisa@konselingkampus.id",
    },
  ];

  const [selectedPerson, setSelectedPerson] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const openPopup = (person) => {
    setSelectedPerson(person);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedPerson(null);
  };

  return (
    <div className="relative">
      <NavigationMenuMain />

      <div className="min-h-screen w-full bg-[#FFF8E7] py-20">

        {/* HEADING */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#6b4423]">
            Temui Para Konselor Kami
          </h1>

          {/* 3 ICONS */}
          <div className="flex justify-center gap-6 mb-6">
            <GraduationCap className="w-12 h-12 text-[#6b4423]" />
            <Users className="w-12 h-12 text-[#6b4423]" />
            <Brain className="w-12 h-12 text-[#6b4423]" />
          </div>

          <p className="text-[#8b5c2e] text-lg max-w-2xl mx-auto">
            Para profesional berpengalaman yang siap membantu Anda menemukan
            jurusan kuliah, arah karier, serta pengembangan diri yang tepat.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {members.map((m, idx) => (
            <div
              key={idx}
              onClick={() => openPopup(m)}
              className="cursor-pointer bg-[#FFF8E7] rounded-xl border border-[#8b5c2e]/30 shadow-md
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-4 border border-[#8b5c2e]/30">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold mb-1 text-[#6b4423]">{m.name}</h2>

              <p className="text-[#8b5c2e] text-sm mb-3 line-clamp-2">
                {m.desc}
              </p>

              <p className="text-sm text-[#6b4423]">
                <span className="font-semibold">Keahlian:</span>{" "}
                {m.specialties.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* POPUP */}
        <PeopleCounselorPopup
          open={popupOpen}
          onClose={closePopup}
          person={selectedPerson}
        />
      </div>
    </div>
  );
}
