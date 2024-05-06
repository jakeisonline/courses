import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage"
import { TFeedbackItem } from "../../lib/types"

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
}

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </ol>
  )
}
