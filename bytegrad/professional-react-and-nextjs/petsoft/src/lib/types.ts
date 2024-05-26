import { Pet } from "@prisma/client"
import { z } from "zod"
import { authSchema } from "@/lib/validations"

export type TPet = Pet

export type TMutatingPet = Omit<TPet, "id" | "createdAt" | "updatedAt">

export type TErrorMutatePet =
  | {
      message: string
    }
  | undefined

export type TPromisePet = {
  error: TErrorMutatePet | undefined
  response: TPet | undefined
}

export type TAuth = z.infer<typeof authSchema>
