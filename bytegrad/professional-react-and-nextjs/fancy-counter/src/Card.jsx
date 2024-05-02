import Count from "./Count"
import ButtonContainer from "./ButtonContainer"
import ResetButton from "./ResetButton"
import Title from "./Title"
import "./index.css"
import { useState } from "react"

export default function Card() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <Title />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer setCount={setCount} />
    </div>
  )
}
