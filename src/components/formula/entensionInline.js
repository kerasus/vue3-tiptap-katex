import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractiveKatex from './TiptapInteractiveKatex'

export default Node.create({
    name: 'TiptapInteractiveKatexInline',

    group: 'inline',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            katex: {
                default: 'x=\\frac{-4b\\pm \\sqrt{b^2-4ac}}{2a}',
            },
            inline: {
                default: true
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-katex-inline',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-katex-inline', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractiveKatex)
    },
})
