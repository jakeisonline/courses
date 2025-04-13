import type { ToolFn } from "../../types"
import { queryMovies } from "../rag/query"
import { z } from "zod"

export const movieSearchToolDefinition = {
  name: "movieSearch",
  parameters: z.object({
    query: z
      .string()
      .describe("The search query used for vector search on movies"),
  }),
  description:
    "use this tool to search for movies based on a query, that query can include metadata like genre, year, etc.",
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearch: ToolFn<Args> = async ({ userMessage, toolArgs }) => {
  let results

  try {
    results = await queryMovies({ query: toolArgs.query })
  } catch (e) {
    console.error(e)
    return "Error: could not query the db to get movies"
  }

  const formattedResults = results.map((result) => ({
    title: result.metadata?.title,
    year: result.metadata?.year,
    genre: result.metadata?.genre,
    director: result.metadata?.director,
    actors: result.metadata?.actors,
    rating: result.metadata?.rating,
    description: result.data,
  }))

  return JSON.stringify(formattedResults, null, 2)
}
