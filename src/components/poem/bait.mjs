import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractivePoem from './TiptapInteractivePoem.vue'

export default Node.create({
  name: 'TiptapInteractivePoem',

  group: 'block',

  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div',
        getAttrs: (element) => element.getAttribute('class') === 'beit'
      }
    ]
  },

  renderHTML() {
    return ['div', { class: 'beit' }, 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractivePoem)
  }
})
