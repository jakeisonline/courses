import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import HashtagList from "./components/hashtag/HashtagList"
import Header from "./components/layout/Header"
import FeedbackList from "./components/feedback/FeedbackList"
import Pattern from "./components/Pattern"
import Logo from "./components/Logo"
import PageHeading from "./components/PageHeading"
import FeedbackForm from "./components/feedback/FeedbackForm"
import { useEffect } from "react"
import { useFeedbackItemsStore } from "./stores/feedbackItemsStore"

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems,
  )
  useEffect(() => {
    fetchFeedbackItems()
  }, [fetchFeedbackItems])
  return (
    <div className="app">
      <Footer />
      <Container>
        <Header>
          <Pattern />
          <Logo />
          <PageHeading />
          <FeedbackForm />
        </Header>
        <FeedbackList />
      </Container>
      <HashtagList />
    </div>
  )
}

export default App
