export interface AttrCmdArgs {
  positional: string[]
  flags: Record<string, string>
}

export function parseCmd(inp: string): AttrCmdArgs {
  const result: AttrCmdArgs = { positional: [], flags: {} }

  let currentFlag: string | null = null

  const validFlag = /-(\w+)/g
  const splitCondition = /\s+/g

  inp.split(splitCondition)?.map(word => {
    const str = word.replaceAll(/["']/g, '')

    if (validFlag.test(str)) {
      currentFlag = str
    }

    if (str === currentFlag) {
      result.flags[currentFlag.slice(1)] = 'true'
      return
    }

    if (currentFlag) {
      result.flags[currentFlag.slice(1)] = str
    } else {
      result.positional.push(str)
    }
  })

  return result
}

export function parseAttrCmd(element: Element, attrQuery: string): AttrCmdArgs | null {
  const attr = element.getAttribute(`${attrQuery}`)

  if (attr) return parseCmd(attr)

  return null
}

export function parseAttrCmdForEvery<T extends Element>(
  root: ParentNode,
  attrQuery: string,
  func: (args: AttrCmdArgs, element: T) => void
) {
  for (const el of root.querySelectorAll<T>(`[${attrQuery}]`)) {
    const args = parseAttrCmd(el, attrQuery) || { positional: [], flags: {} }

    func(args, el)
  }
}
