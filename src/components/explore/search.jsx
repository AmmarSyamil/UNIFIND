"use client"

import { useEffect, useState, useRef } from "react"
import { OpenStreetMapProvider } from "leaflet-geosearch"
import L from "leaflet"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function SearchBar({ map, onCoorChange, no }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [results, setResults] = useState([])
  
  const provider = new OpenStreetMapProvider({
    params: {
      countrycodes: 'id',
      viewbox: [95, -11, 141, 6],
    },
  })

  const currentMarkerRef = useRef(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await provider.search({ query: text })
    setResults(res)
    setOpen(true)
  }

  const handleSelect = (r) => {
    if (map && r) {
      map.setView([r.y, r.x], 16)
      if (currentMarkerRef.current) {
        try {
          currentMarkerRef.current.setLatLng([r.y, r.x])
        } catch {
          try { map.removeLayer(currentMarkerRef.current) } catch {}
          currentMarkerRef.current = L.marker([r.y, r.x]).addTo(map)
        }
      } else {
        currentMarkerRef.current = L.marker([r.y, r.x]).addTo(map)
      }
    }
    setText(r.label)
    setOpen(false)
    onCoorChange(r.x, r.y, no)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          placeholder="Search location..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 h-10 px-3 rounded-md"
        />
        <Button
          type="submit"
          className="h-10 px-4 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
          style={{
            background: "linear-gradient(135deg, #8b5c2e 0%, #6b4423 100%)",
            color: "white",
            border: "none",
          }}
        >
          Search
        </Button>
      </form>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* Use a wrapper div to properly attach Popover */}
          <div className="absolute top-0 left-0 w-full h-0" />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 mt-1 w-full z-[10] rounded-md border border-[#8b5c2e] bg-[#fff8f0] shadow-lg"
        >
          <Command>
            <CommandInput
              placeholder="Select location..."
              className="border-b border-[#8b5c2e]"
            />
            <CommandList>
              {results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((r, i) => (
                    <CommandItem
                      key={i}
                      value={r.label}
                      onSelect={() => handleSelect(r)}
                      className="hover:bg-[#8b5c2e] hover:text-white"
                    >
                      {r.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
