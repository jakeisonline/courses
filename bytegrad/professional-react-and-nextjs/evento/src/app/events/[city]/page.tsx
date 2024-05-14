import EventsList from "@/components/eventsList"
import H1 from "@/components/h1"
import { Suspense } from "react"
import Loading from "./loading"
import { Metadata } from "next"
import { getCityNameUpperCase } from "@U"

type PageProps = {
  params: {
    city: string
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
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

export default async function EventsPage({ params }: PageProps) {
  const cityName = getCityNameUpperCase(params.city)

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {cityName && cityName === "All" && "All Events"}
        {cityName && cityName !== "All" && `Events in ${cityName}`}
      </H1>

      <Suspense fallback={<Loading />}>
        <EventsList city={params.city} />
      </Suspense>
    </main>
  )
}
