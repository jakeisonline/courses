"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TMutatingPet, TPromisePet } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function addPet(petData: TMutatingPet): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  try {
    response = await prisma.pet.create({
      data: petData,
    })
  } catch (error) {
    error = { message: "Failed to add pet to database" }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
