"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TMutatingPet, TPromisePet } from "@/lib/types"
import { petFormSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function addPet(petData: unknown): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  // Run validations
  const validatedPetData = petFormSchema.safeParse(petData)
  if (!validatedPetData.success) {
    error = {
      message: `Failed to validate pet data when adding pet`,
    }
    return { error, response }
  }

  try {
    response = await prisma.pet.create({
      data: validatedPetData.data,
    })
  } catch (error) {
    error = { message: `Failed to add pet to database: \n\n${error}` }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
