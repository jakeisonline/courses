import { useState } from "react"
import Warning from "./Warning"

export default function Textarea({ text, setText }) {
  const [warningText, setWarningText] = useState("")

  const handleChange = (e) => {
    let newText = e.target.value

    // Validation
    if (newText.includes("<script>")) {
      newText = newText.replace("<script>", "")
      setWarningText("Scripts are not allowed")
    } else if (newText.includes("@")) {
      newText = newText.replace("@", "")
      setWarningText("Don't @ me")
    } else {
      setWarningText("")
    }

    setText(newText)
  }

  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text..."
        spellCheck={false}
      />
      {warningText && <Warning warningText={warningText} />}
    </div>
  )
}
