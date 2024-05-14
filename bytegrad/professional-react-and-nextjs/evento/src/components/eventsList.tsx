import { EventoEvent } from "@prisma/client"
import EventCard from "./eventCard"
import { getEvents } from "@U"
import PaginationControls from "./paginationControls"
import { PER_PAGE } from "@C"

type EventsListProps = {
  city: string
  page?: number
}

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount } = await getEvents(city, page)

  const prevPath = page && page > 1 ? `/events/${city}/?page=${page - 1}` : null
  const nextPath =
    page && page < totalCount / PER_PAGE
      ? `/events/${city}/?page=${page + 1}`
      : null

  return (
    <section className="flex flex-wrap gap-10 max-w-[1110px] justify-center px-[20px]">
      {events.map((event: EventoEvent) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls prev={prevPath} next={nextPath} />
    </section>
  )
}
