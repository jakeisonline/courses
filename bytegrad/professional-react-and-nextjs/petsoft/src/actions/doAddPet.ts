"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TPromisePet } from "@/lib/types"
import { petFormSchema } from "@/lib/validations"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addPet(petData: unknown): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  const userSession = await auth()
  if (!userSession?.user) {
    redirect("/login")
  }

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
      data: {
        ...validatedPetData.data,
        user: {
          connect: {
            id: userSession.user.id,
          },
        },
      },
    })
  } catch (error) {
    error = { message: `Failed to add pet to database: \n\n${error}` }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
