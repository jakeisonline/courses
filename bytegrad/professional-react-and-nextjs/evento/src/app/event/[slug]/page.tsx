import H1 from "@/components/h1"
import Image from "next/image"

type EventPageProps = {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${params.slug}`,
  )

  const event = await response.json()

  return (
    <main>
      <section className="relative flex justify-center items-center">
        <Image
          src={event.imageUrl}
          className="z-0 object-cover blur-3xl"
          alt="Event background image"
          fill
          quality={40}
          sizes="(max-width: 1280px) 100vw,1280px"
          priority
        />
        <div className="z-1 flex flex-col lg:flex-row relative gap-6 lg:gap-x-16 py-14 md:py-20">
          <Image
            src={event.imageUrl}
            className="z-1 relative rounded-lg object-cover"
            alt={event.name}
            width={300}
            height={201}
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap">{event.name}</H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organised by <em>{event.organizerName}</em>
            </p>
            <button className="bg-white/20 text-lg mt-5 lg:mt-auto w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 bg-blur state-effects">
              GET TICKETS
            </button>
          </div>
        </div>
      </section>

      <div className="text-center px-5 pb-8">
        <EventSection heading="About this event" body={event.description} />
        <EventSection heading="Location" body={event.location} />
      </div>
    </main>
  )
}

type EventSectionProps = {
  heading: string
  body: string
}

function EventSection({ heading, body }: EventSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-white text-2xl mb-4">{heading}</h2>
      <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
        {body}
      </p>
    </section>
  )
}
