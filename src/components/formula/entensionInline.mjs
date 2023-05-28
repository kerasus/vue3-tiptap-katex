import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveKatex from './TiptapInteractiveKatex.vue'

export default Node.create({
  name: 'TiptapInteractiveKatexInline',

  group: 'inline',

  draggable: true,

  inline: true,

  atom: true,

  addAttributes() {
    return {
      katex: {
        // default: 'x=\\frac{-4b\\pm \\sqrt{b^2-4ac}}{2a}',
        default: 'formulaEditPanel',
        parseHTML: (element) => element.innerHTML.split('$')[1],
      },
      inline: {
        default: true,
      },
      editMode: {
        default: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element) => element.hasAttribute('data-katex'),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { 'data-katex': true }, `$${HTMLAttributes.katex}$`]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractiveKatex)
  },
})
