import Button from "./Button"

export default function AddItemForms() {
  return (
    <form>
      <h2>Add Item</h2>
      <input type="text" placeholder="Item name..." />
      <Button>Add</Button>
    </form>
  )
}
