import { useItemStore } from "../stores/itemStore"
import Button from "./Button"

export default function ButtonGroup() {
  const handleMarkAllAsPacked = useItemStore((state) => state.markAllAsPacked)
  const handleMarkAllAsUnpacked = useItemStore(
    (state) => state.markAllAsUnpacked,
  )
  const handleResetToInitial = useItemStore((state) => state.resetToInitial)
  const handleRemoveAllItems = useItemStore((state) => state.removeAllItems)

  const secondaryButtons = [
    { text: "Mark all as complete", onClick: handleMarkAllAsPacked },
    { text: "Mark all as incomplete", onClick: handleMarkAllAsUnpacked },
    { text: "Reset to initial", onClick: handleResetToInitial },
    { text: "Remove all items", onClick: handleRemoveAllItems },
  ]

  return (
    <section className="button-group">
      {secondaryButtons.map((button, index) => {
        return (
          <Button key={index} onClick={button.onClick} buttonType="secondary">
            {button.text}
          </Button>
        )
      })}
    </section>
  )
}
