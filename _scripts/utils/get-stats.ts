import courses from "@/courses.json"
import hrsToDaysHrs from "@/utils/hrs-to-days-hrs"

export default function getStats() {
  const stats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    hours: 0,
    humanizedDuration: "",
  }

  courses.forEach((course) => {
    if (course.completed) {
      stats.completed++
    } else {
      stats.inProgress++
    }

    stats.hours += course.duration

    stats.total++
  })

  stats.humanizedDuration = hrsToDaysHrs(stats.hours)

  return stats
}
