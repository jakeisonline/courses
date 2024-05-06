import { TriangleUpIcon } from "@radix-ui/react-icons"

type FeedbackItem = {
  id?: number
  upVoteCount: number
  badgeLetter: string
  companyName: string
  feedbackText: string
  timestamp: number
}

type FeedbackItemProps = {
  item: FeedbackItem
}

export default function FeedbackItem({ item }: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{item.upVoteCount}</span>
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.companyName}</p>
        <p>{item.feedbackText}</p>
      </div>
      <p>{item.timestamp}d</p>
    </li>
  )
}
