<template>
  <div>
    <vue-tiptap-katex ref="tiptap"
                      v-model="content"
                      :options="{
                        poem: true,
                        reading: true,
                        bubbleMenu: false,
                        floatingMenu: false,
                        onResizeEnd: onResizeEnd,
                        uploadServer: {
                          url: '/api/v1/question/upload/620e09bd2079aa7c1b00cf8d',
                          headers: {
                            Authorization: authorizationCode
                          }
                        },
                        persianKeyboard: true,
                        // mathliveOptions: {
                        //   locale: 'fa',
                        // }
                      }" />
    --------------------------------------------------------------------
    <p>v-html:</p>
    <div ref="printdiv"
         v-html="content" />
    --------------------------------------------------------------------
    <p>computedKatex:</p>
    <div v-html="computedKatex" />
    --------------------------------------------------------------------
    <p>html:</p>
    {{content}}
  </div>
</template>

<script>
import 'katex/dist/katex.min.css'
import * as VueTiptapKatexAssist from 'vue-tiptap-katex-core/assist.js'
import VueTiptapKatex from './vue3-tiptap-katex.vue'

export default {
  name: 'TestPage',
  components: { VueTiptapKatex },
  data() {
    return {
      content: 'test',
      authorizationCode: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs'
    }
  },
  mounted() {
    /* eslint-disable */
    this.content = '<p dir="auto" style="text-align: left"><span data-katex="true">$\\begin{array}{l}  {{g}^{-1}}(x)=3x-2\\Rightarrow y=3x-2 \\\\  \\Rightarrow x=\\frac{y+2}{3}\\Rightarrow g(x)=\\frac{x+2}{3} \\\\  (fog)(x)=f(g(x))=f(\\frac{x+2}{3}) \\\\  =9{{(\\frac{x+2}{3})}^{2}}-24(\\frac{x+2}{3})-65 \\\\ \\end{array}$</span></p><p dir="auto" style="text-align: left"><span data-katex="true">$\\begin{array}{l} \\\\ \\Rightarrow(fog)(x)={{x}^2}-4x-77 \\\\  \\\\ (fog)(x)=(x-11)(x+7)\\Rightarrow(fog)(x)&lt;0 \\\\  \\\\ \\Rightarrow(x-11)\\,(x+7)&lt;0\\,\\,\\xrightarrow{تعیین\\:علامت}\\,-7&lt;x&lt;11 \\\\  \\\\ \\Rightarrow(a\\,,\\,b)=(-7\\,,\\,11)\\Rightarrow\\max=(b-a)=18\\end{array}$</span></p>'
  },
  methods: {
    onResizeEnd(url, width, height) {
      return `${url.split('?w=')[0]}?w=${width}&h=${height}`
    },
  },
  computed: {
    computedKatex() {
      let string = this.content
      if (string === null || typeof string === 'undefined') {
        return ''
      }
      string = VueTiptapKatexAssist.renderKatexToHTML(string)
      return string
    },
  }
}
</script>

<style lang="scss">
//@import "vue-tiptap-katex-core/css/base.scss";
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