import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

export default function CountButton({ type, setCount }) {
  return (
    <button
      onClick={() => {
        if (type === "minus") {
          setCount((prev) => (prev === 0 ? 0 : prev - 1))
          return
        } else if (type === "plus") {
          setCount((prev) => prev + 1)
        }
      }}
      className="count-btn"
    >
      {type === "minus" ? (
        <MinusIcon className="count-btn-icon" />
      ) : (
        <PlusIcon className="count-btn-icon" />
      )}
    </button>
  )
}
