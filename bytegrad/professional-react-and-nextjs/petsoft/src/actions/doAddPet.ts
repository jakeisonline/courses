"use server"

import prisma from "@/lib/db"
import { TErrorMutatePet, TPromisePet } from "@/lib/types"
import { petFormSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { getUserSession } from "@/lib/serverUtils"

export async function addPet(petData: unknown): Promise<TPromisePet> {
  let error: TErrorMutatePet, response

  // Auth check
  const userSession = await getUserSession()

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
