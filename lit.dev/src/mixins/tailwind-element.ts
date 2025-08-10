import { LitElement, unsafeCSS } from "lit"
import style from "../index.css?inline"

// Annoyingly Lit *expects* an any[], and typescript can't see that superClass takes ...args
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
type Constructor<T = {}> = new (...args: any[]) => T

export const TailwindElement = <T extends Constructor<LitElement>>(
  superClass: T,
) => {
  class TailwindElementClass extends superClass {
    static styles = [unsafeCSS(style)]
  }

  return TailwindElementClass as T
}
