import { html, LitElement } from 'lit'

export default class Slide extends LitElement {
  constructor() {
    super()

    this.slot = this.slot ? this.slot : self.crypto.randomUUID()
  }

  protected render() {
    return html`<slot></slot>`
  }
}
