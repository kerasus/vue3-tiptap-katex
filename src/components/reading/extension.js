import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractiveReading from './TiptapInteractiveReading';

export default Node.create({
    name: 'TiptapInteractiveReading',

    group: 'block',

    content: 'inline*',

    draggable: true,

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-reading',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-reading', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractiveReading)
    },
})
