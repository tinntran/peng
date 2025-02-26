import { css, html, LitElement, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { defaultNavigator } from '../defaults'
import type Slide from './slide'

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

  getSlide(index: number): Slide | null {
    return this.querySelector<Slide>(`p-slide[slot="${this.slotNames[index]}"]`)
  }

  getCurrentSlide(): Slide | null {
    return this.getSlide(this.selectedIndex)
  }

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties)

    if (changedProperties.get('selectedIndex') !== this.selectedIndex) {
      this.getCurrentSlide()?.dispatchEvent(new Event('peng:unselected', { composed: true, bubbles: true }))

      this.selectedSlotName = this.slotNames[this.selectedIndex]

      this.getCurrentSlide()?.dispatchEvent(new Event('peng:selected', { composed: true, bubbles: true }))
    }
  }

  protected firstUpdated(changedProperties: PropertyValues) {
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
