import AddItemForm from "./AddItemForm"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar({ handleAddItem }) {
  return (
    <div className="sidebar">
      <AddItemForm handleAddItem={handleAddItem} />
      <ButtonGroup />
    </div>
  )
}
