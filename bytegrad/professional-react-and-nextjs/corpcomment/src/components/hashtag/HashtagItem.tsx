import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore"

type HashtagItemProps = {
  company: string
}

export default function HashtagItem({ company }: HashtagItemProps) {
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany)
  const handleClick = () => {
    selectCompany(company)
  }

  return (
    <li>
      <button onClick={handleClick}>#{company}</button>
    </li>
  )
}
