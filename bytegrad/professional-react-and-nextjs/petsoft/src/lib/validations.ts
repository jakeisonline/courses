import { z } from "zod"

export const petFormSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  ownerName: z.string().trim().nonempty("Owner Name is required"),
  imageUrl: z.union([
    z.literal(""),
    z.string().url({ message: "Image URL must be a valid URL" }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive("Age must be a positive number")
    .max(99),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
})

export const petIdSchema = z.string().cuid("Pet ID must be a valid CUID")
