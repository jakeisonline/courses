import type OpenAI from "openai"
import {
  generateImage,
  generateImageToolDefinition,
} from "./tools/generateImage"
import { getDadJoke, dadJokeToolDefinition } from "./tools/dadJokes"
import { getRedditFrontpage, redditToolDefinition } from "./tools/reddit"

export const getWeather = (input: {}) => `The weather is sunny`

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input)
    case dadJokeToolDefinition.name:
      return getDadJoke(input)
    case redditToolDefinition.name:
      return getRedditFrontpage(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
