import { type ToolFn } from "@/types"
import { z } from "zod"
import fetch from "node-fetch"

export const redditToolDefinition = {
  name: "get_reddit_frontpage",
  parameters: z.object({}),
  description: "get the front page of reddit",
}

type Args = z.infer<typeof redditToolDefinition.parameters>

interface RedditResponse {
  data: {
    children: Array<{
      data: {
        title: string
        url: string
        subreddit_name_prefixed: string
      }
    }>
  }
}

export const getRedditFrontpage: ToolFn<Args, string> = async ({
  toolArgs,
}) => {
  const res = await fetch("https://www.reddit.com/.json")
  const { data } = (await res.json()) as RedditResponse

  const relevantInfo = data.children.map((child) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
