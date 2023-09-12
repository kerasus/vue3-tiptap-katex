import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveInsertScript from './TiptapInteractiveInsertScript.vue'

export default Node.create({
  name: 'TiptapInteractiveInsertScript',

  group: 'block',

  content: 'inline*',


  // group: 'inline',

  // atom: true,
  // inline: true,
  //
  // draggable: true,

  addAttributes() {
    return {
      data: {
        default: null
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.barehtml',
        // getAttrs: (element) => {
        //   if (typeof element === 'string') return {};
        //   return element.getAttribute('class') === 'barehtml';
        // },
        // getAttrs: (element) => element.getAttribute('class') === 'barehtml'
      }
    ]
  },

  renderHTML(data) {
    // if (data.HTMLAttributes.data) {
    //   return ['div', { class: 'barehtml', data: data.HTMLAttributes.data }]
    // }

    return ['div', { class: 'barehtml', data: data.HTMLAttributes.data }]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractiveInsertScript)
  }
})
