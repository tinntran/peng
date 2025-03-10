import { expect, test } from 'bun:test'
import { parseAttrCmd, parseCmd } from './parse'

test('parse cmd', () => {
  const inp = 'susy suss -n baka -t amongus -D mmb -boolean'

  expect(parseCmd(inp)).toEqual({
    positional: ['susy', 'suss'],
    flags: new Map([
      ['n', 'baka'],
      ['t', 'amongus'],
      ['D', 'mmb'],
      ['boolean', 'true']
    ])
  })
})

test('parse attr cmd', () => {
  document.body.innerHTML = `<div id="test" p-test="pos_a pos_b &another-attr -flag1 c -flag2 d -flag3 &another-attr" another-attr="hi"></div>`

  const el = document.getElementById('test')

  expect(el).not.toBeNil()

  if (el) expect(parseAttrCmd(el, 'p-test')).toEqual({
    positional: ['pos_a', 'pos_b', 'hi'],
    flags: new Map([
      ['flag1', 'c'],
      ['flag2', 'd'],
      ['flag3', 'hi']
    ])
  })
})
