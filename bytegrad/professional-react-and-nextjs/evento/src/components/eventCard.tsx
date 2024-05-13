import { TEvent } from "@T"
import Image from "next/image"
import Link from "next/link"

type EventCardProps = {
  event: TEvent
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${event.slug}`}
    >
      <section className="relative flex flex-col w-full h-full bg-white/[3%] rounded-xl overflow-hidden state-effects">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />
        <div className="flex flex-col flex-1 justify-center items-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">by {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section>
          <p className="absolute flex items-center justify-center flex-col left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md">
            <span className="text-xl font-bold -mb-[5px]">
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "2-digit",
              })}
            </span>
            <span className="text-xs uppercase text-accent">
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
          </p>
        </section>
      </section>
    </Link>
  )
}
