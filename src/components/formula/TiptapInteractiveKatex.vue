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
  import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'
  import mixinMarkdownAndKatex from '../../mixin/MarkdownAndKatex'
  import 'mathlive/dist/mathlive-fonts.css'
  import 'mathlive/dist/mathlive-static.css'
  import '@mdi/font/css/materialdesignicons.css'
  import MathLive from 'mathlive'

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
          katex: '$x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$'
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
                                insert: "$$\\leftrightharpoons$$",
                                label: "<i aria-hidden=\"true\" class=\"v-icon mdi mdi-swap-horizontal theme--dark\"></i>"
                            },
                            {
                                class: "keycap tex",
                                insert: "$$\\gets$$",
                                label: "<i aria-hidden=\"true\" class=\"v-icon mdi mdi-arrow-left theme--dark\"></i>"
                            },
                            {
                                class: "keycap tex",
                                insert: "$$\\to$$",
                                label: "<i aria-hidden=\"true\" class=\"v-icon mdi mdi-arrow-right theme--dark\"></i>"
                            },
                            { class: "separator w5" },
                            { label: "17", key: "17", latex: '$$17$$', insert: '$$17$$' },
                            // Will display the label using the system font. To display
                            // with the TeX font, use:
                            // { class: "tex", label: "7", key: "7" },
                            // or
                            // { latex: "7"},
                            { label: "8", key: "8" },
                            { label: "9", key: "9" },
                            { latex: "\\div" },
                            { class: "separator w5" },
                            {
                                class: "tex small",
                                label: "<span><i>x</i>&thinsp;²</span>",
                                insert: "$$#@^{2}$$"
                            },
                            {
                                class: "tex small",
                                label: "<span><i>x</i><sup>&thinsp;<i>n</i></sup></span>",
                                insert: "$$#@^{}$$"
                            },
                            {
                                class: "small",
                                latex: "\\sqrt{#0}",
                                insert: "$$\\sqrt{#0}$$",
                            }
                        ],
                        [
                            {
                                class: "keycap tex",
                                insert: "$$\\cap$$",
                                label: "<i data-v-11cdb290=\"\" aria-hidden=\"true\" class=\"v-icon notranslate mdi mdi-swap-horizontal theme--dark\"></i>"
                            },
                            {
                                class: "keycap tex",
                                insert: "$$\\leftrightharpoons$$",
                                label: "<i data-v-11cdb290=\"\" aria-hidden=\"true\" class=\"v-icon notranslate mdi mdi-swap-horizontal theme--dark\"></i>"
                            },
                            { class: "separator w5" },
                            { label: "4", latex:"4" },
                            { label: "5", key: "5" },
                            { label: "6", key: "6" },
                            { latex: "\\times" },
                            { class: "separator w5" },
                            { class: "small", latex: "\\frac{#0}{#0}" },
                            { class: "separator" },
                            { class: "separator" }
                        ],
                        [
                            { class: "tex", label: "<i>c</i>" },
                            { class: "tex", label: "<i>z</i>" },
                            { class: "separator w5" },
                            { label: "1", key: "1" },
                            { label: "2", key: "2" },
                            { label: "3", key: "3" },
                            { latex: "-" },
                            { class: "separator w5" },
                            { class: "separator" },
                            { class: "separator" },
                            { class: "separator" }
                        ],
                        [
                            { latex: "(" },
                            { latex: ")" },

                            { class: "separator w5" },
                            { label: "0", key: "0" },
                            { latex: "." },
                            { latex: "\\pi" },
                            { latex: "+" },
                            { class: "separator w5" },
                            {
                                class: "action",
                                label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                                command: ["performWithFeedback", "moveToPreviousChar"]
                            },
                            {
                                class: "action",
                                label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                                command: ["performWithFeedback", "moveToNextChar"]
                            },
                            {
                                class: "action font-glyph bottom right",
                                label: "&#x232b;",
                                command: ["performWithFeedback", "deleteBackward"]
                            }
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

                            { class: "separator w5" },

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

                            { class: "separator w5" },

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

                            { class: "separator w5" },

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

                            { class: "separator w5" },

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

                            { class: "separator w5" },

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

                            { class: "separator w5" },

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
        convertMarkdown () {
            return this.markdown.render('$' + this.node.attrs.katex + '$')
        }
    },
      created () {
        this.katex = this.node.attrs.katex
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
    .converted p {
        margin-bottom: 0 !important;
    }
</style>
