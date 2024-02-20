const TOC_CLASSNAME_PREFIX = 'toc-level-'
const SCAN_FROM_ELEMENT_ID = 'main-content'


class Topic {
  /**
   * 标题名称
   * @type {string}
   */
  name
  /**
   * 要添加的类名
   * @type {string}
   */
  _className
  /**
   * 跳转链接
   * @type {string}
   */
  link
  /**
   * 标题等级
   */
  _level
  /**
   * 元素
   */
  element

  /**
   *
   * @param element {ChildNode}
   * @param level {number}
   */
  constructor(element, level) {
    this.element = element
    this.name = element.textContent
    this._className = TOC_CLASSNAME_PREFIX + level
    this.link = '#' + element.id
    this._level = level
  }

  /**
   * 检查当前元素是否在以当前窗口<b>中间</b>为界限的上面
   */
  isAboveWindow() {
    return this.element.offsetTop < (document.documentElement.scrollTop + window.innerHeight / 3)
  }

  get className() {
    return this._className
  }

  get level() {
    return this._level
  }

  set level(value) {
    this._className = TOC_CLASSNAME_PREFIX + value
    this._level = value
  }
}

const TopicItem = Vue.defineComponent({
  name: 'TopicItem',
  props: {
    item: Topic,
    visible: Boolean,
    index: Number
  },
  emits: {
    linkClick: Number
  },
  /**
   */
  setup(props, {emit}) {
    const onLinkClick = () => {
      emit('linkClick', props.index)
    }
    process.env.NODE_ENV
    return () => (
      <div class={[props.visible ? 'toc-item-active' : 'toc-item-inactive', 'toc-item', props.item.className]}>
        <a onClick={onLinkClick} href={props.item.link}>{props.item.name}</a>
      </div>
    )
  }
})

const TocComponent = Vue.defineComponent({
  components: {
    TopicItem
  },
  name: 'toc-component',
  setup() {
    const topics = Vue.ref([])
    const currentActive = Vue.ref(1)
    const tocWidth = Vue.ref('0')
    let lock

    function scrollListener() {
      if (lock) {
        return
      }
      let i;
      for (i = topics.value.length - 1; i >= 0; i--) {
        const topic = topics.value[i]
        if (topic.isAboveWindow()) {
          currentActive.value = i
          break
        }
      }
      if (i === -1) {
        currentActive.value = 0
      }
    }

    function resizeListener() {
      adjustTocLabel()
    }

    Vue.onMounted(() => {
      const element = document.getElementById(SCAN_FROM_ELEMENT_ID)
      if (!element) {
        return
      }
      const toc = []
      const childNodes = element.childNodes
      let minLevel = 1000
      childNodes.forEach(value => {
        // 检查是否为标题标签
        let level
        if (!(value.nodeName.length === 2
          && value.nodeName[0] === 'H'
          && !Number.isNaN(level = Number.parseInt(value.nodeName[1])))) {
          return
        }
        toc.push(new Topic(value, level))
        minLevel = Math.min(minLevel, level)
      })
      topics.value = toc
      // 将topic的level换成相对level，<b>保证最低level为1</b
      if (minLevel > 1) {
        const gap = minLevel - 1
        toc.forEach(value => {
          value.level -= gap
        })
      }
      window.addEventListener('scroll', scrollListener)
      window.addEventListener('resize', resizeListener)
      scrollListener()
      adjustTocLabel()
      setTimeout(() => {
        adjustTocLabel()
        currentActive.value = 0
        // 这里立即执行的话会有问题
      }, 1200)
    })

    Vue.onUnmounted(() => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', resizeListener)
    })

    const adjustTocLabel = () => {
      const { clientWidth } = document.documentElement
      // 防止顶部header挡住目录
      tocWidth.value = ((clientWidth - ARTICLE_MAX_WIDTH) / 2) + 'px'
    }

    const onLinkClick = (index) => {
      lock = true
      currentActive.value = index
      setTimeout(() => {
        lock = false
      }, 50)
    }

    return () => (
      <div id="toc" style={{top: '50%', transform: 'translateY(-50%)', maxHeight: '80%', width: tocWidth.value}}>
        <div class="toc-scroll">
          {
            topics.value.length > 0 ?
              <div class="toc-header" style={{backgroundColor: BACKGROUND_COLOR}}>目录</div> :
              null
          }
          {
            topics.value.map((item, index) => {
              return (
                <TopicItem
                  key={item.name}
                  item={item}
                  visible={currentActive.value === index}
                  onLinkClick={onLinkClick}
                  index={index}
                >
                </TopicItem>
              )
            })
          }
        </div>
      </div>
    )
  }
})

mixins.toc = {
  components: {
    'toc-component': TocComponent
  }
}
