import * as fs from "fs"
import mustache from "mustache"
import getCourses from "@/utils/get-courses"
import getStats from "@/utils/get-stats"

const readme = fs.readFileSync("./_scripts/readme.mustache", "utf8").toString()

const context = {
  stats: getStats(),
  courses: getCourses(),
}

const output = mustache.render(readme, context)

fs.writeFileSync("./_scripts/_readme.md", output)
