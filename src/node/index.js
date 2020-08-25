const Koa = require('koa')

const { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewrite')
const { serveStaticPlugin } = require('./plugins/serverPluginServeStatic')

function createServer() {
  const app = new Koa()
  const root = process.cwd()
  const context = {
    app,
    root,
  }
  const resolvedPlugins = [
    moduleRewritePlugin,
    serveStaticPlugin,
  ]
  resolvedPlugins.forEach(plugin => plugin(context))
  return app
}

module.exports = createServer