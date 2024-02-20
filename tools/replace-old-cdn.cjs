/**
 * 替换旧的cdn链接。因为域名续费很贵，不如新买一个，所有就有了这个脚本。
 * <p>
 * 主题不会主动更新，请重新安装并运行相关替换脚本，或者自定义该脚本。
 */
const fs = require("fs")

// =================config=================
const oldCdn = 'https://xds.asia'
const newCdn = 'https://selfb.asia'
// 博客路径
const BLOG_PATH = ''

// ========================================
const blackDirectory = new Set()

blackDirectory.add('node_modules')
// replace source file

function replaceFile(path) {
  const content = fs.readFileSync(path, {encoding: 'utf8'})
  fs.writeFileSync(path, content.replaceAll(oldCdn, newCdn), {encoding:'utf8'})
}

function replaceDir(path) {
  const files = fs.readdirSync(path, {withFileTypes: true})
  files.forEach((val) => {
    if (val.isDirectory()) {
      replaceDir(path + '/' + val.name)
    } else {
      replaceFile(path + '/' + val.name)
    }
  })
}


replaceDir(BLOG_PATH + './source')
replaceFile(BLOG_PATH + '/_config.yml')
