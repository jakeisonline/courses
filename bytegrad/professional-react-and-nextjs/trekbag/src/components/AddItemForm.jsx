import { useState } from "react"
import Button from "./Button"
import { useContext } from "react"
import { ItemsContext } from "../contexts/ItemsContextProvider"

export default function AddItemForms() {
  const [itemText, setItemText] = useState("")
  const { handleAddItem } = useContext(ItemsContext)

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
