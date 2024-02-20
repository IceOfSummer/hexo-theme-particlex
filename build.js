const { spawnSync } = require("child_process")
const fs = require('fs')
const path = require("path")
const tar = require('tar')

const OUTPUT_PATH = './dist'
const start = Date.now()
const missions = [
  {path: 'layout', type: 'folder'},
  {path: 'scripts', type: 'folder'},
  {path: 'source', type: 'folder'},
  {path: '_config.yml', type: 'file'},
  {path: 'LICENSE', type: 'file'},
  {path: 'package.json', type: 'file'},
  {path: 'pnpm-lock.yaml', type: 'file'},
  {path: 'README.md', type: 'file'}
]

// ---------------js code-------------------
console.log('正在进行webpack打包，可能需要花费一定的时间...')
const r = spawnSync("npm run build",[], {stdio: 'inherit', shell:true})
if (r.status !== 0) {
  return
}
console.log('开始压缩')
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH)
}
tar.c({
  gzip: true,
  file: OUTPUT_PATH + '/hexo-theme-particlex.tar.gz',
  sync: true
}, missions.map(val => val.path))

console.log(`打包完毕! 共耗时${Date.now() - start}ms`)
