import { css, html, LitElement, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { defaultNavigator } from '../defaults'

export default class Present extends LitElement {
  static styles = css`
    :host {
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  `

  @property({ attribute: 'selected-index', reflect: true })
  selectedIndex = 0

  @property({ attribute: false })
  slotNames: string[] = []

  @property({ attribute: false })
  selectedSlotName?: string

  navigate() {
    defaultNavigator(this)
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties)

    if (changedProperties.get('selectedIndex') !== this.selectedIndex) {
      this.selectedSlotName = this.slotNames[this.selectedIndex]
    }
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties)
    
    for (const slide of this.querySelectorAll('& > p-slide')) {
      this.slotNames.push(slide.slot)
    }

    this.selectedSlotName = this.slotNames[this.selectedIndex]

    this.navigate()
  }

  protected render() {
    return html`<slot name=${this.selectedSlotName}></slot>`
  }
}
