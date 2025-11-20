import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import SearchBar from "@/components/explore/search"
// import { map } from "astro:schema"
// import 'leaflet/dist/leaflet.css';
// import '@types/leaflet';
import L from "leaflet";
import Results from "./result_sidebar"

export function Sidebar({ map }: { map: any }) {
  const [coords_1, setCoords_1] = useState<[number, number] | null>(null)
  const [coords_2, setCoords_2] = useState<[number, number] | null>(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    console.log("Count changed:", coords_1, coords_2);
    if (coords_1 && coords_2 && map) {
      const line = L.polyline([coords_1, coords_2], {
        color: 'red',      
        weight: 3,         
        opacity: 0.7,      
        smoothFactor: 1,  
      }).addTo(map);
      map.fitBounds(line.getBounds());
      const distance = map.distance(coords_1, coords_2);
      console.log("Distance between points:", distance, "meters");
    }
  }, [coords_1, coords_2, map]); 

  const handleCoorChange = (x: number, y: number, coor: number) => {
    // x is longitude, y is latitude, but Leaflet expects [latitude, longitude]
    if (coor == 2) setCoords_2([y, x] as [number, number])
    else setCoords_1([y, x] as [number, number])
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm gap-6 p-4">
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div>
          <label className="text-sm font-medium">From where?</label>
          <div className="relative">
            <SearchBar map={map} onCoorChange={handleCoorChange} no="1"></SearchBar>
            {/* <Input placeholder="Search..." className="pr-20" /> */}
            {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
            {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">12 results</span> */}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">To where?</label>
          <div className="relative">
            <SearchBar map={map} onCoorChange={handleCoorChange} no="2"></SearchBar>
            {/* <Input placeholder="Search..." className="pr-20" /> */}
            {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
            {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">12 results</span> */}
          </div>
        </div>
        <div>
          <div className="relative">
          {showResults && ( 
            <div>
              <label className="text-sm font-medium">result</label>
              <Results></Results>
            </div>
          )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={()=>setShowResults(true)}>Show result</Button>
      </div>
    </div>
  )
}
