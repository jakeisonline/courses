"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function editPet(petId: any, formData: any) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    })
  } catch (error) {
    return { message: `Failed to update pet in database (Pet ID: ${petId})` }
  }

  revalidatePath("/app", "layout")
}
