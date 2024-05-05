export default function Counter({ numberOfItemsPacked, totalNumberOfItems }) {
  return (
    <p>
      <strong>{numberOfItemsPacked}</strong> / {totalNumberOfItems} items packed
    </p>
  )
}
