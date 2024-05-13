import { TEvent, TEventsApiResponse } from "@T"
import EventCard from "./eventCard"

type EventsListProps = {
  city: string
}

export default async function EventsList({ city }: EventsListProps) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    { next: { revalidate: 300 } },
  )
  const events: TEventsApiResponse = await response.json()

  return (
    <section className="flex flex-wrap gap-10 max-w-[1110px] justify-center px-[20px]">
      {events.map((event: TEvent) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
