"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { TErrorMutatePet, TMutatingPet, TPromisePet } from "@/lib/types"
import { petFormSchema, petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function editPet(
  petId: unknown,
  petData: unknown,
): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  // Auth check
  const userSession = await auth()
  if (!userSession?.user) {
    redirect("/login")
  }

  // Run validations
  const validatedPetId = petIdSchema.safeParse(petId)
  const validatedPetData = petFormSchema.safeParse(petData)
  if (!validatedPetData.success || !validatedPetId.success) {
    error = {
      message: `Failed to validate pet data when editing pet`,
    }
    return { error, response }
  }

  // Allowed check (user owns pet)
  const petOwnerId = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: { userId: true },
  })

  if (!petOwnerId || petOwnerId.userId !== userSession.user.id) {
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
