import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractivePoem from './TiptapInteractivePoem';

export default Node.create({
    name: 'TiptapInteractivePoem',

    group: 'block',

    content: 'inline*',

    addAttributes() {
        return {
            poem1: {
                default: ''
            },
            poem2: {
                default: ''
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-poem',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-poem', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractivePoem)
    },
})
