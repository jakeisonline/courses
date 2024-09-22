import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!secret) {
    return new Response('Missing secret', { status: 400 })
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  draftMode().enable()
  redirect("/")
}
