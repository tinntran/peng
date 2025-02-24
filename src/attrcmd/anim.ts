import { parseAttrCmdForEvery } from './parse'
import anime from 'animejs'

export interface ParsedAnim {
  start: 'onclick' | 'withprev'
  instance: anime.AnimeInstance
}

export function parseAnims(root: ParentNode): ParsedAnim[] {
  const result: ParsedAnim[] = []

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

    result.push({ start, instance })
  })

  return result
}

export function *generateAnims(parsedAnims: ParsedAnim[]): Generator<anime.AnimeInstance[], void, unknown> {
  let group: anime.AnimeInstance[] = []

  for (const { start, instance } of parsedAnims) {
    switch (start) {
      case 'onclick':
        yield group
        group = [instance]
        break
      case 'withprev':
        group.push(instance)
        break
    }
  }

  yield group
}
