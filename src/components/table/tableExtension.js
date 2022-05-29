import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveTable from './TiptapInteractiveTable';

export default Node.create({
    name: 'TiptapInteractiveTable',

    group: 'block',

    content: 'inline*',

    addAttributes() {
        return {
            data: {
                default: Array(3).fill(Array(3).fill({
                    cellWidth: '100px',
                    cellBg: '#fff',
                    cellBorderVisibility: {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true
                    },
                    cellBorderColor: '#000',
                    cellBorderType: 'solid',
                    cellBorderWidth: '1px'
                })),
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-table',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-table', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractiveTable)
    },
})
