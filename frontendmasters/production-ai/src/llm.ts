import type { AIMessage } from "../types"
import { openai } from "./ai"
import { zodFunction, zodResponseFormat } from "openai/helpers/zod"
import { systemPrompt as defaultSystemPrompt } from "./systemPrompt"
import { z } from "zod"

export const runLLM = async ({
  messages,
  tools = [],
  temperature = 0.1,
  systemPrompt,
}: {
  messages: AIMessage[]
  tools?: any[]
  temperature?: number
  systemPrompt?: string
}) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature,
    messages: [
      {
        role: "system",
        content: systemPrompt || defaultSystemPrompt,
      },
      ...messages,
    ],
    ...(formattedTools.length > 0 && {
      tools: formattedTools,
      tool_choice: "auto",
      parallel_tool_calls: false,
    }),
  })

  return response.choices[0].message
}

export const runApprovalCheck = async (userMessage: string) => {
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    temperature: 0.1,
    response_format: zodResponseFormat(
      z.object({
        approved: z.boolean().describe("did the user say they approved or not"),
      }),
      "approval_check",
    ),
    messages: [
      {
        role: "system",
        content:
          "Determine if the user approved the image generation. If you are not sure, then it is not approved.",
      },
      { role: "user", content: userMessage },
    ],
  })

  return response.choices[0].message.parsed?.approved
}
