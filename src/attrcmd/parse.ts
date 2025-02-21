export interface AttrCmdArgs {
  positional: string[]
  flags: Map<string, string>
}

export function parseCmd(inp: string): AttrCmdArgs {
  const result: AttrCmdArgs = { positional: [], flags: new Map() }

  let currentFlag: string | null = null

  const splitCondition = /\s+/g

  inp.split(splitCondition)?.map(word => {
    const str = word.replaceAll(/["']/g, '')

    if (str.startsWith('-')) {
      currentFlag = str
    }

    if (str === currentFlag) {
      result.flags.set(currentFlag.slice(1), 'true')
      return
    }

    if (currentFlag) {
      result.flags.set(currentFlag.slice(1), str)
    } else {
      result.positional.push(str)
    }
  })

  return result
}

export function parseAttrCmd(element: Element, attrQuery: string): AttrCmdArgs | null {
  const attr = element.getAttribute(`${attrQuery}`)

  if (attr) {
    const args = parseCmd(attr) 

    args.positional.map((arg, i) => {
      if (arg.startsWith('&')) args.positional[i] = element.getAttribute(arg.slice(1)) || 'nil'
    })

    for (const [k, v] of args.flags.entries()) {
      if (v.startsWith('&')) args.flags.set(k, element.getAttribute(v.slice(1)) || 'nil')
    }

    return args 
  }

  return null
}

export function parseAttrCmdForEvery<T extends Element>(
  root: ParentNode,
  attrQuery: string,
  func: (args: AttrCmdArgs, element: T) => void
) {
  for (const el of root.querySelectorAll<T>(`[${attrQuery}]`)) {
    const args = parseAttrCmd(el, attrQuery) || { positional: [], flags: new Map() }

    func(args, el)
  }
}
