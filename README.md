**DEPRECATED**, new version here: [particlex](https://github.com/nextjs-particlex-theme/particlex). Build with next.js, fast that you can't image.

# Hexo-Theme-ParticleX

[ParticleX](https://github.com/argvchs/hexo-theme-particlex) 主题的魔改版本。原本这个仓库是从这里fork出来的，但是fork的提示太烦了，所以我把fork的仓库删了重新创建了一个

## 演示

-   [GitHub Pages](https://iceofsummer.github.io/)

## 新特性

因为是魔改版本，所以有我自己新加的一些东西:

- [x] 图片懒加载(在**外部**配置文件中配置`lazyload.disabled=true`即可关闭，修改配置后可能需要清除缓存：`hexo cl`)
- [x] 资源压缩(js和css代码全部经过压缩)
- [x] 文章目录
- [x] 不再以个人头像为网页图标(默认加载`favicon.ico`，你可以直接将网站图标丢到`source`目录下)
- [x] 首页不再显示文章全部内容，只会显示部分内容(v1.0.1及以上版本可用)

## 安装

### 从Actons列表下载(推荐)

由于项目中用了webpack，**直接克隆项目是用不了的，需要手动打包！**

点击上方Actions，进入最后一次运行的Action，下载下面的文件。

### 开发

首先修改[webpack.config.dev.js](webpack.config.dev.js)文件中的`output.path`值为你的hexo博客主题路径。

运行如下指令即可进行开发：
```bash
npm i
npm run dev

# 另开一个命令行
hexo serve
```

## 博客工具

仓库的`tools`目录下提供了各种工具：

- [replace-to-cdn.cjs](tools/replace-to-cdn.cjs)：将主题的静态资源替换为自己的CDN加载(可以极大地提高博客访问速度)。
- [replace-old-cdn.cjs](tools/replace-old-cdn.cjs)：将博客中旧的CDN链接替换为新CDN的链接。

## 配置
### 关闭高亮 
Hexo 有自带的代码高亮，但是和 ParticleX 的不兼容(具体表现为代码块会出现bug)

```yaml
# hexo v7
syntax_highlighter: 
# hexo v6
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
# hexo v6, v7
prismjs:
    enable: false
```

### 底部作者链接
```yaml
authorHome: https://github.com/IceOfSummer
```


其它配置请在[ParticleX](https://github.com/argvchs/hexo-theme-particlex)中查看。

