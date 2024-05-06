import { TriangleUpIcon } from "@radix-ui/react-icons"
import { TFeedbackItem } from "../../lib/types"
import { useState } from "react"

type FeedbackItemProps = {
  item: TFeedbackItem
}

export default function FeedbackItem({ item }: FeedbackItemProps) {
  const [open, setOpen] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(item.upvoteCount)

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpvoteCount((prev) => ++prev)
    e.currentTarget.disabled = true
    e.stopPropagation()
  }

  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open && "feedback--expand"}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>
      <p>{item.daysAgo === 0 ? "Today" : `${item.daysAgo}d`}</p>
    </li>
  )
}
