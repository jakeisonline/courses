import { useState } from "react"
import Button from "./Button"

export default function AddItemForms({ setItems }) {
  const [itemText, setItemText] = useState("")

  const handleChange = (e) => {
    setItemText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemText.trim()) return

    const newItem = {
      id: new Date().getTime(),
      label: itemText,
      packed: false,
    }

    setItems((prev) => [...prev, newItem])
    setItemText("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      <input
        type="text"
        value={itemText}
        onChange={handleChange}
        placeholder="Item name..."
        autoFocus
      />
      <Button>Add</Button>
    </form>
  )
}
