import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractiveReading from './TiptapInteractiveReading';

export default Node.create({
    name: 'TiptapInteractiveReading',

    group: 'block',

    content: 'block+',

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => element.getAttribute('class') === 'reading-duplicate'
            }
        ]
    },

    renderHTML() {
        return ['div', { class: 'reading-duplicate' }, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractiveReading)
    },
})
