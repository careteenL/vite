#! /usr/bin/env node
const createServer = require('../src/node/index')

const port = 3001

createServer().listen(port, () => {
  console.log(`Server start ${port} port: `, `http://localhost:${port}`)
})
