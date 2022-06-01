# Vue Tiptap Katex

A rich-text and math editor for Vue.js v3 powered by [Tiptap](https://www.npmjs.com/package/tiptap) and [Mathlive](https://www.npmjs.com/package/mathlive).

## Installation

    npm install --save vue3-tiptap-katex

## Changelog
- add support for v-model
- add support for custom table cells


## Demo

    git clone https://github.com/kerasus/vue3-tiptap-katex
    cd vue3-tiptap-katex
    npm install
    npm run serve

Then you should be able to navigate with your browser and see the demo in http://localhost:8080/

## Usage

### on &lt;template&gt; add

something like this

    <vue-tiptap-katex ref="editor" />

### on &lt;script&gt; add

#### option 1

In the same template file, at `<script>` part, this will make the component available only to the template in this file

    import VueTiptapKatex from 'vue3-tiptap-katex'
    ...
    export default {
      ...
      components: {
        VueTiptapKatex,
        ...
      },
      ...
    }

#### option 2


At main Vue configuration, this will make the component available to all templates in your app

    import Vue from 'vue'
    import VueTiptapKatex from 'vue3-tiptap-katex'
    ...
    Vue.component('vue-tiptap-katex', VueTiptapKatex)

## How to set and get content
    export default {
        ...
        methods: {
            ...
            getContent() {
                const content = this.$refs.editor.getContent()
                console.log(content)
            },
            setContent() {
                const content = "<p>Hellow World!</p>"
                this.$refs.editor.setContent(content)
            },
            ...
        },
        ...
    }

### Note:
vue-tiptap-katex accepts plain text and HTML as input and exports text as HTML.

## Alternative option: v-model:

    <vue-tiptap-katex v-model="text" />

## Props
Note that all props are optional.


| Name         | Type    | Default                           | Description                 |
|--------------|---------|-----------------------------------|-----------------------------|
| loading      | Boolean | false                             | Loading overlay             |
| options      | Object  | See [Options Prop](#options-prop) | Editor Options              |

### Options Prop

All options are optional:

| Name            | Type     | Default | Description                                                                                         |
|-----------------|----------|---------|-----------------------------------------------------------------------------------------------------|
| bubbleMenu      | Boolean  | true    | Whether to show Bubble Menu or not                                                                  |
| floatingMenu    | Boolean  | true    | Whether to show Floating Menu or not                                                                |
| poem            | Boolean  | false   | Whether to show Poem Button in toolbar or not (This feature is designed for Arabic based languages) |
| persianKeyboard | Boolean  | false   | Adding Persian keyboard to Mathlive                                                                 |
| mathliveOptions | Object   | {}      | This Object is passed directly to Mathlive instance                                                 |
| uploadServer    | Object   | {}      | Upload image request config                                                                         |
| onResizeEnd     | Function | null    | Gets called after resizing image                                                                    |


####uploadServer example:
    { url: upload.com/image, headers: { Authentication: "token" }}

####onResizeEnd:
Arguments: url, width, height
Return value: url

Example:

    onResizeEnd (url, width, height) {
        return url.split('?w=')[0] + '?w=' + width + '&h=' + height
    }

## Develop and build

    npm install
    npm run build

## Contributors

[kerasus](https://github.com/kerasus/),
[neokazemi](https://github.com/neokazemi/)


## License

MIT
editable polyline plugin extension for vue2-leaflet package
