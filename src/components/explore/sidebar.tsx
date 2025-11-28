"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/explore/search"
import Results from "./result_sidebar"
import L from "leaflet"

export default function Sidebar({ map }: { map: any }) {
  // Marker refs for from/to
  const markerFromRef = useRef<any>(null)
  const markerToRef = useRef<any>(null)
  const [coords_1, setCoords_1] = useState<[number, number] | null>(null)
  const [coords_2, setCoords_2] = useState<[number, number] | null>(null)
  const [showResults, setShowResults] = useState(false)

  const lineRef = useRef<any>(null)

  useEffect(() => {
    if (!map) return

    if (lineRef.current) {
      try { map.removeLayer(lineRef.current) } catch (e) {}
      lineRef.current = null
    }

    if (coords_1 && coords_2) {
      try {
        const line = L.polyline([coords_1, coords_2], {
          color: "#8b5c2e",
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1,
        }).addTo(map)

        lineRef.current = line
        try {
          map.fitBounds(line.getBounds())
        } catch (e) {}

        map.distance(coords_1, coords_2)
      } catch (e) {}
    }
  }, [coords_1, coords_2, map])


  const handleCoorChange = (x: number, y: number, coor: number) => {
    const idx = Number(coor)
    if (!map) return

    if (idx === 2) {
      if (markerToRef.current) {
        try { map.removeLayer(markerToRef.current) } catch (e) {}
        markerToRef.current = null
      }
      setCoords_2([y, x])
      markerToRef.current = L.marker([y, x]).addTo(map)
    } else {
      if (markerFromRef.current) {
        try { map.removeLayer(markerFromRef.current) } catch (e) {}
        markerFromRef.current = null
      }
      setCoords_1([y, x])
      markerFromRef.current = L.marker([y, x]).addTo(map)
    }
  }

  return (
    <div 
      className="flex flex-col h-full w-full p-4 gap-6 transition-all duration-300 pt-20"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fffaf5 100%)",
        borderRight: "2px solid rgba(139, 92, 46, 0.15)"
      }}
    >
      {/* ======================= */}
      {/*      INPUT LOKASI      */}
      {/* ======================= */}
      {!showResults && (
        <div className="flex flex-col gap-6 h-full animate-in fade-in duration-300">
          <div className="transition-all duration-200 hover:translate-x-1">
            <label 
              className="text-sm font-semibold mb-2 block" 
              style={{ color: "#6b4423" }}
            >
              Dari mana?
            </label>
            <SearchBar map={map} onCoorChange={handleCoorChange} no={1} />
          </div>

          <div className="transition-all duration-200 hover:translate-x-1">
            <label 
              className="text-sm font-semibold mb-2 block" 
              style={{ color: "#6b4423" }}
            >
              Ke mana?
            </label>
            <SearchBar map={map} onCoorChange={handleCoorChange} no={2} />
          </div>

          <div className="pt-4 mt-auto flex gap-2">
            <Button
              className="w-full/2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              style={{
                background: coords_1 && coords_2 
                  ? "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)"
                  : "rgba(139, 92, 46, 0.4)",
                color: "white",
                border: "none"
              }}
              onClick={() => setShowResults(true)}
              disabled={!coords_1 || !coords_2}
            >
              Tampilkan hasil
            </Button>    
            <Button
              className="w-full/2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#6b4423",
                border: "2px solid #8b5c2e"
              }}
              onClick={() => {
                if (markerFromRef.current) {
                  try { map.removeLayer(markerFromRef.current) } catch (e) {}
                  markerFromRef.current = null
                }
                if (markerToRef.current) {
                  try { map.removeLayer(markerToRef.current) } catch (e) {}
                  markerToRef.current = null
                }
                if (lineRef.current) {
                  try { map.removeLayer(lineRef.current) } catch (e) {}
                  lineRef.current = null
                }
                setCoords_1(null)
                setCoords_2(null)
              }}
            >
              Reset lokasi
            </Button>
          </div>
        </div>
      )}

      {/* ======================= */}
      {/*      HALAMAN RINGKASAN */}
      {/* ======================= */}
      {showResults && (
        <div className="flex flex-col gap-4 h-full animate-in fade-in duration-300">
          <label 
            className="text-sm font-semibold" 
            style={{ color: "#6b4423" }}
          >
            Ringkasan
          </label>
          <div className="grow overflow-auto">
            <Results />
          </div>

          <div className="pt-2 mt-auto">
            <Button
              className="w-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#6b4423",
                border: "2px solid #8b5c2e"
              }}
              onClick={() => {
                setShowResults(false)
                if (markerFromRef.current) {
                  try { map.removeLayer(markerFromRef.current) } catch (e) {}
                  markerFromRef.current = null
                }
                if (markerToRef.current) {
                  try { map.removeLayer(markerToRef.current) } catch (e) {}
                  markerToRef.current = null
                }
                if (lineRef.current) {
                  try { map.removeLayer(lineRef.current) } catch (e) {}
                  lineRef.current = null
                }
                setCoords_1(null)
                setCoords_2(null)
              }}
            >
              Ubah lokasi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
