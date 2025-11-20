"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const Map = ({setMap}) => {
  const mapRef = useRef(null);
  useEffect(() => {

    if (!mapRef.current) return;
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // let marker
    // map.on("click", e => {
    //   const { lat, lng } = e.latlng
    //   if (marker) {
    //     marker.setLatLng([lat, lng])
    //   } else {
    //     marker = L.marker([lat, lng]).addTo(map)

    //   }
    // })

    setMap(map);
    return () => map.remove()
  }, [setMap])

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
}

export default Map
