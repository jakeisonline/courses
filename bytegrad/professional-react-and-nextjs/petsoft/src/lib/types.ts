import { Pet } from "@prisma/client"

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
