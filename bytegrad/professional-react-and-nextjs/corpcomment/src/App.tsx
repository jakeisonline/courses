import { useEffect, useState } from "react"
import Container from "./components/Container"
import Footer from "./components/Footer"
import HashtagList from "./components/HashtagList"
import { TFeedbackItem } from "./lib/types"

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1)
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.charAt(0).toUpperCase(),
    }

    setFeedbackItems([newItem, ...feedbackItems])
  }

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        )
        if (!response.ok) {
          throw new Error("There was an error when fetching the feedbacks.")
        }
        const data = await response.json()
        setFeedbackItems(data.feedbacks)
        setIsLoading(false)
      } catch (error) {
        setErrorMessage("There was an error loading the feedbacks.")
        setIsLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  )
}

export default App
