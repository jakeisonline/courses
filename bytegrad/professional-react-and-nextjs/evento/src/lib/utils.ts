import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PER_PAGE } from "@C"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getEvents(city: string, page: number = 1) {
  const cityQuery = city === "all" ? undefined : getCityNameUpperCase(city)
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: cityQuery,
    },
    orderBy: {
      date: "asc",
    },
    take: PER_PAGE,
    skip: (page - 1) * PER_PAGE,
  })

  let totalCount
  if (!cityQuery) {
    totalCount = await prisma.eventoEvent.count()
  } else {
    totalCount = await prisma.eventoEvent.count({
      where: {
        city: cityQuery,
      },
    })
  }

  return { events, totalCount }
}

export async function getEvent(slug: string) {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  })

  if (!event) {
    return notFound()
  }

  return event
}

export function getCityNameUpperCase(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1)
}
