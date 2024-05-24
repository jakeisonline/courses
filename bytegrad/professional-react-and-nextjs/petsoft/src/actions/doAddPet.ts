"use server"

import prisma from "@/lib/db"
import { TPet } from "@/lib/types"

type addPetArg = Omit<TPet, "id" | "updatedAt" | "createdAt">

export async function addPet(pet: addPetArg) {
  await prisma.pet.create({
    data: {
      ...pet,
    },
  })
}
