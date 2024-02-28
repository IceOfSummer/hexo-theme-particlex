import PartialCodeBlock from "../component/PartialCodeBlock.jsx"

mixins.highlight = {
    data() {
        return {
            copying: false,
        };
    },
    created() {
        hljs.configure({ ignoreUnescapedHTML: true });
        this.renderers.push(this.highlight);
    },
    methods: {
        highlight() {
            let that = this;
            let codes = document.querySelectorAll("pre");
            for (let i of codes) {
                let lang = [...i.classList, ...i.firstChild.classList][0] || "plaintext";
                let code = i.innerText;
                i.innerHTML = ''
                Vue.render(Vue.h(PartialCodeBlock, {code, lang}), i)
            }
        },
    },
};
