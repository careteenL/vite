const { readBody } = require('./utils')
const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')

function rewriteImports(source) {
  const imports = parse(source)[0]
  const ms = new MagicString(source)
  if (imports.length) {
    for (let i = 0; i < imports.length; i++) {
      const { s, e } = imports[i];
      let id = source.substring(s, e)
      if (/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`
        ms.overwrite(s, e, id)
      }
    }
  }
  return ms.toString()
}

function moduleRewritePlugin(context) {
  const { app, root } = context
  app.use(async (ctx, next) => {
    await next()
    if (ctx.body && ctx.response.is('js')) {
      const content = await readBody(ctx.body)
      const result = rewriteImports(content)
      ctx.body = result
    }
  })
}

exports.moduleRewritePlugin = moduleRewritePlugin