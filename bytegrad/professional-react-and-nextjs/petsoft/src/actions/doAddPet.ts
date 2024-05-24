"use server"

import prisma from "@/lib/db"

export async function addPet(formData: any) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
      age: parseInt(formData.get("age")),
      notes: formData.get("notes"),
    },
  })
}
