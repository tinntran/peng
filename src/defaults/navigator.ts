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
    intr.style.cursor = 'pointer'

    intr.addEventListener('mousedown', () => {
      shouldNavigate = false
    })
  }

  window.addEventListener('mousedown', e => {
    if (e.button === 0 && present.selectedIndex < present.slotNames.length - 1) {
      if (shouldNavigate) present.selectedIndex++
    }

    shouldNavigate = true
  })
}
