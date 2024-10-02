type TopicType = {
  name: string
  tally: number
}

export default function getTopics(courses: any[]): TopicType[] {
  const topics: TopicType[] = []

  courses.forEach((course) => {
    course.topics.forEach((topic) => {
      const existingTopic = topics.find((t) => t.name === topic)

      if (existingTopic) {
        existingTopic.tally++
      } else {
        topics.push({ name: topic, tally: 1 })
      }
    })
  })

  const sortedTopics = sortTopicsByTally(topics)

  return sortedTopics
}

function sortTopicsByTally(topics: TopicType[]): TopicType[] {
  return topics.sort((a, b) => b.tally - a.tally)
}
