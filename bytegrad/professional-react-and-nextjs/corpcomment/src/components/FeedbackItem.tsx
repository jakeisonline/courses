import { TriangleUpIcon } from "@radix-ui/react-icons"
import { TFeedbackItem } from "../lib/types"

type FeedbackItemProps = {
  item: TFeedbackItem
}

export default function FeedbackItem({ item }: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{item.upvoteCount}</span>
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>
      <p>{item.daysAgo}d</p>
    </li>
  )
}
