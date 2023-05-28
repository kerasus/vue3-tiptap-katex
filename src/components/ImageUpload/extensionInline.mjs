import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveImageUpload from './TiptapInteractiveImageUpload.vue'

export default Node.create({
  name: 'TiptapInteractiveImageUploadInline',

  group: 'inline',

  atom: true,
  inline: true,

  draggable: true,

  addAttributes() {
    return {
      url: {
        default: '',
        parseHTML: (element) => element.getAttribute('src'),
        renderHTML: (attributes) => ({
          src: attributes.url,
        }),
      },
      width: {
        default: 0,
      },
      height: {
        default: 0,
      },
      justify: {
        default: 'center',
        renderHTML: () => ({}),
      },
      vertical: {
        default: 0,
        parseHTML: (element) => {
          const vertical = parseInt(element.getAttribute('data-vertical'), 10)
          if (Number.isNaN(vertical)) {
            return 0
          }
          return vertical
        },
        renderHTML: (attributes) => ({
          'data-vertical': attributes.vertical,
          style: `vertical-align: ${-1 * attributes.vertical}px`,
        }),
      },
      horizontal: {
        default: 0,
        renderHTML: () => ({}),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapInteractiveImageUpload)
  },
})
