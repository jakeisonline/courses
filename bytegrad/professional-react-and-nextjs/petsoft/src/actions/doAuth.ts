"use server"

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export default async function doAuth(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("formData is not an instance of FormData")
  }

  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          }
        }
        default: {
          return {
            message: "An error occurred",
          }
        }
      }
    }

    throw error // nextjs redirect throws (away) errors, so we need to rethrow it
  }
}
