import { useState } from "react"
import Button from "./Button"
import { useItemStore } from "../stores/itemStore"

export default function AddItemForms() {
  const handleAddItem = useItemStore((state) => state.addItem)
  const [itemText, setItemText] = useState("")

  const handleChange = (e) => {
    setItemText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemText.trim()) return

    handleAddItem(itemText)
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
