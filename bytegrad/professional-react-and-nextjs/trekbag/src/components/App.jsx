import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"
import BackgroundHeading from "./BackgroundHeading"
import Footer from "./Footer"
import Header from "./Header"
import ItemList from "./ItemList"
import Sidebar from "./Sidebar"

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleAddItem = (newItem) => {
    const newItems = [...items, newItem]
    setItems(newItems)
  }

  const handleRemoveItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
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

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header />
        <ItemList items={items} />
        <Sidebar handleAddItem={handleAddItem} />
      </main>
      <Footer />
    </>
  )
}

export default App
