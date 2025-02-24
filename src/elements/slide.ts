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

  playNextAnim() {
    const current = this.animGroups.next()

    if (current.value) {
      current.value.map(anim => anim.restart())
    }
  }

  selected() {
    this.animGroups = generateAnims(this.anims)

    if (this.anims[0].start === 'withprev') this.playNextAnim()
  }

  unselected() {
    this.anims.map(anim => anim.pause())
  }

  protected render() {
    return html`<slot></slot>`
  }
}
