import FeedbackList from "./FeedbackList"
import Header from "./Header"
import { TFeedbackItem } from "../lib/types"

type ContainerProps = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  handleAddToList: (newItem: string) => void
}

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}
