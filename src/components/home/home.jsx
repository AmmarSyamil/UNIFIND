"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import FeaturePage from "./feature";

const BG_GRADIENTS = [
  "linear-gradient(135deg, #ffe8c7 0%, #ffdcb1 40%, #c9e4ff 100%)",
  "linear-gradient(135deg, #ffdcb1 0%, #c9e4ff 50%, #ffe8c7 100%)",
  "linear-gradient(135deg, #c9e4ff 0%, #ffe8c7 50%, #ffdcb1 100%)",
  "linear-gradient(135deg, #ffe8c7 0%, #c9e4ff 50%, #ffdcb1 100%)",
  "linear-gradient(135deg, #c9e4ff 0%, #ffdcb1 40%, #ffe8c7 100%)",
];

export default function Main() {
  const featureRef = useRef(null);

  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const size = 3 + Math.random() * 7;
      return {
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        background: `rgba(180, 200, 255, ${0.3 + Math.random() * 0.3})`,
        boxShadow: `0 0 ${12 + Math.random() * 20}px rgba(120, 150, 255, 0.4)`,
        yTravel: (Math.random() - 0.5) * 60,
        xTravel: (Math.random() - 0.5) * 40,
        duration: 3 + Math.random() * 4,
      };
    });
  }, []);

  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % BG_GRADIENTS.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to Feature section
  const scrollToFeature = () => {
    featureRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-5">
      <motion.div
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6"
        animate={{ background: BG_GRADIENTS[gradientIndex] }}
        transition={{ duration: 6, ease: "anticipate" }}
        style={{ background: BG_GRADIENTS[0] }}
      >
        {/* Floating soft particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.background,
              boxShadow: p.boxShadow,
            }}
            animate={{
              y: [0, p.yTravel, 0],
              x: [0, p.xTravel, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.25, 1],
            }}
            transition={{ duration: p.duration, repeat: Infinity }}
          />
        ))}

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              background: "rgba(139, 92, 46, 0.15)",
              border: "2px solid rgba(139, 92, 46, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="text-sm font-semibold" style={{ color: "#6b4423" }}>
              📘 Temukan Universitas Impianmu
            </span>
          </motion.div>

          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
            style={{
              color: "#2d3748",
              textShadow:
                "0 2px 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.6)",
              letterSpacing: "-0.02em",
            }}
          >
            Unifind
          </h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              color: "#4a5568",
              textShadow: "0 1px 20px rgba(255, 255, 255, 0.8)",
            }}
          >
            Platform Pencarian Universitas Terpadu
          </motion.p>

          <motion.p
            className="text-base md:text-lg lg:text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ color: "#5a5a5a" }}
          >
            Jelajahi universitas, program studi, dan rekomendasi yang cocok untukmu.
          </motion.p>

          {/* Stats → replaced with icons */}
          <motion.div
            className="flex flex-wrap justify-center gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { icon: "🎓", label: "Universitas Terverifikasi" },
              { icon: "📚", label: "Program Studi Lengkap" },
              { icon: "🌏", label: "Rekomendasi Personal" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#8b5c2e" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {/* Go to /signup */}
            <a href="/signup">
              <button
                className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)",
                  color: "white",
                }}
              >
                Mulai Eksplorasi
              </button>
            </a>

            {/* Scroll to feature section */}
            <button
              onClick={scrollToFeature}
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#6b4423",
                border: "2px solid #8b5c2e",
              }}
            >
              Lihat Fitur
            </button>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Feature Section */}
      <div ref={featureRef}>
        <FeaturePage />
      </div>
    </div>
  );
}
