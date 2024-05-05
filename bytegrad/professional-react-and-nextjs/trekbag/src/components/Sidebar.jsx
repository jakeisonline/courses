import AddItemForm from "./AddItemForm"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar({
  onAddItem,
  onRemoveAllItems,
  onMarkAllAsUnpacked,
  onMarkAllAsPacked,
  onResetToInitial,
}) {
  return (
    <div className="sidebar">
      <AddItemForm onAddItem={onAddItem} />
      <ButtonGroup
        handleRemoveAllItems={onRemoveAllItems}
        handleMarkAllAsUnpacked={onMarkAllAsUnpacked}
        handleMarkAllAsPacked={onMarkAllAsPacked}
        handleResetToInitial={onResetToInitial}
      />
    </div>
  )
}
