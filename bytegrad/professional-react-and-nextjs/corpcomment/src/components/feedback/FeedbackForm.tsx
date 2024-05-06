import { useState } from "react"
import { MAX_CHARACTERS } from "../../lib/constants"

type FeedbackFormProps = {
  onAddToList: (newItem: string) => void
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("")
  const [showValidIndicator, setValidIndicator] = useState(false)
  const [showInvalidIndicator, setInvalidIndicator] = useState(false)
  const charCount = MAX_CHARACTERS - text.length

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (newText.length > MAX_CHARACTERS) return

    setText(newText)
    setValidIndicator(false)
    setInvalidIndicator(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (text.includes("#") && text.length >= 5) {
      setValidIndicator(true)
    } else {
      setInvalidIndicator(true)
      return
    }
    onAddToList(text)
    setText("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder=""
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, don't forget the #hashtag for the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
