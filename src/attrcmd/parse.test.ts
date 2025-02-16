import { expect, test } from 'bun:test'
import { parseCmd } from './parse'

test('parse cmd', () => {
  const inp = 'susy suss -n baka -t amongus -D \'ts pmo\' -S "icl ts pmo sm ngl fr"'

  expect(parseCmd(inp)).toEqual({
    positional: ['susy', 'suss'],
    flags: {
      n: 'baka',
      t: 'amongus',
      D: 'ts pmo',
      S: 'icl ts pmo sm ngl fr'
    }
  })
})
