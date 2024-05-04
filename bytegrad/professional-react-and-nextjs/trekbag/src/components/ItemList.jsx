import { useState } from "react"
import { INITIAL_ITEMS } from "../lib/constants"

export default function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return <Item key={item.id} item={item} />
      })}
    </ul>
  )
}

function Item({ item }) {
  return (
    <li className="item">
      <label>
        <input type="checkbox" />
        {item.label}
      </label>
      <button>❌</button>
    </li>
  )
}
