import Count from "./Count"
import CountButtons from "./CountButtons"
import ResetButton from "./ResetButton"
import Title from "./Title"
import "./index.css"

export default function Card() {
  return (
    <div className="card">
      <Title />
      <Count />
      <ResetButton />
      <CountButtons />
    </div>
  )
}
