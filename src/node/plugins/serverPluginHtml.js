const {readBody} = require('./utils')
function htmlRewritePlugin(context){
  const { app } = context
  const inject = `
    <script>
      window.process = {}
      process.env = {NODE_ENV:'development'}
    </script>
  `
  // TODO: 注入热更新
  app.use(async (ctx,next)=>{
    await next()
    if (ctx.response.is('html')) {
      const html = await readBody(ctx.body)
      ctx.body = html.replace(/<head>/, `$&${inject}`)
    }
  })
}

exports.htmlRewritePlugin = htmlRewritePlugin