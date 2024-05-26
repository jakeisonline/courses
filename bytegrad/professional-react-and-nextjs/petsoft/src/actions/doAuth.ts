"use server"

import { signIn } from "@/lib/auth"
import email from "next-auth/providers/email"

export default async function doAuth(formData: any) {
  const authData = Object.fromEntries(formData.entries())

  await signIn("credentials", authData)
}
