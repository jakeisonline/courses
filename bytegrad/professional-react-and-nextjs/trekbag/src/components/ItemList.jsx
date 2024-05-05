import { useState } from "react"
import { SORTING_OPTIONS } from "../lib/constants"
import Select from "react-select"
import EmptyView from "./EmptyView"

export default function ItemList({ items, onRemoveItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState(SORTING_OPTIONS[0])

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "packed") {
      return b.packed - a.packed
    }

    if (sortBy === "unpacked") {
      return a.packed - b.packed
    }

    return
  })

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
            handleRemoveItem={onRemoveItem}
            handleToggleItem={onToggleItem}
          />
        )
      })}
    </ul>
  )
}

function Item({ item, handleRemoveItem, handleToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => {
            handleToggleItem(item.id)
          }}
          type="checkbox"
          checked={item.packed}
        />
        {item.label}
      </label>
      <button
        onClick={() => {
          handleRemoveItem(item.id)
        }}
      >
        ❌
      </button>
    </li>
  )
}
