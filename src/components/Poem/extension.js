import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractivePoem from "./TiptapInteractivePoem";
export default Node.create({
    name: 'TiptapInteractivePoem',

    group: 'block',

    draggable: true,

    inline: false,

    atom: true,

    addAttributes() {
        return {
            poem: {
                default: [['الا یا ایها الساقی ادر کاسا و ناولها', 'که عشق آسان نمود اول ولی افتاد مشکل ها']],
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
        return ['tiptap-interactive-poem', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractivePoem)
    },
})
