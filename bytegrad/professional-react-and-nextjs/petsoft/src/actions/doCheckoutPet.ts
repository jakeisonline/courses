"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function checkoutPet(petId: any) {
  try {
    await prisma.pet.delete({
      where: { id: petId },
    })
  } catch (error) {
    return { message: `Failed to delete pet from database (Pet ID: ${petId})` }
  }

  revalidatePath("/app", "layout")
}
