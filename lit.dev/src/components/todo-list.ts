import { cn } from "@/lib/utils"
import { TailwindElement } from "@/mixins/tailwind-element"
import { LitElement, html } from "lit"
import { customElement, property, query, state } from "lit/decorators.js"

@customElement("todo-list")
export class TodoList extends TailwindElement(LitElement) {
  @state()
  private _listItems = [
    { text: "Start Lit tutorial", completed: true },
    { text: "Make to-do list", completed: false },
  ]

  @property()
  hideCompleted?: boolean = false

  @query("#newitem")
  input!: HTMLInputElement

  addTodo() {
    this._listItems = [
      ...this._listItems,
      { text: this.input.value, completed: false },
    ]
    this.input.value = ""
    this.input.focus()
  }

  toggleCompleted({ id }: { id: number }) {
    const item = this._listItems[id]

    if (!item) return

    this._listItems = [
      ...this._listItems.slice(0, id),
      { ...item, completed: !item.completed },
      ...this._listItems.slice(id + 1),
    ]
  }

  toggleCompletedVisibility() {
    this.hideCompleted = !this.hideCompleted
  }

  handleChange(e: Event) {
    const target = e.currentTarget as HTMLInputElement
    const itemId = target?.name

    if (!itemId) return

    this.toggleCompleted({ id: Number(itemId) })
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.addTodo()
    }
  }

  render() {
    return html`
      <div class="card card-border w-100 p-4 shadow-sm">
        <h2 class="card-title flex justify-between">
          To Do
          <div class="mt-0.5">
            <label class="label text-sm font-normal">
              <input
                type="checkbox"
                class="checkbox checkbox-xs"
                @change=${this.toggleCompletedVisibility}
              />
              Hide completed
            </label>
          </div>
        </h2>
        <ul class="card-body mt-4 p-0">
          ${this._listItems.map((item, index) => {
            if (this.hideCompleted && item.completed) return

            return html`<li class="px-0">
              <label class="label hover:cursor-pointer">
                <input
                  type="checkbox"
                  name=${index}
                  class="checkbox checkbox-xs"
                  @change=${this.handleChange}
                  ?checked=${item.completed}
                />
                <span
                  class=${cn(item.completed && "line-through text-neutral")}
                >
                  ${item.text}
                </span>
              </label>
            </li>`
          })}
        </ul>
        <div class="card-actions mt-4">
          <input
            id="newitem"
            placeholder="Enter a new todo item"
            @keydown=${this.handleKeyDown}
            class="input w-full"
            aria-label="New item"
            autocomplete="off"
          />
          <button class="btn w-full" @click=${this.addTodo}>Add</button>
        </div>
      </div>
    `
  }
}
