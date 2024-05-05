import { useContext } from "react"
import { ItemsContext } from "../contexts/ItemsContextProvider"

export default function Counter({ count, totalCount }) {
  const { totalNumberOfItems, numberOfItemsPacked } = useContext(ItemsContext)
  return (
    <p>
      <strong>{numberOfItemsPacked}</strong> / {totalNumberOfItems} items packed
    </p>
  )
}
