const Koa = require('koa')

function createServer() {
  const app = new Koa()
  return app
}

module.exports = createServer