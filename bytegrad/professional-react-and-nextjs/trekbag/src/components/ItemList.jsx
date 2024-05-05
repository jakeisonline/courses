import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"
import EmptyView from "./EmptyView"

export default function ItemList({ items, onRemoveItem, onToggleItem }) {
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.map((item) => {
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
