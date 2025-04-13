import "dotenv/config"
import { Index as UpstashIndex } from "@upstash/vector"
import { parse } from "csv-parse/sync"
import fs from "fs"
import path from "path"
import ora from "ora"

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

const indexMovieData = async () => {
  const spinner = ora("Ingesting data...").start()
  const csvPath = path.join(process.cwd(), "src/rag/imdb_movie_dataset.csv")
  const csvData = fs.readFileSync(csvPath, "utf-8")
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  })

  spinner.text = "Indexing movies..."

  for (const record of records) {
    spinner.text = `Indexing movie ${record.Title}...`
    const text = `${record.Title}. ${record.Genre}. ${record.Description}.`

    try {
      await index.upsert({
        id: `${record.Title}${record.Year}`,
        data: text,
        metadata: {
          title: record.Title,
          year: Number(record.Year),
          genre: record.Genre,
          director: record.Director,
          actors: record.Actors,
          rating: Number(record.Rating),
          votes: Number(record.Votes),
          revenue: Number(record.Revenue),
          metascore: Number(record.Metascore),
        },
      })
    } catch (e) {
      spinner.fail(`Error indexing movie ${record.Title}:`)
      console.error(e)
    }
  }

  spinner.succeed("Data ingested successfully")
}

indexMovieData()
