import { useItemsContext } from "../lib/hooks"

export default function Counter({ count, totalCount }) {
  const { totalNumberOfItems, numberOfItemsPacked } = useItemsContext()
  return (
    <p>
      <strong>{numberOfItemsPacked}</strong> / {totalNumberOfItems} items packed
    </p>
  )
}
