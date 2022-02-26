import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import mesra from './mesra';

export default Node.create({
    name: 'mesra',

    group: 'block',

    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'mesra',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['mesra', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(mesra)
    },
})
