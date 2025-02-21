import { Present, Slide } from './elements'

export default function init() {
  console.log('(")>\nYour penguin is ready to go!')

  customElements.define('p-present', Present)
  customElements.define('p-slide', Slide)
}
