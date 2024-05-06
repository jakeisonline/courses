import { useEffect, useMemo, useState } from "react"
import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import HashtagList from "./components/hashtag/HashtagList"
import { TFeedbackItem } from "./lib/types"
import { FEEDBACK_ENDPOINT } from "./lib/constants"
import Header from "./components/layout/Header"
import FeedbackList from "./components/feedback/FeedbackList"
import Pattern from "./components/Pattern"
import Logo from "./components/Logo"
import PageHeading from "./components/PageHeading"
import FeedbackForm from "./components/feedback/FeedbackForm"

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [selectedCompany, feedbackItems],
  )

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index
        }),
    [feedbackItems],
  )

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

    fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
  }

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(FEEDBACK_ENDPOINT)
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
      <Container>
        <Header>
          <Pattern />
          <Logo />
          <PageHeading />
          <FeedbackForm onAddToList={handleAddToList} />
        </Header>
        <FeedbackList
          feedbackItems={filteredFeedbackItems}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </Container>
      <HashtagList
        companyList={companyList}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  )
}

export default App
