import { z } from "zod"

export const petFormSchema = z
  .object({
    name: z.string().trim().nonempty("Name is required"),
    ownerName: z.string().trim().nonempty("Owner Name is required"),
    // imageUrl: z.union([
    //   z.literal(""),
    //   z.string().trim().url({ message: "Image URL must be a valid URL" }),
    // ]),
    imageUrl: z
      .string()
      .trim()
      .url({ message: "Image URL must be a valid URL" })
      .optional()
      .or(z.null())
      .or(z.literal("")),
    age: z.coerce
      .number()
      .int()
      .positive("Age must be a positive number")
      .max(99),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || null,
  }))

export const petIdSchema = z.string().cuid("Pet ID must be a valid CUID")

export const authSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z.string(),
})
