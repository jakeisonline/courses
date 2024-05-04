import Button from "./Button"

export default function ButtonGroup() {
  const buttonLabels = [
    "Mark all as complete",
    "Mark all as incomplete",
    "Reset to initial",
    "Remove all items",
  ]

  return (
    <section className="button-group">
      {buttonLabels.map((label) => {
        return (
          <Button key={label} type="secondary">
            {label}
          </Button>
        )
      })}
    </section>
  )
}
