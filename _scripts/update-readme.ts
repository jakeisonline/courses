import * as fs from "fs"
import mustache from "mustache"
import getCourses from "@/utils/get-courses"
import getStats from "@/utils/get-stats"
import getDateTime from "@/utils/get-date-time"

const readme = fs.readFileSync("./_scripts/readme.mustache", "utf8").toString()

const context = {
  stats: getStats(),
  courses: getCourses(),
  currentDateTime: getDateTime(),
}

const output = mustache.render(readme, context)

const filename = process.argv.includes("--build")
  ? "./README.md"
  : "./README.preview.md"

fs.writeFileSync(filename, output)
