import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractiveImageUpload from './TiptapInteractiveImageUpload'

export default Node.create({
    name: 'TiptapInteractiveImageUpload',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            url: {
                default: '',
            },
            width: {
                default: 0
            },
            height: {
                default: 0
            },
            token: {
                default: ''
            },
            upload: {
                default: ''
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-image-upload',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-image-upload', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractiveImageUpload)
    },
})
