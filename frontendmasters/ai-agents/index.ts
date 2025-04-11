import "dotenv/config"
import { runLLM } from "@/llm.ts"
import { addMessages, getMessages } from "@/memory.ts"

const userMessage = process.argv[2]

if (!userMessage) {
  console.error("Please provide a message")
  process.exit(1)
}

await addMessages([{ role: "user", content: userMessage }])
const messages = await getMessages()

const response = await runLLM({
  messages,
})

await addMessages([{ role: "assistant", content: response }])

console.log(response)
