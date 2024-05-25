"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TMutatingPet, TPromisePet } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function editPet(
  petId: string,
  petData: TMutatingPet,
): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

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
