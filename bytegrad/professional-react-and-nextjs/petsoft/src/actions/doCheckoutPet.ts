"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function checkoutPet(petId: string) {
  let error: TErrorMutatePet | undefined, response

  try {
    response = await prisma.pet.delete({
      where: { id: petId },
    })
  } catch (error) {
    error = { message: `Failed to delete pet from database (Pet ID: ${petId})` }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
