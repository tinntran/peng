import { parseAttrCmdForEvery } from './parse'
import anime from 'animejs'

export interface Anim extends anime.AnimeInstance {
  start: 'onclick' | 'withprev'
}

export function parseAnims(root: ParentNode): Anim[] {
  const result: Anim[] = []

  parseAttrCmdForEvery<HTMLElement>(root, 'p-anim', (args, el) => {
    const params: anime.AnimeParams = { targets: el }

    let start: 'onclick' | 'withprev' = 'withprev'

    for (const [k, v] of args.flags.entries()) {
      if (k === 'inline-block' && v === 'true')
        el.style.display = 'inline-block'

      if (k === 'start')
        switch (v) {
          case 'onclick':
            start = 'onclick'
            break
          case 'withprev':
            start = 'withprev'
            break
        }

      if (!Number.isNaN(Number(v)))
        params[k] = Number(v)
      else if (v === 'true' || v === 'false')
        params[k] = Boolean(v)
      else
        params[k] = v
    }

    const instance = anime(params)

    instance.pause()

    result.push({ start, ...instance })
  })

  return result
}

export function *generateAnims(parsedAnims: Anim[]): Generator<Anim[], void, unknown> {
  let group: Anim[] = []

  for (let i = 0; i < parsedAnims.length; i++) {
    const anim = parsedAnims[i]

    if (anim.start === 'onclick') {
      if (group.length > 0) yield group

      group = [anim]
    } else {
      group.push(anim)
    }

    if (i === parsedAnims.length - 1) {
      yield group
    }
  }
}
