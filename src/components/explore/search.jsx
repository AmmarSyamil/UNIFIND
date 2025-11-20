"use client"

import { useEffect, useState } from "react"
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
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  
  const provider = new OpenStreetMapProvider({
    params: {
      countrycodes: 'id', 
      viewbox: [95, -11, 141, 6], 
      // bounded: 1, 
    },
  });
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
      L.marker([r.y, r.x]).addTo(map)
    }
    setX(r.x)
    setY(r.y)
    setText(r.label)
    setOpen(false)
    onCoorChange(r.x, r.y, no)
  }


  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex">
        <Input
          placeholder="Search location..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-l-md"
        />
        <Button type="submit" variant="outline" className="rounded-r-md">
          Search
        </Button>
      </form>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* hidden trigger — Popover opened manually */}
          <div />
        </PopoverTrigger>
        <PopoverContent className="p-0 mt-1 w-full z-[9999]">
          <Command>
            <CommandInput placeholder="Select location..." />
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
