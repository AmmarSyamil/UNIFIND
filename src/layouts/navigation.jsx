"use client"

import * as React from "react"
import { School, MapIcon, MessageSquare, ListChecks } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function useIsMobileSafe(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [breakpoint])

  return isMobile
}



export function NavigationMenuMain() {
  const isMobile = useIsMobileSafe()

  return (
    <div className="w-full h-12 flex justify-center py-4 fixed top-0 left-0 z-50000000 bg-amber-900/10 backdrop-blur-md">

      {/* LOGO LEFT, LAYANAN CENTERED */}
      <nav className="w-full flex items-center px-4">
        {/* LOGO ON LEFT */}
        <div className="flex-shrink-0">
          <a href="/" className="px-4 py-2 rounded-xl border border-white/20 shadow-sm hover:bg-white/20 transition-all">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>
        </div>

        {/* CENTERED DROPDOWN */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-3 flex-wrap">

              {/* MAIN SERVICES */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                className="
                  px-4 py-2 rounded-xl
                  bg-white/10
                  border border-white/20
                  shadow-sm
                  hover:bg-white/20
                  transition-all
                "
                // className="bg-"

              >
                Layanan
              </NavigationMenuTrigger>

                <NavigationMenuContent
                  className="
                    backdrop-blur-xl
                    bg-white/10
                    border border-white/20
                    rounded-2xl
                    shadow-xl
                  "
                >

                  <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px] lg:grid-cols-2">
                    <MenuItem
                      title="Konseling Akademik"
                      href="/counseling"
                      icon={<MessageSquare className="w-5 h-5 text-blue-600" />}
                    >
                      Dapatkan sesi konseling pribadi untuk membantu arah studi dan masalah akademik.
                    </MenuItem>

                    <MenuItem
                      title="Cari Universitas"
                      href="/find"
                      icon={<School className="w-5 h-5 text-green-600" />}
                    >
                      Temukan informasi lengkap mengenai universitas dan program studi.
                    </MenuItem>

                    <MenuItem
                      title="Eksplorasi Kota"
                      href="/explore"
                      icon={<MapIcon className="w-5 h-5 text-orange-600" />}
                    >
                      Lihat gambaran kota dan biaya hidup.
                    </MenuItem>

                    <MenuItem
                      title="Rekomendasi Jurusan"
                      href="/questioner"
                      icon={<ListChecks className="w-5 h-5 text-purple-600" />}
                    >
                      Isi kuesioner dan dapatkan rekomendasi jurusan yang sesuai.
                    </MenuItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </div>
  )
}

function MenuItem({ title, children, href, icon }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="
            flex items-start gap-3 
            rounded-xl p-3 
            bg-white/10 
            backdrop-blur-md
            border border-white/10
            transition-all
            hover:bg-white/20
          "

        >
          <div className="mt-1">{icon}</div>
          <div>
            <div className="font-medium text-sm">{title}</div>
            <p className="text-muted-foreground text-sm leading-snug">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
