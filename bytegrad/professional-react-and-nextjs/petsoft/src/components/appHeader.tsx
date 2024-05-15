"use client"

import Link from "next/link"
import Logo from "./logo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
]

export default function AppHeader() {
  const activePathname = usePathname()

  return (
    <header className="flex items-center justify-between border-b border-white/10 py-4">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-sm">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "rounded-md px-3 py-2 text-white/70 transition hover:text-white focus:text-white",
                  {
                    "bg-black/10 text-white": activePathname === route.path,
                  },
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
