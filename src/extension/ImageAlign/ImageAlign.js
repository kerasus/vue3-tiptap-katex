import { Extension } from '@tiptap/core';

const ImageAlign = Extension.create({
    name: 'imageAlign',
    defaultOptions: {
        types: ['TiptapInteractiveImageUpload'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: '',
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    imageAlign: {
                        default: this.options.defaultAlignment,
                        parseHTML: element => ({
                            textAlign: this.options.defaultAlignment,
                        }),
                        renderHTML: attributes => {
                            return { style: `text-align: ${attributes.textAlign}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setImageAlign: (alignment) => ({ commands }) => {
                if (!this.options.alignments.includes(alignment)) {
                    return false;
                }
                return this.options.types.every(type => commands.updateAttributes('TiptapInteractiveImageUpload', { justify: alignment }))
            },
            unsetImageAlign: () => ({ commands }) => {
                return this.options.types.every(type => commands.updateAttributes('TiptapInteractiveImageUpload', { justify: 'center' }))
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            'Mod-Shift-l': () => this.editor.commands.setImageAlign('left'),
            'Mod-Shift-e': () => this.editor.commands.setImageAlign('center'),
            'Mod-Shift-r': () => this.editor.commands.setImageAlign('right'),
        };
    },
});

export default ImageAlign;
export { ImageAlign };
