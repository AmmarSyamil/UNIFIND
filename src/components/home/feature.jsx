"use client";

import { useState } from "react";
import { MessageSquare, School, MapIcon, ListChecks, ArrowRight } from "lucide-react";

export default function FeaturePage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: MessageSquare,
      title: "Konseling Akademik Personal",
      description:
        "Dapatkan arahan studi yang tepat melalui konseling 1-on-1 dengan konselor berpengalaman. Cocok untuk siswa SMA/SMK yang ingin menentukan masa depan akademik.",
      metrics: "5.000+ sesi sukses",
      color: "blue",
    },
    {
      icon: School,
      title: "Cari Universitas Impian",
      description:
        "Akses informasi lengkap mengenai universitas, jurusan, akreditasi, passing grade, hingga peluang karier di masa depan.",
      metrics: "300+ kampus terdaftar",
      color: "emerald",
    },
    {
      icon: MapIcon,
      title: "Eksplorasi Kota & Biaya Hidup",
      description:
        "Lihat gambaran kota tempat universitas berada, mulai dari biaya hidup, transportasi, keamanan, hingga suasana lingkungan.",
      metrics: "100+ kota dijelajahi",
      color: "amber",
    },
    {
      icon: ListChecks,
      title: "Rekomendasi Jurusan Berbasis AI",
      description:
        "Isi kuesioner minat dan kepribadian, lalu dapatkan jurusan paling sesuai dengan data dan preferensi kamu.",
      metrics: "Akurasi berbasis data",
      color: "violet",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50/20",
      icon: "text-blue-400",
      gradient: "from-blue-500 to-cyan-500",
      hover: "group-hover:bg-blue-100/20",
    },
    emerald: {
      bg: "bg-emerald-50/20",
      icon: "text-emerald-400",
      gradient: "from-emerald-500 to-teal-500",
      hover: "group-hover:bg-emerald-100/20",
    },
    amber: {
      bg: "bg-amber-50/20",
      icon: "text-amber-400",
      gradient: "from-amber-500 to-orange-500",
      hover: "group-hover:bg-amber-100/20",
    },
    violet: {
      bg: "bg-violet-50/20",
      icon: "text-violet-400",
      gradient: "from-violet-500 to-purple-500",
      hover: "group-hover:bg-violet-100/20",
    },
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-sm font-semibold text-violet-600 tracking-wide uppercase mb-4">
            Fitur Utama
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Semua yang kamu butuhkan untuk merencanakan masa depan
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Dibangun untuk membantu siswa di seluruh Indonesia menentukan jurusan,
            universitas, dan arah pendidikan dengan lebih percaya diri.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const c = colorClasses[feature.color];
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div
                  className={`
                    relative h-full p-8 rounded-2xl border 
                    bg-white/10 backdrop-blur-xl
                    border-white/20 shadow-lg 
                    transition-all duration-300
                    ${isHovered ? "shadow-2xl scale-[1.02]" : ""}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6
                      ${c.bg} ${c.hover} transition-colors duration-300
                    `}
                  >
                    <feature.icon className={`w-7 h-7 ${c.icon}`} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-lg">
                    {feature.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${c.gradient}`}
                    ></div>
                    {feature.metrics}
                  </div>

                  {/* Learn More */}
                  <div
                    className={`
                      mt-6 flex items-center gap-2 text-sm font-semibold
                      ${c.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    `}
                  >
                    Pelajari lebih lanjut
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Hover Glow */}
                  <div
                    className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-r ${c.gradient}
                      opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl
                    `}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">
            Bergabunglah dengan ribuan siswa yang sudah menemukan arahnya
          </p>

          <button className="
            px-8 py-4 bg-gray-900 text-white rounded-xl 
            font-semibold hover:bg-gray-800 transition-colors duration-200 
            shadow-lg hover:shadow-xl
          ">
            Mulai sekarang →
          </button>
        </div>
      </div>
    </section>
  );
}
