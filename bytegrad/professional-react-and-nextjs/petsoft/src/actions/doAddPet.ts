"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addPet(formData: any) {
  let error, response

  try {
    response = await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    })
  } catch (error) {
    error = { message: "Failed to add pet to database" }
  }

  if (!error) {
    revalidatePath("/app", "layout")
  }

  return { error, response }
}
