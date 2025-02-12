import { Present } from '../elements'

export default function defaultNavigator(present: Present) {
  window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' && present.selectedIndex < present.slotNames.length - 1) {
      present.selectedIndex++
    } else if (e.key == 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }
  })
}

