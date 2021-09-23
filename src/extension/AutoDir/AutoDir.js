import {Extension} from '@tiptap/core';

const AutoDir = Extension.create({
    addGlobalAttributes() {
        return [
            {
                types: [
                    'heading',
                    'paragraph',
                    'bulletList',
                    'orderedList',
                ],
                attributes: {
                    autoDir: {
                        renderHTML: () => ({
                            dir: 'auto',
                        }),
                        parseHTML: element => ({
                            autoDir: element.dir.autoDir || 'auto',
                        }),
                    },
                },
            },
        ]
    },
})

export default AutoDir;
export { AutoDir };
