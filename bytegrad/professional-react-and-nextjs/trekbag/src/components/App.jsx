import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"
import BackgroundHeading from "./BackgroundHeading"
import Footer from "./Footer"
import Header from "./Header"
import ItemList from "./ItemList"
import Sidebar from "./Sidebar"
import { useEffect } from "react"

function App() {
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
    <>
      <BackgroundHeading />
      <main>
        <Header
          totalNumberOfItems={totalNumberOfItems}
          numberOfItemsPacked={numberOfItemsPacked}
        />
        <ItemList
          items={items}
          onToggleItem={handleToggleItem}
          onRemoveItem={handleRemoveItem}
        />
        <Sidebar
          onAddItem={handleAddItem}
          onRemoveAllItems={handleRemoveAllItems}
          onResetToInitial={handleResetToInitial}
          onMarkAllAsUnpacked={handleMarkAllAsUnpacked}
          onMarkAllAsPacked={handleMarkAllAsPacked}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
