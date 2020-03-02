const axios = require('axios').default

const { name, version } = require('../package.json')

/** @type {import('koa').Middleware} */
module.exports = async (context) => {
  const { owner, repo } = context.params
  const slug = encodeURIComponent(`${owner}/${repo}`)
  let state = 'unknown'
  try {
    const response = await axios.get(`https://api.travis-ci.org/repo/${slug}`, {
      params: {
        include: 'branch.last_build'
      },
      headers: {
        'Travis-API-Version': '3',
        'User-Agent': `${name}/${version}`
      }
    })
    state = response.data.default_branch.last_build.state
  } catch (error) {
    console.error(error)
    state = 'unknown'
  }
  context.redirect(`/build/${state}`)
}
