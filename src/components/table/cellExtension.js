import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import cell from './cell';

export default Node.create({
    name: 'cell',

    group: 'block',

    content: 'inline*',

    addAttributes() {
        return {
            cellWidth: {
                default: '100px',
            },
            cellBg: {
                default: '#f00'
            },
            cellBorderVisibility: {
                default: {
                    top: false,
                    right: true,
                    bottom: true,
                    left: true
                }
            },
            cellBorderColor: {
                default: '#000'
            },
            cellBorderType: {
                default: 'dashed'
            },
            cellBorderWidth: {
                default: '10px'
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'table-cell',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['table-cell', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(cell)
    },
})
