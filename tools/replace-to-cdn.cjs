/**
 * 将所有静态资源的url替换为cdn链接，而不是直接从源站读取，该操作能极大提示博客访问速度(如果你打开F12经常会发现卡在加载字体了)。
 * <p>
 * 替换方法: 上传打包后的images和static目录里的所有东西到你的对象存储里面，注意要上传的同一个目录里面：
 * <pre>
 * xxx.your.cdn
 * └── prefixA
 *     ├── images
 *     │   ├── loading.gif
 *     │   └── ...
 *     └── static
 *         ├── fonts.min.css
 *         └── fonts
 *             └── ...
 * </pre>
 * 例如上方树形结构，cdn的请求前缀为<code>https://xxx.your.cdn/prefixA</code>
 * <p>
 * 上传完成后，修改下面的配置，然后运行脚本。
 * <p>
 * 不会替换配置<code>_config.yaml</code>中的路径，请在hexo的外层配置文件里面自己设置！
 */
const fs = require("fs")
const path = require("path")
// =======================配置=======================
// cdn请求前缀，你可以在<b>本地(域名为localhost)</b>测试时使用这个url，不要在你的对外开放的博客中使用！
const CDN_PREFIX = "https://selfb.asia/static/particlex"
// 你的主题路径
const THEME_PATH = "D:\\Blog\\iceofsummer.github.io\\themes\\particlex-my"
// ==================================================

const SAFE_CDN_PREFIX = CDN_PREFIX.endsWith('/') ? CDN_PREFIX : CDN_PREFIX + '/'
const NO_SUF_CND_PREFIX = CDN_PREFIX.endsWith('/') ? CDN_PREFIX.substring(0, CDN_PREFIX.length - 1) : CDN_PREFIX

/**
 * replace url_for
 * @param {string} content 文件内容
 * @param {(path: string) => boolean} [shouldReplace]
 * @return {string}
 */
function replaceUrlFor(content, shouldReplace) {
  const regx = /<%- url_for\("([/\w+.]+)"\) %>/g
  let match
  let result = content
  while ((match = regx.exec(content))) {
    if (shouldReplace && shouldReplace(match[1])) {
      result = result.replace(match[0],
        match[1].startsWith('/') ? NO_SUF_CND_PREFIX + match[1] : SAFE_CDN_PREFIX + match[1])
    }
  }
  return result
}

/**
 * 替换所有<code>url_for</code>为远程cdn。
 * <p>
 * 不会替换js文件。
 * @param filepath
 */
function replaceFileUrlFor(filepath) {
  fs.writeFileSync(filepath, replaceUrlFor(
    fs.readFileSync(filepath, {encoding: 'utf8'}),
    p => {
      return p.startsWith('/images') || p.startsWith('/static')
    }
  ))
}

/**
 * source/static/fonts.min.css
 */
function replaceFont() {
  const target = path.resolve(THEME_PATH, 'source/static/fonts.min.css')
  const content = fs.readFileSync(target, {encoding: 'utf8'})
  fs.writeFileSync(target, content.replaceAll('fonts/s/', `${SAFE_CDN_PREFIX}static/fonts/s/`))
}

// ========================main========================
replaceFont()
replaceFileUrlFor(`${THEME_PATH}/layout/import.ejs`)
replaceFileUrlFor(`${THEME_PATH}/layout/layout.ejs`)