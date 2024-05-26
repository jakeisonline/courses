"use server"

import { signIn } from "@/lib/auth"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"

export default async function doRegister(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  )

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      password: hashedPassword as unknown as string,
    },
  })

  await signIn("credentials", formData)
}
