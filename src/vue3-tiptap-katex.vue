<template>
  <div :class="{ 'tiptap-plus-container': true }">
    <div class="tiptap-plus">
      <div
        v-if="editor"
        class="tiptap-header"
      >
        <toolbar
          v-if="editorOptions"
          :editor="editor"
          :options="editorOptions"
        />
      </div>
      <div
        v-if="editor"
        class="pa-0"
      >
        <bubble-menu
          v-if="editorOptions && editorOptions.bubbleMenu"
          class="bubble-menu"
          :tippy-options="{ duration: 100, showOnCreate: false }"
          :editor="editor"
        >
          <slot-bubble-menu :editor="editor" />
        </bubble-menu>
        <floating-menu
          v-if="editorOptions && editorOptions.floatingMenu"
          class="floating-menu"
          :tippy-options="{ duration: 100 }"
          :editor="editor"
        >
          <slot-floating-menu :editor="editor" />
        </floating-menu>
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
  import toolbar from 'vue-tiptap-katex-core/components/toolbar/toolbar'
  import Focus from '@tiptap/extension-focus'
  import SlotBubbleMenu from 'vue-tiptap-katex-core/components/SlotBubbleMenu'
  import SlotFloatingMenu from 'vue-tiptap-katex-core/components/SlotFloatingMenu'
  import TiptapInteractiveKatex from './components/formula/extention'
  import TiptapInteractiveKatexInline from './components/formula/entensionInline'
  import TiptapInteractiveImageUpload from './components/ImageUpload/extension';
  import TiptapInteractiveImageUploadInline from './components/ImageUpload/extensionInline';
  import TiptapInteractivePoem from './components/poem/extension';
  import TiptapInteractiveReading from './components/reading/extension';
  import mesra from './components/poem/baitExtension'
  import StarterKit from '@tiptap/starter-kit'
  import Table from '@tiptap/extension-table'
  import TableRow from '@tiptap/extension-table-row'
  import TableCell from '@tiptap/extension-table-cell'
  import TableHeader from '@tiptap/extension-table-header'
  import TextAlign from '@tiptap/extension-text-align'
  import TextDirection from 'tiptap-text-direction-extension';
  import Highlight from '@tiptap/extension-highlight'
  import Underline from '@tiptap/extension-underline'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'
  import Document from '@tiptap/extension-document'
  import Heading from '@tiptap/extension-heading'
  import ImageAlign from 'vue-tiptap-katex-core/extension/ImageAlign/ImageAlign'
  import Shortkeys from 'vue-tiptap-katex-core/extension/Shortkeys/TiptapShortkeys';
  import {DOMParser} from 'prosemirror-model';
  // import Focus from '@tiptap/extension-focus'
  import ThinSpace from 'vue-tiptap-katex-core/extension/ThinSpace/ThinSpace';
  // import Paper from './Drawing/Paper.js'

  import {
    Editor,
    EditorContent,
    BubbleMenu,
    FloatingMenu
  } from '@tiptap/vue-3'

  import mixinConvertToHTML from 'vue-tiptap-katex-core/mixins/convertToHTML';
  import mixinConvertToTiptap from 'vue-tiptap-katex-core/mixins/convertToTiptap';
  // import {EditorView} from "prosemirror-view";
  // import {EditorState} from "prosemirror-state";
  // import {posToDOMRect} from "@tiptap/core";

  export default {
    name: 'VueTiptapKatex',
    mixins: [mixinConvertToHTML, mixinConvertToTiptap],
    components: {
      EditorContent,
      BubbleMenu,
      FloatingMenu,
      toolbar,
      SlotBubbleMenu,
      SlotFloatingMenu
    },
    props: {
      uploadServer: {
        type: Object,
        default: () => {}
      },
      loading: {
        type: Boolean,
        required: false,
        default: false
      },
      options: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        editor: null,
      }
    },
    computed: {
      editorOptions () {
        const options = {
          bubbleMenu: true,
          floatingMenu: true,
          poem: false,
          reading: false,
          persianKeyboard: false,
          mathliveOptions: {},
          onResizeEnd: null
        }
        Object.assign(options, this.options)
        return options
      }
    },
    mounted() {
      this.editor = new Editor({
        content: this.value,
        parseOptions: {
          preserveWhitespace: true
        },
        extensions: [
          Focus.configure({
            className: 'has-focus',
            mode: 'all',
          }),
          StarterKit,
          TextAlign.configure({
            types: ['heading', 'paragraph', 'TiptapInteractiveImageUpload', 'TiptapInteractiveReading'],
            defaultAlignment: ''
          }),
          TextDirection,
          Highlight,
          Underline,
          Paragraph.configure({
            HTMLAttributes: { dir: 'auto' },
          }),
          Heading,
          Document,
          Text,
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          TableCell,
          TiptapInteractiveKatex,
          TiptapInteractiveKatexInline,
          TiptapInteractiveImageUpload,
          TiptapInteractiveImageUploadInline,
          TiptapInteractivePoem,
          mesra,
          TiptapInteractiveReading,
          ImageAlign,
          Shortkeys,
          // Focus.configure({
          //   className: 'has-focus',
          //   mode: 'all',
          // }),
          ThinSpace
        ],
        // triggered on every change
        onUpdate() {
        },
        editorProps: {
          handleKeyDown: (view, event) => {
            if (event.key === 'Enter' && document.querySelector('.mesra.has-focus')) {
              console.log(document.querySelector('.mesra.has-focus'))
              event.preventDefault()
              this.insertPoem(this.editor, '<tiptap-interactive-poem><mesra></mesra><mesra></mesra></tiptap-interactive-poem>')
              return true
            }
            return false
          }
        }
      })
      this.editor.editorOptions = this.editorOptions
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods: {
      elementFromString(value) {
        const element = document.createElement('div')
        element.innerHTML = value.trim()

        return element
      },
      insertPoem({ state, view }, value) {
        const element = this.elementFromString(value)
        const slice = DOMParser.fromSchema(state.schema).parseSlice(element)

        // let reachedEnd = false
        // let first = 0, last = 26
        // let findIndex = -1
        // console.log('text: ', state.doc.textBetween(0, state.doc.content.size))
        // while (!reachedEnd) {
        //   try {
        //     const text = state.doc.textBetween(first, last)
        //     if (text === '</tiptap-interactive-poem>') {
        //       reachedEnd = true
        //       findIndex = first
        //     }
        //     first++
        //     last++
        //   } catch {
        //     console.log('poem not found')
        //     break;
        //   }
        // }

        const { tr } = state;
        let trx = tr;

        // trx = trx.insertText('',state.doc.content.size,state.doc.content.size + 1)

        trx = trx.insert(state.doc.content.size, slice.content)
        view.dispatch(trx)
      },
      setContent(pureHTML) {
        let string = this.convertToTiptap(pureHTML)
        if (string.length) {
          this.editor.commands.setContent(string)
        }
      },
      getContent() {
        return this.convertToPureHTML(this.editor.getHTML())
      },
    },
  }
</script>

<style>
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

  .ProseMirror {
    outline: none;
    padding: 20px;
  }

  .tiptap-plus-container .v-card__title {
    border-bottom: solid 1px #dedede;
  }

  .tiptap-plus-container {
    width: 100%;
    margin: 0;
    border-radius: 10px;
    position: relative;
    background: white;
  }

  .tiptap-plus-container .v-progress-circular {
    position: absolute;
    z-index: 10;
    left: calc(50% - 25px);
    top: calc(50% - 25px);
  }

  .tiptap-plus .tiptap-header {
    background-color: #e9ecf4;
    padding: 8px;
  }
</style>

<style lang="scss">
  /* Basic editor styles */
  .ProseMirror {
    /*white-space: normal !important;*/

    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0D0D0D;
      color: #FFF;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0D0D0D, 0.1);
      margin: 2rem 0;
    }
  }

  /* Table-specific styling */
  .ProseMirror {
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }
    }
  }

  .tableWrapper {
    overflow-x: auto;

    table {
      float: left;
    }
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
</style>
