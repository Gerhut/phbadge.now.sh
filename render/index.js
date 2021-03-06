const fs = require('fs')

const anafanafo = require('anafanafo')
const mustache = require('mustache')

const template = fs.readFileSync(require.resolve('./index.mustache'), 'utf8')

mustache.parse(template)

module.exports = (left, right) => {
  // 3 | 1 | left | 1 | 1 | right | 1 | 3
  const leftWidth = Math.ceil(anafanafo(left, { font: 'bold 11px Helvetica' }))
  const rightWidth = Math.ceil(anafanafo(right, { font: 'bold 11px Helvetica' }))
  return mustache.render(template, {
    left,
    right,

    leftWidth,
    rightWidth,

    width: leftWidth + rightWidth + 14,
    rectX: leftWidth + 7,
    rectWidth: rightWidth + 4,
    rightX: leftWidth + 9
  })
}
