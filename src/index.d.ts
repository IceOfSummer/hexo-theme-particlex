declare var Vue: typeof import("vue")

/**
 * only support the files in 'src'
 */
declare var process: {
  env: {
    NODE_ENV: 'development' | 'production'
  }
}

declare var mixins: Record<string, any>
/**
 * webpack global constant
 * @see constant.js
 */
declare var ARTICLE_MAX_WIDTH_PX: string
declare var ARTICLE_MAX_WIDTH: number
declare var BACKGROUND_COLOR: string
declare var hljs: import('highlight.js').HLJSApi