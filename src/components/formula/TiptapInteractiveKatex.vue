<template>
    <node-view-wrapper class="vue-component">
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
