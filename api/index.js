const { match, compile } = require('./path')
const { render } = require('./template')

module.exports = (req, res) => {
  const { left = 'Pxxn', right = 'hub' } = match(req.url)
  const url = compile({ left, right })
  if (url !== req.url) {
    return res.writeHead(308, {
      Location: url
    }).end(`Redirecting to ${url}`)
  }
  return res.writeHead(200, {
    'Content-Type': 'image/svg+xml'
  }).end(render(left, right))
}
