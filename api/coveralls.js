const axios = require('axios').default

const { name, version } = require('../package.json')

/** @type {import('koa').Middleware} */
module.exports = async (context) => {
  const { owner, repo } = context.params
  let coverage = 'unknown'
  try {
    const githubResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'User-Agent': `${name}/${version}`
      }
    })
    const defaultBranch = githubResponse.data.default_branch

    const coverallsResponse = await axios.get(`https://coveralls.io/github/${owner}/${repo}.json`, {
      params: {
        branch: defaultBranch
      },
      headers: {
        'User-Agent': `${name}/${version}`
      }
    })
    console.log(coverallsResponse.data)
    coverage = coverallsResponse.data.covered_percent + '%'
  } catch (error) {
    console.error(error)
    coverage = 'unknown'
  }
  context.redirect(`/coverage/${coverage}`)
}
