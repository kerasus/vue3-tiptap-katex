# Vue Tiptap Katex

## Install

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

    <vue-tiptap-katex />

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

## Develop and build

    npm install
    npm run build

## Contributors

[kerasus](https://github.com/kerasus/),
[neokazemi](https://github.com/neokazemi/)


## License

MIT
editable polyline plugin extension for vue2-leaflet package
