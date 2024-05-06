import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore"
import HashtagItem from "./HashtagItem"

export default function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList())
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem key={company} company={company} />
      ))}
    </ul>
  )
}
