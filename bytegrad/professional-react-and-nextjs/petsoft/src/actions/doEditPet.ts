"use server"

import prisma from "@/lib/db"
import { getPetById, getUserSession } from "@/lib/serverUtils"
import { TErrorMutatePet, TMutatingPet, TPromisePet } from "@/lib/types"
import { petFormSchema, petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function editPet(
  petId: unknown,
  petData: unknown,
): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  // Auth check
  const userSession = await getUserSession()

  // Run validations
  const validatedPetId = petIdSchema.safeParse(petId)
  const validatedPetData = petFormSchema.safeParse(petData)
  if (!validatedPetData.success || !validatedPetId.success) {
    error = {
      message: `Failed to validate pet data when editing pet`,
    }
    return { error, response }
  }

  const pet = await getPetById(validatedPetId.data)

  if (!pet?.userId || pet.userId !== userSession.user.id) {
    error = {
      message: `User does not own pet (Pet ID: ${validatedPetId.data})`,
    }
    return { error, response }
  }

  try {
    response = await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPetData.data,
    })
  } catch (error) {
    error = {
      message: `Failed to update pet in database (Pet ID: ${petId}): \n\n${error}`,
    }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
