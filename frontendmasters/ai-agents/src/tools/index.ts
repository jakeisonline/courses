import {
  generateImage,
  generateImageToolDefinition,
} from "@/tools/generateImage"
import { getDadJoke, dadJokeToolDefinition } from "@/tools/dadJokes"
import { getRedditFrontpage, redditToolDefinition } from "@/tools/reddit"

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
]
