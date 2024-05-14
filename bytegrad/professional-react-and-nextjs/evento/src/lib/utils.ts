import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "@/lib/prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getEvents(city: string) {
  const cityQuery = city === "all" ? undefined : getCityNameUpperCase(city)
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: cityQuery,
    },
  })

  return events
}

export async function getEvent(slug: string) {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  })

  return event
}

export function getCityNameUpperCase(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1)
}
