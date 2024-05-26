"use server"

import { signIn } from "@/lib/auth"
import prisma from "@/lib/db"
import { authSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

export default async function doRegister(formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("formData is not an instance of FormData")
  }

  const formDataEntries = Object.fromEntries(formData.entries())
  const validatedFormData = authSchema.safeParse(formDataEntries)

  if (!validatedFormData.success) {
    throw new Error("Form data failed validation")
  }

  const { email, password } = validatedFormData.data

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  await signIn("credentials", formData)
}
