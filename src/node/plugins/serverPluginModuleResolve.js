const fs = require('fs').promises
const { resolveVue } = require('./utils')
const moduleReg = /^\/@modules\//

function moduleResolvePlugin (context) {
  const { app, root } = context
  app.use(async (ctx, next) => {
    const vueResolved = resolveVue(root)
    if (!moduleReg.test(ctx.path)) {
      return next()
    }
    const id = ctx.path.replace(moduleReg, '')
    ctx.type = 'js'
    const content = await fs.readFile(vueResolved[id], 'utf8')
    ctx.body = content
  })
}

exports.moduleResolvePlugin = moduleResolvePlugin
