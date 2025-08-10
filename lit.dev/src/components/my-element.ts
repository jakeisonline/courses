import { LitElement, html, unsafeCSS } from "lit"
import { customElement, property } from "lit/decorators.js"
import style from "../index.css?inline"

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = [unsafeCSS(style)]

  @property()
  name: string = "your name here"
  @property()
  editEnabled: boolean = true

  handleNameChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.name = input.value
  }

  handleEditToggle() {
    const newEditState = !this.editEnabled
    console.log("newEditState", newEditState)
    this.editEnabled = newEditState
  }

  render() {
    return html`
      <div class="card card-body card-border m-4 w-100 p-4 shadow-sm">
        <p class="card-title">Hello ${this.name}</p>
        <div class="card-actions flex flex-col">
          <input
            class="input w-full"
            @input=${this.handleNameChange}
            placeholder="Enter your name"
            ?disabled=${!this.editEnabled}
          />
          <label class="label">
            <input
              type="checkbox"
              class="checkbox"
              @change=${this.handleEditToggle}
              ?checked=${this.editEnabled}
            />
            Enable editing
          </label>
        </div>
      </div>
    `
  }
}
