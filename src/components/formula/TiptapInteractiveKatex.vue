<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': node.attrs.inline }" data-drag-handle>
    <div id="mathfield" ref="mathfield" dir="ltr" locale="fa" :class="{ 'editable': editMode }" v-show="editMode">
      {{ katex }}
    </div>
    <div class="converted" v-html="convertMarkdown" dir="ltr" v-show="!editMode" @click="editMode = true"/>
    <v-btn
        icon
        @click="editMode = true"
        v-if="!editMode"
        color="blue"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
        icon
        @click="editMode = false"
        v-if="editMode"
        color="green"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>
  </node-view-wrapper>
</template>

<script>
import {NodeViewWrapper, nodeViewProps} from '@tiptap/vue-2'
import mixinMarkdownAndKatex from '../../mixin/MarkdownAndKatex'
import 'mathlive/dist/mathlive-fonts.css'
import 'mathlive/dist/mathlive-static.css'
import '@mdi/font/css/materialdesignicons.css'
import MathLive from 'mathlive'
import md from 'markdown-it'

export default {
  components: {
    NodeViewWrapper,
  },
  mixins: [mixinMarkdownAndKatex],
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
    setTimeout(() => {
      this.katex = this.markdown.render(this.katex)
      let that = this
      const mf = MathLive.makeMathField(
          this.$refs.mathfield,
          {
            virtualKeyboardMode: 'manual',
            onContentDidChange: (mf) => {
              that.latexData = mf.getValue()
            },
          });
      const EXTRA_KEYBOARD_LAYER = {
        "extra-keyboard-layer": {
          styles: "",
          rows: [
            [
              {
                class: "keycap tex",
                insert: "$$\\rightarrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\uparrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\downarrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\gets$$",
                label: this.icons.test
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\le$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\geq$$",

              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\land$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\lor$$",

              },
              {class: "separator w5"},
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\nearrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\nwarrow$$",

              },
              {
                class: "keycap tex",
                insert: "\\leftrightharpoons$$",
                label: this.icons.test
              },
              {class: "separator w5"},
              {class: "separator w5"},
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\leqslant$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\geqslant$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\simeq$$",

              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\cup$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\cap$$",

              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\searrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\swarrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\leftrightarrow$$",

              },
              {class: "separator w5"},
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\N$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\R$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\Z$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\Bbb{W}$$",
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\odot$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\otimes$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\surd$$",

              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\Rightarrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\Leftrightarrow$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\Leftarrow$$",

              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\Delta$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\alpha$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\exists$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\Omega$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\ell$$",

              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\varnothing$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\cancel{C}$$",

              },
              {
                class: "keycap tex",
                insert: "$$\\^$$",

              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\hat{#@}$$",
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\xLeftarrow{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xRightarrow{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xLeftrightarrow{#@}$$",
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\xleftarrow{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xrightarrow{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xleftrightarrow{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xtofrom{#@}$$",
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\frac{#@}{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$${#@}/{#@}$$",
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$${#@}_u^o$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\sqrt{#@}$$",
              },
              {class: "separator w5"},
              {
                class: "keycap tex",
                insert: "$$\\cancel{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\bcancel{#@}$$",
              },
              {
                class: "keycap tex",
                insert: "$$\\xcancel{#@}$$",
              },
            ]
          ]
        },
        "matrix-keyboard-layer": {
          styles: "",
          rows: [
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0\\end{bmatrix}$$",
                label: "M(1,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0\\end{bmatrix}$$",
                label: "M(1,2)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0\\end{bmatrix}$$",
                label: "M(1,3)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(1,4)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(1,5)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(1,6)"
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0\\end{vmatrix}$$",
                label: "D(1,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0\\end{vmatrix}$$",
                label: "D(1,2)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0\\end{vmatrix}$$",
                label: "D(1,3)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(1,4)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(1,5)"
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(1,6)"
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 \\\\ 0\\end{bmatrix}$$",
                label: "M(2,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0\\\\ 0 & 0\\end{bmatrix}$$",
                label: "M(2,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0\\\\ 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(2,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(2,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(2,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 & 0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0 & 0\\end{bmatrix}$$",
                label: "M(2,6)",
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 \\\\ 0\\end{vmatrix}$$",
                label: "D(2,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0\\\\ 0 & 0\\end{vmatrix}$$",
                label: "D(2,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0\\\\ 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(2,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(2,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(2,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 & 0 & 0 & 0 & 0 & 0\\\\ 0 & 0 & 0 & 0 & 0 & 0\\end{vmatrix}$$",
                label: "D(2,6)",
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix}0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$",
                label: "M(3,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$",
                label: "M(3,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(3,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(3,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(3,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(3,6)",
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix}0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$",
                label: "D(3,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$",
                label: "D(3,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(3,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(3,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(3,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(3,6)",
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$",
                label: "M(4,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$",
                label: "M(4,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(4,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(4,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(4,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(4,6)",
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$",
                label: "D(4,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$",
                label: "D(4,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(4,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(4,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(4,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(4,6)",
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$",
                label: "M(5,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$",
                label: "M(5,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(5,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(5,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(5,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(5,6)",
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$",
                label: "D(5,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$",
                label: "D(5,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(5,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(5,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(5,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(5,6)",
              },
            ],
            [
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$$",
                label: "M(6,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$",
                label: "M(6,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(6,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(6,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(6,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{bmatrix}$$",
                label: "M(6,6)",
              },

              {class: "separator w5"},

              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{vmatrix}$$",
                label: "D(6,1)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{vmatrix}$$",
                label: "D(6,2)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(6,3)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(6,4)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(6,5)",
              },
              {
                class: "keycap tex",
                insert: "$$\\begin{vmatrix} 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 & 0 \\end{vmatrix}$$",
                label: "D(6,6)",
              },
            ],
          ]
        }
      };
      const EXTRA_KEYBOARD = {
        "extra-keyboard": {
          "label": "Others", // Label displayed in the Virtual Keyboard Switcher
          "tooltip": "High School Level", // Tooltip when hovering over the label
          "layer": "extra-keyboard-layer"
        },
        "matrix-keyboard": {
          "label": "Matrix", // Label displayed in the Virtual Keyboard Switcher
          "tooltip": "Matrix Keyboard", // Tooltip when hovering over the label
          "layer": "matrix-keyboard-layer"
        }
      };
      mf.setOptions({
        "customVirtualKeyboardLayers": EXTRA_KEYBOARD_LAYER,
        "customVirtualKeyboards": EXTRA_KEYBOARD,
        "virtualKeyboards": "numeric functions symbols roman  greek matrix-keyboard extra-keyboard"
      });
      // mf.$setConfig(
      //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
      // );
      that.latexData = mf.getValue()
    }, 500)
  },
  watch: {
    latexData: function () {
      this.updateAttributes({
        katex: this.latexData
      })
    }
  },
  computed: {
    convertMarkdown() {
      return this.markdown.render('$' + this.node.attrs.katex + '$')
    }
  },
  created() {
    this.katex = this.node.attrs.katex
  },
  methods: {
    setIcons() {
      this.icons.test = md.render('\\to')
    }
  }
}
</script>


<style lang="scss" scoped>

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
</style>
