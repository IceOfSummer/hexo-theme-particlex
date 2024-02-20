const MAX_ALLOW_LENGTH = 300
const PartialPost = Vue.defineComponent({
  name: 'PartialPost',
  props: {
    content: String
  },
  setup(props) {
    console.log(props)
    let presentContent
    let isPartialShow
    if (props.content.length >= MAX_ALLOW_LENGTH) {
      presentContent = props.content.substring(0, MAX_TOC_LEN)
      isPartialShow = true
    } else {
      presentContent = props.content
      isPartialShow = false
    }
    return () => (
      <div v-html={presentContent}></div>
    )
  }
})

mixins.particalPost = {
  components: {
    PartialPost
  }
}
