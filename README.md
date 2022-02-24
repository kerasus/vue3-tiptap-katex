# Vue Tiptap Katex

A rich-text and math editor for Vue.js v3 powered by [Tiptap](https://www.npmjs.com/package/tiptap) and [Mathlive](https://www.npmjs.com/package/mathlive).

For Vue 3 support see [vue-tiptap-katex](https://www.npmjs.com/package/vue-tiptap-katex)

## Installation

    npm install --save vue-tiptap-katex

## Demo

    git clone https://github.com/kerasus/vue-tiptap-katex
    cd vue-tiptap-katex
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

    import VueTiptapKatex from 'vue-tiptap-katex'
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
    import VueTiptapKatex from 'vue-tiptap-katex'
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

###Note:
vue-tiptap-katex accepts plain text and HTML as input and exports text as HTML.

## Props
Note that all props are optional.


| Name             | Type    | Default                                                                                                           | Description                       |
| ---------------- |---------|-------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| accessToken      | String  | Null                                                                                                              | Access Token for uploading images |
| uploadUrl        | String  | Null                                                                                                              | URL for uploading images          |
| loading          | Boolean | false                                                                                                             | Loading overlay                   |
| options          | Object  | { bubbleMenu: true, floatingMenu: true, poem: false, reading: false, persianKeyboard: false, mathliveOptions: {}} | See [Options Prop](#options-prop) |


### Options Prop

All options are optional:

| Name            | Type    | Default | Description                                                                                         |
|-----------------|---------|---------|-----------------------------------------------------------------------------------------------------|
| bubbleMenu      | Boolean | true    | Whether to show Bubble Menu or not                                                                  |
| floatingMenu    | Boolean | true    | Whether to show Floating Menu or not                                                                |
| poem            | Boolean | false   | Whether to show Poem Button in toolbar or not (This feature is designed for Arabic based languages) |
| persianKeyboard | Boolean | false   | Adding Persian keyboard to Mathlive                                                                 |
| mathliveOptions | Object  | {}      | This Object is passed directly to Mathlive instance                                                 |

## Develop and build

    npm install
    npm run build

## Contributors

[kerasus](https://github.com/kerasus/),
[neokazemi](https://github.com/neokazemi/)


## License

MIT
editable polyline plugin extension for vue2-leaflet package
