const static = require('koa-static')
const path = require('path')

function serveStaticPlugin (context) {
  const { app, root } = context
  app.use(static(root))
  app.use(static(path.join(root, 'public')))
}

exports.serveStaticPlugin = serveStaticPlugin;