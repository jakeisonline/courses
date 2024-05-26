import "server-only"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { Pet, User } from "@prisma/client"

export async function getUserSession() {
  const userSession = await auth()
  if (!userSession?.user) {
    redirect("/login")
  }

  return userSession
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  })

  return pet
}

export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: { userId },
  })

  return pets
}

export async function getUserByEmail(userEmail: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  return user
}
