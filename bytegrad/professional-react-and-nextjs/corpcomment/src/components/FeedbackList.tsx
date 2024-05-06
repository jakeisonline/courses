import FeedbackItem from "./FeedbackItem"

const feedbackItem = [
  {
    upVoteCount: 593,
    badgeLetter: "B",
    companyName: "ByeGrad",
    feedbackText: "Great company, love the product. #ByteGrade",
    timestamp: 4,
  },
  {
    upVoteCount: 593,
    badgeLetter: "B",
    companyName: "ByeGrad",
    feedbackText: "Great company, love the product. #ByteGrade",
    timestamp: 4,
  },
  {
    upVoteCount: 593,
    badgeLetter: "B",
    companyName: "ByeGrad",
    feedbackText: "Great company, love the product. #ByteGrade",
    timestamp: 4,
  },
]

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItem.map((item, index) => (
        <FeedbackItem key={index} item={item} />
      ))}
    </ol>
  )
}
