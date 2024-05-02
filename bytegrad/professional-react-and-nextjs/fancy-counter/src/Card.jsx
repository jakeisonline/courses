import Count from "./Count"
import ButtonContainer from "./ButtonContainer"
import ResetButton from "./ResetButton"
import CountButton from "./CountButton"
import Title from "./Title"
import "./index.css"
import { useState } from "react"
import { useEffect } from "react"

export default function Card() {
  const [count, setCount] = useState(0)
  const locked = count === 5 ? true : false

  useEffect(() => {
    const handleKeydown = (e) => {
      if (locked) return
      if (e.code === "Space") {
        setCount(count + 1)
      }
      e.preventDefault()
    }

    window.addEventListener("keydown", handleKeydown)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [count, locked])

  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer>
        <CountButton type="minus" setCount={setCount} locked={locked} />
        <CountButton type="plus" setCount={setCount} locked={locked} />
      </ButtonContainer>
    </div>
  )
}
