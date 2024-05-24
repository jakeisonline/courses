"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TPet, TPromisePet } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function editPet(
  petId: string,
  petData: Omit<TPet, "id">,
): Promise<TPromisePet> {
  let error: TErrorMutatePet | undefined, response

  try {
    response = await prisma.pet.update({
      where: { id: petId },
      data: petData,
    })
  } catch (error) {
    error = { message: `Failed to update pet in database (Pet ID: ${petId})` }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
