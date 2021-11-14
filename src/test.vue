<template>
  <div>
    <vue-tiptap-katex
      ref="tiptap"
      :options="{ poem: true, reading: true, bubbleMenu: false, floatingMenu: false }"
    />
    <div
      class="tiptap-click-btn btn-16"
      @click="getContent"
    >
      get content
    </div>
    <div
      ref="printdiv"
      v-html="content"
    />
  </div>
</template>

<script>
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'
import VueTiptapKatex from '@/vue3-tiptap-katex';
export default {
  name: 'Test',
  components: {VueTiptapKatex},
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      this.content = this.$refs.tiptap.getContent()
      this.$nextTick(() => {
        renderMathInElement(this.$refs.printdiv, {
          throwOnError: false,
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false}
          ]
        })
      });
    }
  }
}
</script>

<style lang="scss">
  .beit {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  .beit .mesra {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    white-space: nowrap;
  }

  @media only screen and (max-width: 500px) {
    .beit {
      flex-direction: column;
    }
    .beit .mesra {
      white-space: normal;
      flex-basis: auto;
    }
  }
  .tiptap-click-btn{
    //width: 130px;
    height: 20px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    //display: inline-block;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
    width: 97.5%;
    text-align: center;
  }
  .btn-16 {
    border: none;
    color: #000;
  }
  .btn-16:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    box-shadow:
        -7px -7px 20px 0px #fff9,
        -4px -4px 5px 0px #fff9,
        7px 7px 20px 0px #0002,
        4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  .btn-16:hover {
    color: #000;
  }
  .btn-16:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  .btn-16:active {
    top: 2px;
  }
</style>
