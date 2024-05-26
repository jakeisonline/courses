"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { TErrorMutatePet } from "@/lib/types"
import { petIdSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function checkoutPet(petId: unknown) {
  let error: TErrorMutatePet, response

  // Auth check
  const userSession = await auth()
  if (!userSession?.user) {
    redirect("/login")
  }

  // Run validations
  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPetId.success) {
    error = {
      message: `Failed to validate pet id when checking out pet`,
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
