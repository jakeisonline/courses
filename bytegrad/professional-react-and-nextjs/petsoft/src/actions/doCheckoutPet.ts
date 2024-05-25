"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet } from "@/lib/types"
import { petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function checkoutPet(petId: unknown) {
  let error: TErrorMutatePet, response

  // Run validations
  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPetId.success) {
    error = {
      message: `Failed to validate pet id when checking out pet`,
    }
    return { error, response }
  }

  try {
    response = await prisma.pet.delete({
      where: { id: validatedPetId.data },
    })
  } catch (error) {
    error = {
      message: `Failed to delete pet from database (Pet ID: ${petId}): \n\n${error}`,
    }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
