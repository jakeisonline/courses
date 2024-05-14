import { EventoEvent } from "@prisma/client"
import EventCard from "./eventCard"
import { getEvents } from "@U"

type EventsListProps = {
  city: string
}

export default async function EventsList({ city }: EventsListProps) {
  const events: EventoEvent[] = await getEvents(city)

  return (
    <section className="flex flex-wrap gap-10 max-w-[1110px] justify-center px-[20px]">
      {events.map((event: EventoEvent) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
