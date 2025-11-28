"use client";

import { useState } from "react";
import CardItem from "./card-item.jsx";
import SearchBar from "./search-bar.jsx";
import { NavigationMenuMain } from "@/layouts/navigation.jsx";

export default function Main() {
  const [search, setSearch] = useState("");


  const data = [
    {
      title: "Ilmu Komputer",
      subtitle: "Universitas Indonesia – Fasilkom",
      desc: "Jurusan favorit di era digital; fokus pada sistem, pemrograman, algoritma, dan teknologi informasi.",
      image: "/ui.png",
      raporAvg: "91.01",
      snbtAvg: "716.15",
      acceptanceRate: "≈ 3%"
    },
    {
      title: "Teknik Elektro",
      subtitle: "Institut Teknologi Bandung – STEI",
      desc: "Mengkaji kelistrikan, elektronika, sistem kontrol — cocok untuk yang tertarik hardware & software.",
      image: "/itb.png",
      raporAvg: "89.99",
      snbtAvg: "718.73",
      acceptanceRate: "≈ 5–10%"
    },
    {
      title: "Teknik Mesin",
      subtitle: "Universitas Indonesia – Fakultas Teknik (FTUI)",
      desc: "Bidang mekanika, dinamik, dan desain mesin — jurusan teknik yang kuat di UI.",
      image: "/ui.png",
      raporAvg: "87.63",
      snbtAvg: "683.42",
      acceptanceRate: "≈ 5–10%"
    },
    {
      title: "Teknik Sipil",
      subtitle: "Institut Teknologi Bandung – FTSL",
      desc: "Belajar konstruksi, infrastruktur, dan perencanaan bangunan/perkotaan.",
      image: "/itb.png",
      raporAvg: "91.11",
      snbtAvg: "718.73",
      acceptanceRate: "≈ 5–10%"
    },
    {
      title: "Manajemen",
      subtitle: "Universitas Gadjah Mada – FEB UGM",
      desc: "Studi bisnis, manajemen, ekonomi — populer bagi calon wirausahawan dan profesional bisnis.",
      image: "/ugm.png",
      raporAvg: "92.78",
      snbtAvg: "702.48",
      acceptanceRate: "Data not available"
    },
    {
      title: "Psikologi",
      subtitle: "Universitas Gadjah Mada – Fakultas Psikologi",
      desc: "Mempelajari perilaku, kesehatan mental, dan aspek psikologis — bidang humaniora & sosial.",
      image: "/ugm.png",
      raporAvg: "Data not available",
      snbtAvg: "775",
      acceptanceRate: "Data not available"
    },
    {
      title: "Farmasi",
      subtitle: "Universitas Airlangga – Fakultas Farmasi",
      desc: "Bidang kesehatan: obat, riset farmasi, dan layanan kesehatan.",
      image: "/unair.png",
      raporAvg: "≈ 68%",
      snbtAvg: "≈ 67%",
      acceptanceRate: "Data not available"
    },
    {
      title: "Arsitektur",
      subtitle: "Institut Teknologi Bandung – SAPPK",
      desc: "Perpaduan seni dan teknik: desain bangunan, perencanaan ruang, urban design.",
      image: "/itb.png",
      raporAvg: "93.15",
      snbtAvg: "718.73",
      acceptanceRate: "Data not available"
    },
    {
      title: "Agribisnis",
      subtitle: "Institut Pertanian Bogor – Fakultas Pertanian",
      desc: "Fokus pada agrikultur, agribisnis, dan pengelolaan sumber daya alam.",
      image: "/ipb.png",
      raporAvg: "93.22",
      snbtAvg: "≈ 68%",
      acceptanceRate: "Data not available"
    },
    {
      title: "Ilmu Komunikasi",
      subtitle: "Universitas Padjadjaran – Fikom",
      desc: "Media, komunikasi massa, public relations — relevan di era media & digital.",
      image: "/unpad.png",
      raporAvg: "93.66",
      snbtAvg: "703.91",
      acceptanceRate: "Data not available"
    }
  ];



  const filtered = data.filter((item) =>
    `${item.title} ${item.desc}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
    <NavigationMenuMain />
    <div className="max-w-4xl mx-auto text-center mb-16 pt-20">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#6b4423]">
            NIger malik
          </h1>

          <p className="text-[#8b5c2e] text-lg max-w-2xl mx-auto">
            Para profesional berpengalaman yang siap membantu Anda menemukan
            jurusan kuliah, arah karier, serta pengembangan diri yang tepat.
          </p>
    </div>
    <div className="flex min-h-screen flex-col p-4 gap-4">
      <SearchBar value={search} onChange={setSearch} />

      <div className="flex flex-col gap-3">
        {filtered.map((item, idx) => (
          <CardItem key={idx} {...item} />
        ))}
      </div>
    </div>
    </div>
  );
}
