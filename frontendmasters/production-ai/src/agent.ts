import { addMessages, getMessages, saveToolResponse } from "./memory"
import { runLLM } from "./llm"
import { showLoader, logMessage } from "./ui"
import { runTool } from "./toolRunner"
import type { AIMessage } from "../types"
import { generateImageToolDefinition } from "./tools/generateImage"
import { runApprovalCheck } from "./llm"

export const handleImageApprovalFlow = async (
  history: AIMessage[],
  userMessage: string,
) => {
  const latestMessage = history.at(-1)
  const toolCall = latestMessage?.tool_calls?.[0]

  if (
    !toolCall ||
    toolCall.function.name !== generateImageToolDefinition.name
  ) {
    return
  }

  const loader = showLoader("Processing approval...")

  const approved = await runApprovalCheck(userMessage)

  if (approved) {
    loader.update(`Executing tool: ${toolCall.function.name}`)

    const toolResponse = await runTool(toolCall, userMessage)

    loader.update(`Done: ${toolCall.function.name}`)

    await saveToolResponse(toolCall.id, toolResponse)
  } else {
    await saveToolResponse(
      toolCall.id,
      `User did not approve using tool: ${toolCall.function.name}`,
    )
  }

  loader.stop()

  return true
}

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  const history = await getMessages()
  const isApproval = await handleImageApprovalFlow(history, userMessage)

  if (!isApproval) {
    await addMessages([{ role: "user", content: userMessage }])
  }

  const loader = showLoader("🤔")

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })

    await addMessages([response])

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing: ${toolCall.function.name}`)

      if (toolCall.function.name === generateImageToolDefinition.name) {
        loader.update(`User approval is required...`)
        loader.stop()
        return getMessages()
      }

      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`done: ${toolCall.function.name}`)
    }
  }
}
