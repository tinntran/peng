import { html, LitElement } from 'lit'
import { generateAnims, parseAnims } from '../attrcmd'

export default class Slide extends LitElement {
  anims: ReturnType<typeof parseAnims>
  animGroups: ReturnType<typeof generateAnims>
  

  constructor() {
    super()

    this.slot = this.slot ? this.slot : self.crypto.randomUUID()
    this.anims = parseAnims(this)
    this.animGroups = generateAnims(this.anims)
  }

  selected() {
    this.anims.map(anim => anim.instance.restart())
  }

  unselected() {
    this.anims.map(anim => anim.instance.pause())
  }

  protected render() {
    return html`<slot></slot>`
  }
}
