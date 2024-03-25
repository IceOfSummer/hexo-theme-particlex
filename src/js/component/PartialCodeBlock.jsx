const HIDE_HEIGHT_THRESHOLD = 600

const PartialCodeBlock = Vue.defineComponent({
  name: 'PartialCodeBlock',
  props: {
    code: String,
    lang: String
  },
  setup(props) {
    const codeBlockContent = Vue.ref(null)
    const height = Vue.ref(0)
    const isCopy = Vue.ref(false)
    const shouldHide = Vue.ref(false)
    const wrapLine = Vue.ref(false)

    Vue.onMounted(() => {
      if (codeBlockContent.value) {
        hljs.highlightElement(codeBlockContent.value)
        Vue.nextTick(() => {
          height.value = 100
          if (codeBlockContent.value.clientHeight > window.innerHeight / 2) {
            shouldHide.value = true
          }
        }).catch(e => console.log(e))
      }
    })

    const copyCode = () => {
      navigator.clipboard.writeText(props.code).then(r => {
        isCopy.value = true
      })
    }

    const showAll = () => {
      shouldHide.value = false
    }

    const onMouseLeave = () => {
      isCopy.value = false
    }

    const onWrapLineClick = () => {
      wrapLine.value = !wrapLine.value
      console.log(wrapLine.value)
    }

    return () => (
      <div class="content-holder" style={`height: ${shouldHide.value ? window.innerHeight / 2 + 'px' : 'auto'}`}>
        <div class="code-content" style={wrapLine.value ? 'width: 100%;text-wrap:wrap;' : undefined}
             ref={codeBlockContent}>{props.code}</div>
        <div class="language">{props.lang}</div>
        <div class="code-block-toolbar">
          <div class="wrap-line-btn" title="自动换行">
            {
              wrapLine.value ?
                (

                  <svg t="1711335549602" className="icon" viewBox="0 0 1024 1024" version="1.1" onClick={onWrapLineClick}
                       xmlns="http://www.w3.org/2000/svg" p-id="5491" width="18" height="18">
                    <path
                      d="M104 184c0-18 16-32 36-32h748c20 0 36 14 36 32s-16 32-36 32H140c-20 0-36-14.3-36-32z m0 576c0 17.7 16 32 36 32h248c20 0 36-14 36-32s-16-32-36-32H140c-20 0-36 14.3-36 32z m570-32h54.4c30.5 0 88.1-12 105.1-43 17.2-31.4 15-117-1-149s-48-44-96.1-44H138c-18 0-34-16-34-34s16-34 34-34h598.4c80 0 129.1 28.1 156.1 76 27 48 25 172 0 220-25.4 48.7-76.5 76-164.5 76h-54v67c0 6.5-3.3 12.3-9.1 15.2-5.8 2.9-12.7 2.3-17.9-1.6L542 784c-8.6-6.5-14-16-14-24s5.4-17.5 14-24l105-88.5c5.2-3.9 12.1-4.5 17.9-1.6 5.8 2.9 9.1 8.6 9.1 15.1v67z"
                      p-id="5492" fill="#66afef"></path>
                  </svg>
                ) : (
                  <svg t="1711335549602" className="icon" viewBox="0 0 1024 1024" version="1.1" onClick={onWrapLineClick}
                       xmlns="http://www.w3.org/2000/svg" p-id="5491" width="18" height="18">
                    <path
                      d="M104 184c0-18 16-32 36-32h748c20 0 36 14 36 32s-16 32-36 32H140c-20 0-36-14.3-36-32z m0 576c0 17.7 16 32 36 32h248c20 0 36-14 36-32s-16-32-36-32H140c-20 0-36 14.3-36 32z m570-32h54.4c30.5 0 88.1-12 105.1-43 17.2-31.4 15-117-1-149s-48-44-96.1-44H138c-18 0-34-16-34-34s16-34 34-34h598.4c80 0 129.1 28.1 156.1 76 27 48 25 172 0 220-25.4 48.7-76.5 76-164.5 76h-54v67c0 6.5-3.3 12.3-9.1 15.2-5.8 2.9-12.7 2.3-17.9-1.6L542 784c-8.6-6.5-14-16-14-24s5.4-17.5 14-24l105-88.5c5.2-3.9 12.1-4.5 17.9-1.6 5.8 2.9 9.1 8.6 9.1 15.1v67z"
                      p-id="5492" fill="#666666"></path>
                  </svg>
                )
            }
          </div>
          <div class={`code-copy ${isCopy.value ? 'copied' : ''}`} onClick={copyCode} onMouseleave={onMouseLeave}>
            <i class="fa-solid fa-copy fa-fw"></i>
            <i class="fa-solid fa-clone fa-fw"></i>
          </div>
        </div>
        {
          shouldHide.value ?
            <div class="bottom-layer">
              <a href="javascript:void(0);" onClick={showAll}>显示全部</a>
            </div> : null
        }
      </div>
    )
  }
})

export default PartialCodeBlock
