require('dotenv').config({ path: './.env.build' })
const nowJson = require('./now.json')

const envs = Object.keys(nowJson.build.env)

module.exports = {
  target: 'serverless',
  env: envs.reduce((env, k) => {
    env[k] = process.env[k]
    return env
  }, {})
}
