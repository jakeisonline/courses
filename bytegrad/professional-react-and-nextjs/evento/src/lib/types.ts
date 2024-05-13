export type TEvent = {
  id: number
  name: string
  slug: string
  city: string
  location: string
  date: Date
  organizerName: string
  imageUrl: string
  description: string
  venue: string
  url: string
}

export type TEventsApiResponse = TEvent[]
