const Koa = require('koa')

const { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewrite')
const { serveStaticPlugin } = require('./plugins/serverPluginServeStatic')
const { moduleResolvePlugin } = require('./plugins/serverPluginModuleResolve')
const { htmlRewritePlugin } = require('./plugins/serverPluginHtml')
const { vuePlugin } = require('./plugins/serverPluginVue')

function createServer() {
  const app = new Koa()
  const root = process.cwd()
  const context = {
    app,
    root,
  }
  const resolvedPlugins = [
    htmlRewritePlugin,
    moduleRewritePlugin,
    moduleResolvePlugin,
    vuePlugin, // TODO: 解析css、image
    serveStaticPlugin,
  ]
  resolvedPlugins.forEach(plugin => plugin(context))
  return app
}

module.exports = createServer