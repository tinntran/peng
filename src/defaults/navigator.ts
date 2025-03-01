import { parseAttrCmdForEvery } from '../attrcmd'
import type { Present } from '../elements'

export default function defaultNavigator(present: Present) {
  let intrClicked = true

  window.addEventListener('keydown', e => {
    if ((e.key === 'ArrowRight' || e.key === 'Enter')) {
      const shouldNavigate = intrClicked
        && present.getCurrentSlide()?.playNextAnim()
        && present.selectedIndex < present.slotNames.length - 1

      if (shouldNavigate)
        present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }

    intrClicked = true
  })

  parseAttrCmdForEvery<HTMLElement>(present, 'p-intr', (args, intr) => {
    function isIntr(): boolean {
      const isIntr = args.positional[0] || ''

      if (isIntr === '' || isIntr === 'true') return true

      return false
    }

    if (isIntr()) intr.style.cursor = 'pointer'

    intr.addEventListener('mousedown', e => {
      if (e.button === 0) {
        intrClicked = !isIntr()
      }
    })
  })

  window.addEventListener('mousedown', e => {
    if (e.button === 0) {
      const shouldNavigate = intrClicked
        && present.getCurrentSlide()?.playNextAnim()
        && present.selectedIndex < present.slotNames.length - 1

      if (shouldNavigate)
        present.selectedIndex++
    }

    intrClicked = true
  })
}
