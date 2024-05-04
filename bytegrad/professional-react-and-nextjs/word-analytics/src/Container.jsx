import { useState } from "react"
import Stats from "./Stats"
import Textarea from "./Textarea"
import "./constants.js"
import { FACEBOOK_MAX_CHARS, INSTAGRAM_MAX_CHARS } from "./constants.js"

export default function Container() {
  const [text, setText] = useState("")
  const stats = {
    words: text.split(" ").filter((word) => word !== "").length,
    characters: text.length,
    instagram: INSTAGRAM_MAX_CHARS - text.length,
    facebook: FACEBOOK_MAX_CHARS - text.length,
  }

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stats={stats} />
    </main>
  )
}
