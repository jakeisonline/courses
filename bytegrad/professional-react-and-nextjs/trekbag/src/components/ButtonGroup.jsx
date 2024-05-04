import { BUTTON_GROUP_LABELS } from "../lib/constants"
import Button from "./Button"

export default function ButtonGroup() {
  return (
    <section className="button-group">
      {BUTTON_GROUP_LABELS.map((label) => {
        return (
          <Button key={label} type="secondary">
            {label}
          </Button>
        )
      })}
    </section>
  )
}
