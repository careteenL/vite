function moduleRewritePlugin (context) {
  const { app, root } = context
  app.use(async (cxt, next) => {
    await next()
    
  })
}

exports.moduleRewritePlugin = moduleRewritePlugin