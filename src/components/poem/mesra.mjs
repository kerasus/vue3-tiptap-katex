import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import mesra from './mesra.vue'

export default Node.create({
  name: 'mesra',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'div',
        getAttrs: (element) => element.getAttribute('class') === 'mesra'
      }
    ]
  },

  renderHTML() {
    return ['div', { class: 'mesra' }, 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(mesra)
  }
})
