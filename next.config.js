require('dotenv').config()

module.exports = {
  target: 'serverless',
  env: {
    CLIENT_ID: process.env.CLIENT_ID
  }
}
