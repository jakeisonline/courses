import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"

export default function ItemList({
  items,
  handleRemoveItem,
  handleToggleItem,
}) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            handleRemoveItem={handleRemoveItem}
            handleToggleItem={handleToggleItem}
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
