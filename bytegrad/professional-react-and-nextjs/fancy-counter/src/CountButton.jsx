import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

export default function CountButton({ type, setCount, locked }) {
  const handleClick = () => {
    setCount((prev) => {
      if (type === "minus") {
        const newCount = prev === 0 ? 0 : prev - 1
        return newCount
      } else if (type === "plus") {
        const newCount = prev + 1
        if (newCount > 5) {
          return 5
        }
        return newCount
      }
    })
  }
  return (
    <button disabled={locked} onClick={handleClick} className="count-btn">
      {type === "minus" ? (
        <MinusIcon className="count-btn-icon" />
      ) : (
        <PlusIcon className="count-btn-icon" />
      )}
    </button>
  )
}
