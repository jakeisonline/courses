import { type ToolFn } from "@/types"
import { z } from "zod"
import { openai } from "@/ai"

export const generateImageToolDefinition = {
  name: "generate_image",
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        "the prompt to generate an image. Be sure to consider the user's original message when making the prompt. Unsure? Ask user.",
      ),
  }),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: toolArgs.prompt,
    n: 1,
    size: "1024x1024",
  })

  const imageUrl = response.data[0].url!

  return imageUrl
}
