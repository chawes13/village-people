const path = require('path')

const rootPath = path.resolve(__dirname, '../')
const to = relPath => path.join(rootPath, relPath)

// Important paths for webpack configs

const paths = {
  sourceFolder: to('src'),
  jsFolder: to('src/js'),
  outputFolder: to('build'),
  publicFolder: to('public'),
  htmlTemplate: to('public/index.html'),
}

module.exports = paths