import { useState } from "react"
import { SORTING_OPTIONS } from "../lib/constants"
import Select from "react-select"
import EmptyView from "./EmptyView"
import { useMemo } from "react"
import { useItemStore } from "../stores/itemStore"

export default function ItemList() {
  const [sortBy, setSortBy] = useState(SORTING_OPTIONS[0])
  const items = useItemStore((state) => state.items)
  const handleRemoveItem = useItemStore((state) => state.removeItem)
  const handleToggleItem = useItemStore((state) => state.toggleItem)

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed
        }

        if (sortBy === "unpacked") {
          return a.packed - b.packed
        }

        return
      }),
    [items, sortBy],
  )

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 0 ? (
        <section className="sorting">
          <Select
            defaultValue={SORTING_OPTIONS[0]}
            options={SORTING_OPTIONS}
            onChange={(selectedOption) => {
              setSortBy(selectedOption.value)
            }}
          />
        </section>
      ) : null}
      {sortedItems.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={handleRemoveItem}
            onToggleItem={handleToggleItem}
          />
        )
      })}
    </ul>
  )
}

function Item({ item, onRemoveItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => {
            onToggleItem(item.id)
          }}
          type="checkbox"
          checked={item.packed}
        />
        {item.label}
      </label>
      <button
        onClick={() => {
          onRemoveItem(item.id)
        }}
      >
        ❌
      </button>
    </li>
  )
}
