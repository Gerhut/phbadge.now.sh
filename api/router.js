
const Router = require('@koa/router')

const router = new Router({
  sensitive: true,
  strict: true
})

router.get([
  '/travis-ci.org/:owner/:repo',
  '/travis/:owner/:repo'
], require('./travis.org'))
router.get('/travis-ci.com/:owner/:repo', require('./travis.com'))

router.get('/coveralls/:owner/:repo', require('./coveralls'))

router.get('/:left/:right', require('./render'))
router.get('/:left', (context) => context.redirect(`/${context.params.left}/hub`))
router.get('/', (context) => context.redirect('/Pxxn/hub'))

module.exports = router
