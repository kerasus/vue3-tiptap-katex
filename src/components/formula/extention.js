import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveKatex from './TiptapInteractiveKatex'

export default Node.create({
  name: 'TiptapInteractiveKatex',

  group: 'block',

  draggable: true,

  inline: false,

  atom: true,

  addAttributes() {
    return {
      katex: {
        default: 'x=\\frac{-2b\\pm \\sqrt{b^2-4ac}}{2a}',
      },
      inline: {
        default: false
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'tiptap-interactive-katex',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['tiptap-interactive-katex', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractiveKatex)
  },
})
