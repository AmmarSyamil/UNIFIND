"use client";

import SectionHero from "./Sectionhero";
import SectionContent from "./SectionContent";
import { Button } from "@/components/ui/button";

const particlesOpts = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 40 },
    opacity: { value: 0.06 },
    move: { enable: true, speed: 0.4 },
    links: { enable: false },
  },
};

export default function UniwisePage() {
  return (
    <div className="w-full overflow-hidden">
      <SectionHero
        title="Uniwise — Info Kampus Lengkap"
        subtitle="Database universitas paling lengkap untuk siswa Indonesia."
        description="Ketahui syarat masuk, nilai minimum, jalur penerimaan, peluang beasiswa, akreditasi, ranking, dan gambaran kehidupan kampus — semuanya dalam satu platform."
        particleOptions={particlesOpts}
      >
        <Button size="lg" className="bg-amber-50 text-[#07203a]" asChild>
          <a href="/uniwise/search">Lihat Database Universitas</a>
        </Button>
      </SectionHero>

      <SectionContent title="Data Lengkap & Terverifikasi">
        <p className="text-gray-700 max-w-4xl leading-relaxed">
          Uniwise mengumpulkan ratusan data penting mulai dari akreditasi,  
          nilai rata-rata penerimaan, tingkat kompetitif, hingga kehidupan  
          mahasiswa di sekitar kampus — semuanya untuk membantu kamu memilih  
          universitas dengan lebih percaya diri dan terinformasi.
        </p>
      </SectionContent>
    </div>
  );
}
