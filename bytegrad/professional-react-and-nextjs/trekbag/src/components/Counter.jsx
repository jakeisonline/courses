import { useItemStore } from "../stores/itemStore"

export default function Counter() {
  const items = useItemStore((state) => state.items)
  const totalNumberOfItems = items.length
  const numberOfItemsPacked = items.filter((item) => item.packed).length

  return (
    <p>
      <strong>{numberOfItemsPacked}</strong> / {totalNumberOfItems} items packed
    </p>
  )
}
