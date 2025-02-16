import { parseAttrCmd } from '../attrcmd'
import type { Present } from '../elements'

export default function defaultNavigator(present: Present) {
  let shouldNavigate = true

  window.addEventListener('keydown', e => {
    if ((e.key === 'ArrowRight' || e.key === 'Enter') && present.selectedIndex < present.slotNames.length - 1) {
      present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }

    shouldNavigate = true
  })

  for (const intr of present.querySelectorAll<HTMLElement>('[p-intr]')) {
    function isIntr(): boolean {
      const isIntr = parseAttrCmd(intr, 'p-intr')?.positional[0] || ''

      if (isIntr === '' || isIntr === 'true') return true
      else return false
    }

    if (isIntr()) intr.style.cursor = 'pointer'

    intr.addEventListener('mousedown', e => {
      if (e.button === 0) {
        shouldNavigate = !isIntr()
      }
    })
  }

  window.addEventListener('mousedown', e => {
    if (e.button === 0 && present.selectedIndex < present.slotNames.length - 1) {
      if (shouldNavigate) present.selectedIndex++
    }

    shouldNavigate = true
  })
}
