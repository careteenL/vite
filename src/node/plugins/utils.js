const { Readable } = require('stream')
const path = require('path')

async function readBody (stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      let res = ''
      stream.on('data', (data) => {
        res+= data
      })
      stream.on('end', () => {
        resolve(res)
      })
      stream.on('error', (error) => {
        reject(error)
      })
    })
  } else {
    return stream.toString()
  }
}

function resolveVue (root) {
  const compilerPkgPath = path.join(root,'node_modules', '@vue/compiler-sfc/package.json')
  const compilerPkg = require(compilerPkgPath)
  // node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js
  const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main)
  const resolvePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)
  const runtimeDomPath = resolvePath('runtime-dom') 
  const runtimeCorePath = resolvePath('runtime-core') 
  const reactivityPath = resolvePath('reactivity')
  const sharedPath  = resolvePath('shared')

  return {
    compiler:compilerPath, // 用于稍后后端进行编译的文件路径
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
    vue: runtimeDomPath
  }
}

exports.readBody = readBody
exports.resolveVue = resolveVue