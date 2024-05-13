import { TEvent, TEventsApiResponse } from "@T"
import EventCard from "./eventCard"
import { getEvents } from "@U"

type EventsListProps = {
  city: string
}

export default async function EventsList({ city }: EventsListProps) {
  const events = await getEvents(city)

  return (
    <section className="flex flex-wrap gap-10 max-w-[1110px] justify-center px-[20px]">
      {events.map((event: TEvent) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
