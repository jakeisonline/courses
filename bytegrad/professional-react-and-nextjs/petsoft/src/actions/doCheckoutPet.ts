"use server"

import prisma from "@/lib/db"
import { getPetById, getUserSession } from "@/lib/serverUtils"
import { TErrorMutatePet } from "@/lib/types"
import { petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function checkoutPet(petId: unknown) {
  let error: TErrorMutatePet, response

  // Auth check
  const userSession = await getUserSession()

  // Run validations
  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPetId.success) {
    error = {
      message: `Failed to validate pet id when checking out pet`,
    }
    return { error, response }
  }

  // Allowed check (user owns pet)
  const pet = await getPetById(validatedPetId.data)

  if (!pet?.userId || pet.userId !== userSession.user.id) {
    error = {
      message: `User does not own pet (Pet ID: ${validatedPetId.data})`,
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
