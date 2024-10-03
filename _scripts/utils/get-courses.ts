import courses from "@/courses.json"

export default function getCourses() {
  const sortedCourses = sortCoursesByCompletion(courses)

  return sortedCourses
}

function sortCoursesByCompletion(courses: any[]): any[] {
  return courses.sort((a, b) => {
    // We want uncompleted courses to be at the top
    if (!a.completed) return -1
    // And then sort by completion, descending
    a.completed < b.completed ? -1 : a.completed > b.completed ? 1 : 0
  })
}
