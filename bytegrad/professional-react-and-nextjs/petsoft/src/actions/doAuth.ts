"use server"

import { signIn } from "@/lib/auth"

export default async function doAuth(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("formData is not an instance of FormData")
  }
  await signIn("credentials", formData)
}
