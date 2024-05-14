import EventsList from "@/components/eventsList"
import H1 from "@/components/h1"
import { Suspense } from "react"
import Loading from "./loading"
import { Metadata } from "next"
import { getCityNameUpperCase } from "@U"
import { z } from "zod"
import { notFound } from "next/navigation"

type EventsPageProps = {
  params: {
    city: string
  }
  searchParams: TSearchParams
}

export function generateMetadata({ params }: EventsPageProps): Metadata {
  const cityName = getCityNameUpperCase(params.city)

  switch (cityName) {
    case "All":
      return {
        title: `Events in all cities`,
        description: `Browse events in all cities`,
      }
      break

    default:
      return {
        title: `Events in ${cityName}`,
        description: `Browse events in ${cityName}`,
      }
      break
  }
}

const pageNumberSchema = z.coerce.number().int().positive().optional()

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const cityName = getCityNameUpperCase(params.city)
  const parsedPage = pageNumberSchema.safeParse(searchParams.page)
  if (!parsedPage.success) {
    return notFound()
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {cityName && cityName === "All" && "All Events"}
        {cityName && cityName !== "All" && `Events in ${cityName}`}
      </H1>

      <Suspense key={cityName + parsedPage.data} fallback={<Loading />}>
        <EventsList city={params.city} page={parsedPage.data} />
      </Suspense>
    </main>
  )
}
