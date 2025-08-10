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
      <p>Hello ${this.name}</p>
      <div class="flex flex-col">
        <input
          @input=${this.handleNameChange}
          placeholder="Enter your name"
          ?disabled=${!this.editEnabled}
        />
        <label>
          <input
            type="checkbox"
            @change=${this.handleEditToggle}
            ?checked=${this.editEnabled}
          />
          Enable editing
        </label>
      </div>
    `
  }
}
