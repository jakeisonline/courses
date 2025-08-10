import { cn } from "@/lib/utils"
import { TailwindElement } from "@/mixins/tailwind-element"
import { LitElement, html } from "lit"
import { customElement, query, state } from "lit/decorators.js"

@customElement("todo-list")
export class TodoList extends TailwindElement(LitElement) {
  @state()
  private _listItems = [
    { text: "Start Lit tutorial", completed: true },
    { text: "Make to-do list", completed: false },
  ]

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

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.addTodo()
    }
  }

  render() {
    return html`
      <div class="card card-border w-100 p-4 shadow-sm">
        <h2 class="card-title">To Do</h2>
        <ul class="card-body p-0">
          ${this._listItems.map(
            (item) =>
              html`<li class=${cn("px-0", item.completed && "line-through")}>
                ${item.text}
              </li>`,
          )}
        </ul>
        <div class="card-actions mt-4">
          <input
            id="newitem"
            placeholder="Enter a new todo item"
            @keydown=${this.handleKeyDown}
            class="input w-full"
            aria-label="New item"
          />
          <button class="btn w-full" @click=${this.addTodo}>Add</button>
        </div>
      </div>
    `
  }
}
