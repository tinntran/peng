export interface AttrCmdResult {
  positional: string[]
  flags: Record<string, string>
}

export function parseCmd(inp: string): AttrCmdResult {
  const result: AttrCmdResult = { positional: [], flags: {} }

  let currentFlag: string | null = null

  const validFlag = /-(\w+)/g
  const splitCondition = /"([^"]*)"|'([^']*)'|(\S+)/g

  inp.match(splitCondition)?.map(word => {
    const str = word.replaceAll(/["']/g, '')

    if (validFlag.test(str)) {
      currentFlag = str.slice(1)
    }

    if (currentFlag) result.flags[currentFlag] = str
    else result.positional.push(str)

  })

  return result
}

export function parseAttrCmd(element: Element, attrQuery: string): AttrCmdResult | null {
  const attr = element.getAttribute(`${attrQuery}`)

  if (attr) return parseCmd(attr)
  else return null
}
