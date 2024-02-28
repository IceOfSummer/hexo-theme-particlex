
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
        setTimeout(() => {
          isCopy.value = false
        }, 1000)
      });
    }

    const showAll = () => {
      shouldHide.value = false
    }

    return () => (
      <div class="content-holder" style={`height: ${shouldHide.value ? window.innerHeight / 2 + 'px' : 'auto'}`}>
        <div class="code-content" ref={codeBlockContent}>{props.code}</div>
        <div class="language">{props.lang}</div>
        <div class={`code-copy ${isCopy.value ? 'copied' : ''}`} onClick={copyCode}>
          <i class="fa-solid fa-copy fa-fw"></i>
          <i class="fa-solid fa-clone fa-fw"></i>
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
