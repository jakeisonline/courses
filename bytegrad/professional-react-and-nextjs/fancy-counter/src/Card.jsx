import Count from "./Count"
import ButtonContainer from "./ButtonContainer"
import ResetButton from "./ResetButton"
import Title from "./Title"
import "./index.css"
import { useState } from "react"

export default function Card() {
  const [count, setCount] = useState(0)
  const locked = count === 5 ? true : false

  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer setCount={setCount} locked={locked} />
    </div>
  )
}
