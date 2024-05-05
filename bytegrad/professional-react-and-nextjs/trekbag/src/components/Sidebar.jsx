import AddItemForm from "./AddItemForm"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar({
  handleAddItem,
  handleRemoveAllItems,
  handleMarkAllAsUnpacked,
  handleMarkAllAsPacked,
  handleResetToInitial,
}) {
  return (
    <div className="sidebar">
      <AddItemForm onAddItem={handleAddItem} />
      <ButtonGroup
        handleRemoveAllItems={handleRemoveAllItems}
        handleMarkAllAsUnpacked={handleMarkAllAsUnpacked}
        handleMarkAllAsPacked={handleMarkAllAsPacked}
        handleResetToInitial={handleResetToInitial}
      />
    </div>
  )
}
