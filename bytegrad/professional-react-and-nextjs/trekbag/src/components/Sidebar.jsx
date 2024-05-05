import AddItemForms from "./AddItemForms"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar({ handleAddItem }) {
  return (
    <div className="sidebar">
      <AddItemForms handleAddItem={handleAddItem} />
      <ButtonGroup />
    </div>
  )
}
