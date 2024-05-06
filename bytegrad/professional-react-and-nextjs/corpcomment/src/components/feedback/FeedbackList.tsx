import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage"
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore"

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading)
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage)
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems(),
  )
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </ol>
  )
}
