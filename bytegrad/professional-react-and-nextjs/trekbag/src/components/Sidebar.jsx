import AddItemForms from "./AddItemForms"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar({ setItems }) {
  return (
    <div className="sidebar">
      <AddItemForms setItems={setItems} />
      <ButtonGroup />
    </div>
  )
}
