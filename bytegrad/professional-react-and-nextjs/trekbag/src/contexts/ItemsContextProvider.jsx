import { createContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"

export const ItemsContext = createContext()

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || INITIAL_ITEMS
  })

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      label: newItemText,
      packed: false,
    }
    const newItems = [...items, newItem]
    setItems(newItems)
  }

  const handleRemoveItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const handleRemoveAllItems = () => {
    setItems([])
  }

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }
      return item
    })
    setItems(newItems)
  }

  const handleResetToInitial = () => {
    setItems(INITIAL_ITEMS)
  }

  const handleMarkAllAsUnpacked = () => {
    const newItems = items.map((item) => ({ ...item, packed: false }))
    setItems(newItems)
  }

  const handleMarkAllAsPacked = () => {
    const newItems = items.map((item) => ({ ...item, packed: true }))
    setItems(newItems)
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  const totalNumberOfItems = items.length
  const numberOfItemsPacked = items.filter((item) => item.packed).length

  return (
    <ItemsContext.Provider
      value={{
        items,
        totalNumberOfItems,
        numberOfItemsPacked,
        handleAddItem,
        handleRemoveItem,
        handleRemoveAllItems,
        handleToggleItem,
        handleResetToInitial,
        handleMarkAllAsUnpacked,
        handleMarkAllAsPacked,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
