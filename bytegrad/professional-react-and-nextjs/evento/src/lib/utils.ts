import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TEventsApiResponse } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getEvents(city: string) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    { next: { revalidate: 300 } },
  )

  const events: TEventsApiResponse = await response.json()

  return events
}

export async function getEvent(slug: string) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
    { next: { revalidate: 300 } },
  )

  const event = await response.json()

  return event
}
