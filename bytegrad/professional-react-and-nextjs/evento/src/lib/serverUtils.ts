import "server-only"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PER_PAGE } from "@C"
import { unstable_cache } from "next/cache"
import { getCityNameUpperCase } from "@U"

export const getEvents = unstable_cache(
  async (city: string, page: number = 1) => {
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
  },
)

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  })

  if (!event) {
    return notFound()
  }

  return event
})
