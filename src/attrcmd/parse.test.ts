import { expect, test } from 'bun:test'
import { parseCmd } from './parse'

test('parse cmd', () => {
  const inp = 'susy suss -n baka -t amongus -D :mmb'

  expect(parseCmd(inp)).toEqual({
    positional: ['susy', 'suss'],
    flags: {
      n: 'baka',
      t: 'amongus',
      D: ':mmb'
    }
  })
})
