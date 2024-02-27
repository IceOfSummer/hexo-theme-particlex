/**
 * fix #4.
 */
hexo.extend.filter.register('before_post_render', function(data){
  if (typeof data.content === 'string') {
    const contentBuilder = []
    const content = data.content

    let codeCounter = 0
    let lastIndex = 0
    const len = content.length
    for (let i = 0; i < len; ++i) {
      const ch = content.charAt(i)
      if (ch === '`') {
        codeCounter++
      } else {
        codeCounter = 0
      }
      if (codeCounter < 3) {
        continue
      }
      // 遍历到code block close
      const index = content.indexOf('```', i + 1)
      contentBuilder.push(content.substring(lastIndex, i))
      lastIndex = i
      let code = content.substring(i, index)
      lastIndex = index
      code = code.replaceAll('>', '&gt;')
      code = code.replaceAll('<', '&lt;')
      contentBuilder.push(code)

      codeCounter = 0
      i = index + 3
    }
    if (lastIndex !== len) {
      contentBuilder.push(content.substring(lastIndex))
    }
    data.content = contentBuilder.join('')
  }
  return data
})