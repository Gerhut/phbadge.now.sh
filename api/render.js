const render = require('../render')

/** @type {import('koa').Middleware} */
module.exports = (context) => {
  const { left, right } = context.params
  context.type = 'svg'
  context.body = render(left, right)
}
