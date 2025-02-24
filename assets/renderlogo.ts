const fileName = prompt('svg file name', 'assets/peng-logo.svg') || 'assets/peng-logo.svg'
const PIXEL_SIZE = 8
const PHEIGHT = 5
const HEIGHT = PIXEL_SIZE * PHEIGHT
const PWIDTH = 11
const WIDTH = PIXEL_SIZE * PWIDTH
const COLOR = 'black'

let content = ''

async function append(data: string) {
  console.log('>>', data)

  content += data + '\n'
}

function prect(w: number, h: number, x = 0, y = 0): string {
  return `<rect width="${w * PIXEL_SIZE}" height="${h * PIXEL_SIZE}" x="${x * PIXEL_SIZE}" y="${y * PIXEL_SIZE}" fill="${COLOR}" />`
}

append(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">`)

// [

append(prect(1, 1, 1))

for (let i = 1; i < PHEIGHT - 1; i++) {
  append(prect(1, 1, 0, i))
}

append(prect(1, 1, 1, PHEIGHT - 1))

// "
append(prect(1, 2, 3, 1))
append(prect(1, 2, 5, 1))

// >
const mid = Math.floor(PHEIGHT / 2)

for (let i = 1; i <= mid; i++) {
  append(prect(1, 1, 6 + i, i))
}

for (let i = mid - 1; i > 0; i--) {
  append(prect(1, 1, 8 - i, mid + i))
}

// [
append(prect(1, 1, 9, 0))

for (let i = 1; i < PHEIGHT - 1; i++) {
  append(prect(1, 1, 10, i))
}

append(prect(1, 1, 9, PHEIGHT - 1))

append('</svg>')

Bun.write(fileName, content)
console.log(`Saved to ${fileName}`)
