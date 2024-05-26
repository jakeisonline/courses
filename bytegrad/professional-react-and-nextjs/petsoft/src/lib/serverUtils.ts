import "server-only"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export async function getUserSession() {
  const userSession = await auth()
  if (!userSession?.user) {
    redirect("/login")
  }

  return userSession
}
