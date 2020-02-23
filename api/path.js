const pathToRegexp = require('path-to-regexp')

const PATH = '/:left?/:right?'

const match = pathToRegexp.match(PATH, {
  end: false,
  decode: decodeURIComponent
})

const compile = pathToRegexp.compile(PATH, {
  encode: encodeURIComponent
})

exports.match = (url) => {
  return match(url).params
}

exports.compile = compile
