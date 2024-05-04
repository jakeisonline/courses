import { useState } from "react"
import Stats from "./Stats"
import Textarea from "./Textarea"

export default function Container() {
  const [text, setText] = useState("")
  const stats = {
    words: text.split(" ").filter((word) => word !== "").length,
    characters: text.length,
    instagram: 280 - text.length,
    facebook: 2200 - text.length,
  }

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stats={stats} />
    </main>
  )
}
