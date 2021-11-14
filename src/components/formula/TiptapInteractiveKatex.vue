<template>
  <node-view-wrapper
    :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
    data-drag-handle
  >
    <div
      v-if="editMode"
      id="mathfield"
      ref="mathfield"
      dir="ltr"
      locale="fa"
      :class="{ 'editable': editMode }"
    >
      {{ katex }}
    </div>
    <div
      v-if="!editMode"
      class="converted"
      dir="ltr"
      @click="editMode = true"
      v-html="computedKatex"
    />
    <div
      v-if="!editMode"
      ref="printdiv"
      icon
      color="blue"
      @click="editMode = true"
    >
      mdi-pencil
    </div>
    <div
      v-if="editMode"
      icon
      color="green"
      @click="toggleEdit"
    >
      mdi-check
    </div>
  </node-view-wrapper>
</template>

<script>
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'

// import katex from 'katex';
// import Vue from 'vue'
// import VueKatex from 'vue-katex'
// import 'katex/dist/katex.min.css'
//
// Vue.use(VueKatex, {
//   globalOptions: {
//     delimiters: [
//       {left: '$$', right: '$$', display: true},
//       {left: '\\[', right: '\\]', display: true},
//       {left: '$', right: '$', display: false},
//       {left: '\\(', right: '\\)', display: false}
//     ]
//   }
// });

// eslint-disable-next-line vue/one-component-per-file

import {NodeViewWrapper, nodeViewProps} from '@tiptap/vue-3'
import 'mathlive/dist/mathlive-fonts.css'
import 'mathlive/dist/mathlive-static.css'
import '@mdi/font/css/materialdesignicons.css'

import MathLive from 'mathlive'

// eslint-disable-next-line vue/one-component-per-file
export default {
  components: {
    NodeViewWrapper,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true,
    },
    editor: {
      default: () => {return {}},
      type: Object
    }
  },
  data: () => {
    return {
      editModal: false,
      latexData: null,
      formula: '',
      editMode: false,
      questMarkdownText: '# Math Rulez! \n  $x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
      katex: '$x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
      icons: {}
    }
  },
  mounted() {
  },
  watch: {
    editMode(newValue) {
      if (!newValue) {
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
        })
        return
      }
      this.$nextTick(() => {
        this.loadMathLive()
      });
    },
    latexData: function (newValue) {
      this.updateAttributes({
        // katex: this.latexData
        katex: newValue
      })
      this.katex = newValue
    }
  },
  computed: {
    computedKatex() {
      return '$' + this.node.attrs.katex + '$'
    }
  },
  created() {
    this.katex = this.node.attrs.katex
  },
  methods: {
    toggleEdit () {
      this.editMode = !this.editMode
      this.editor.chain().focus().run()
    },
    getMathliveValue (mf) {
      return mf.getValue().replaceAll('\\mleft', '\\left').replaceAll('\\mright', '\\right')
    },
    loadMathLive() {
      // if (!this.$refs.mathfield) {
      //   return
      // }
      // this.katex = this.markdown.render(this.katex)
      let that = this
      const mf = MathLive.makeMathField(
          this.$refs.mathfield,
          {
            virtualKeyboardMode: 'manual',
            onContentDidChange: (mf) => {
              that.latexData = that.getMathliveValue(mf)
            },
          });
      const EXTRA_KEYBOARD_LAYER = {
        'others-keyboard-layer': {
          styles: '',
          rows: [
            [
              {
                class: 'keycap tex',
                insert: '$$\\rightarrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\uparrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\downarrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\gets$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\nearrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\nwarrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\searrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\swarrow$$',

              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\Rightarrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\Leftrightarrow$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\Leftarrow$$',

              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\le$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\geq$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\leqslant$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\geqslant$$',

              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\land$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\lor$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\cup$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\cap$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '\\leftrightharpoons$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\simeq$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\leftrightarrow$$',

              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\N$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\R$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\Z$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\Bbb{W}$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\overbrace{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\underbrace{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\overbrace{#@}^{\\text{note}}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\underbrace{#@}_{\\text{note}}$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\odot$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\otimes$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\varnothing$$',

              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\Delta$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\alpha$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\exists$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\Omega$$',

              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\ell$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\cancel{C}$$',

              },
              {
                class: 'keycap tex',
                insert: '$$\\^$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\surd$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\cancel{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\bcancel{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xcancel{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\nparallel$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\parallel$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\bot$$',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\xleftarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xrightarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xrightarrow[under]{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xleftrightarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xtofrom{#@}$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\frac{#@}{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$${#@}/{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\hat{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$${#@}_u^o$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\xLeftarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xRightarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\xLeftrightarrow{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\bar{#@}$$',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\sqrt{#@}$$',
              },
              {
                class: 'keycap tex small w30',
                insert: '$$y=\\begin{cases}y=x^2 & x>0 \\\\ y=x^3 & x<0\\end{cases}$$',
              },
              {class: 'separator w5'},
              {
                class: 'keycap w30',
                insert: '$$\\,$$',
                label: 'half-space',
              },
              {
                class: 'keycap w50',
                insert: '$$\\enspace$$',
                label: 'space',
              },
              {
                class: 'keycap tex',
                insert: '$$\\overgroup{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\undergroup{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\boxed{#@}$$',
              },
              {
                class: 'keycap tex',
                insert: '$$\\equiv$$',
              },
              {
                class: 'keycap tex',
                insert: '$$^{\\prime \\prime}$$',
              },
            ]
          ]
        },
        'matrix-keyboard-layer': {
          styles: '',
          rows: [
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0\\end{bmatrix}$$',
                label: 'M(1,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0\\end{bmatrix}$$',
                label: 'M(1,2)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(1,3)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(1,4)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(1,5)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(1,6)'
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0\\end{vmatrix}$$',
                label: 'D(1,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0\\end{vmatrix}$$',
                label: 'D(1,2)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(1,3)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(1,4)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(1,5)'
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(1,6)'
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 \\\\ 0\\end{bmatrix}$$',
                label: 'M(2,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0\\\\ 0 & 0\\end{bmatrix}$$',
                label: 'M(2,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0\\\\ 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(2,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(2,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(2,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$',
                label: 'M(2,6)',
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 \\\\ 0\\end{vmatrix}$$',
                label: 'D(2,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0\\\\ 0 & 0\\end{vmatrix}$$',
                label: 'D(2,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0\\\\ 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(2,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(2,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(2,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$',
                label: 'D(2,6)',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix}0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$',
                label: 'M(3,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$',
                label: 'M(3,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(3,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(3,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(3,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(3,6)',
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix}0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$',
                label: 'D(3,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$',
                label: 'D(3,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(3,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(3,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(3,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(3,6)',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$',
                label: 'M(4,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$',
                label: 'M(4,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(4,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(4,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(4,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(4,6)',
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$',
                label: 'D(4,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$',
                label: 'D(4,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(4,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(4,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(4,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(4,6)',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$',
                label: 'M(5,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$',
                label: 'M(5,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(5,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(5,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(5,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(5,6)',
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$',
                label: 'D(5,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$',
                label: 'D(5,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(5,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(5,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(5,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(5,6)',
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$',
                label: 'M(6,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$',
                label: 'M(6,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(6,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(6,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(6,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$',
                label: 'M(6,6)',
              },

              {class: 'separator w5'},

              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$',
                label: 'D(6,1)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$',
                label: 'D(6,2)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(6,3)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(6,4)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(6,5)',
              },
              {
                class: 'keycap tex',
                insert: '$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$',
                label: 'D(6,6)',
              },
            ],
          ]
        },
        'extra-keyboard-layer': {
          styles: '',
          rows: [
            [
              {
                class: 'keycap tex',
                insert: '$$\\overgroup{#@}$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\lgroup$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\rgroup$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\%$$'
              },
              {class: 'separator w5'},
              {
                class: 'keycap  w30',
                insert: '$$\\begin{rcases} a &\\text{if } b \\\\ c &\\text{if } d \\end{rcases}$$'
              },
              {
                class: 'keycap  w30',
                insert: '$$\\begin{alignat}{2}10x+ 3y = 2 \\\\3x+13y = 4\\end{alignat}$$'
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$${n \\choose k}$$'
              },
              {
                class: 'keycap tex',
                insert: '$${n\\brace k}$$'
              },
              {
                class: 'keycap tex',
                insert: '$${n\\brack k}$$'
              },
              {class: 'separator w5'},
              {
                class: 'keycap tex',
                insert: '$$\\thicksim$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\cong$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\checkmark$$'
              },
            ],
            [
              {
                class: 'keycap tex',
                insert: '$$\\Biggm$$'
              },
              {
                class: 'keycap tex',
                insert: '$$\\overbrace{#@}^{text}$$'
              }
            ]
          ]
        },
      };
      const EXTRA_KEYBOARD = {
        'others-keyboard': {
          'label': 'Others', // Label displayed in the Virtual Keyboard Switcher
          'tooltip': 'High School Level', // Tooltip when hovering over the label
          'layer': 'others-keyboard-layer'
        },
        'matrix-keyboard': {
          'label': 'Matrix', // Label displayed in the Virtual Keyboard Switcher
          'tooltip': 'Matrix Keyboard', // Tooltip when hovering over the label
          'layer': 'matrix-keyboard-layer'
        },
        'extra-keyboard': {
          'label': 'Extra',
          'tooltip': '',
          'layer': 'extra-keyboard-layer'
        }
      };
      mf.setOptions({
        'customVirtualKeyboardLayers': EXTRA_KEYBOARD_LAYER,
        'customVirtualKeyboards': EXTRA_KEYBOARD,
        'virtualKeyboards': 'numeric functions symbols roman  greek matrix-keyboard others-keyboard extra-keyboard',
        mathModeSpace: '\\:'
      });
      // console.log(mf.getOption())
      // mf.$setConfig(
      //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
      // );
      that.latexData = that.getMathliveValue(mf)
    }
  }
}
</script>

<style lang="scss" scoped>

.katex {
  direction: ltr;
  display: inline-block;

  .katex-html {
    .accent {
      background-color: unset !important;
      border-color: unset !important;
    }
  }
}

.vue-component {
  /*background: #FAF594;*/
  /*border: 1px solid #0D0D0D;*/
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
  white-space: normal;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}

.vue-component.inline {
  display: inline-flex;
}

.label {
  margin-left: 1rem;
  background-color: #0D0D0D;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin-top: 1.5rem;
  padding: 1rem;
}

/*#mathfield, .latexData {*/
/*    padding: 8px;*/
/*    font-size: 20px;*/
/*}*/

#mathfield {
  width: 95%;
}

#mathfield, .latexData {
  font-size: 32px;
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .3);
  box-shadow: 0 0 8px rgba(0, 0, 0, .2)
}
</style>

<style>
.ML__mathlive .ML__base span span span span span span span svg {
  width: 300em !important;
  height: 0.5em !important;
}

.converted p {
  margin-bottom: 0 !important;
}

.ML__keyboard div .rows > ul > .w30 {
  width: 200px;
}
</style>
