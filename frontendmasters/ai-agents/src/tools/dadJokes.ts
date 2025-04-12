import { z } from "zod"
import { type ToolFn } from "@/types"
import fetch from "node-fetch"

export const dadJokeToolDefinition = {
  name: "get_dad_joke",
  parameters: z.object({}),
  description: "get a dad joke, via an API call",
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

interface DadJokeResponse {
  joke: string
}

export const getDadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })

  const data = (await res.json()) as DadJokeResponse
  return data.joke
}
