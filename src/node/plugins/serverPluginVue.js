const path = require('path')
const fs = require('fs').promises
const { resolveVue } = require('./utils')

const defaultExportRE = /((?:^|\n|;)\s*)export default/

function vuePlugin({ app, root }) {
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith('.vue')) {
      return next()
    }
    const filePath = path.join(root, ctx.path)
    const content = await fs.readFile(filePath, 'utf8')
    let { parse, compileTemplate } = require(resolveVue(root).compiler)
    let { descriptor } = parse(content)
    if (!ctx.query.type) {
      let code = ``
      if (descriptor.script) {
        let content = descriptor.script.content
        let replaced = content.replace(defaultExportRE, '$1const __script =')
        code += replaced
      }
      if (descriptor.template) { // /App.vue?type=template
        const templateRequest = ctx.path + `?type=template`
        code += `\nimport { render as __render } from ${JSON.stringify(
            templateRequest
        )}`
        code += `\n__script.render = __render`
      }
      // TODO: css
      ctx.type = 'js'
      code += `\nexport default __script`
      ctx.body = code
    }
    if (ctx.query.type == 'template') {
      ctx.type = 'js'
      let content = descriptor.template.content
      const { code } = compileTemplate({ source: content })
      ctx.body = code
    }
  })
}
exports.vuePlugin = vuePlugin