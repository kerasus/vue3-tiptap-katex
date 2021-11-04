<template>
  <div :class="{ 'tiptap-plus-container': true }">
    <div
      elevation="3"
      class="tiptap-plus"
    >
      <div
        v-if="editor"
        class="tiptap-header"
      >
        <toolbar
          v-if="editorOptions"
          :editor="editor"
          :access-token="accessToken"
          :upload-url="uploadUrl"
          :options="editorOptions"
        />
      </div>
      <div class="pa-0">
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

  import toolbar from './components/toolbar/toolbar'
  import SlotBubbleMenu from './components/SlotBubbleMenu'
  import SlotFloatingMenu from './components/SlotFloatingMenu'
  import TiptapInteractiveKatex from './components/formula/extention'
  import TiptapInteractiveKatexInline from './components/formula/entensionInline'
  import TiptapInteractiveImageUpload from './components/ImageUpload/extension';
  import TiptapInteractiveImageUploadInline from './components/ImageUpload/extensionInline';
  import TiptapInteractivePoem from './components/poem/extension';
  import TiptapInteractiveReading from './components/reading/extension';
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
  import ImageAlign from './extension/ImageAlign/ImageAlign'
  // import Focus from '@tiptap/extension-focus'
  import ThinSpace from './extension/ThinSpace/ThinSpace';
  // import Paper from './Drawing/Paper.js'

  import {
    Editor,
    EditorContent,
    BubbleMenu,
    FloatingMenu
  } from '@tiptap/vue-3'

  import mixinConvertToHTML from './mixins/convertToHTML';
  import mixinConvertToTiptap from './mixins/convertToTiptap';
  // import Test from './test';
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
      accessToken: {
        type: String,
        default: ''
      },
      uploadUrl: {
        type: String,
        default: ''
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
          reading: false
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
          TiptapInteractiveReading,
          ImageAlign,
          // Focus.configure({
          //   className: 'has-focus',
          //   mode: 'all',
          // }),
          ThinSpace
        ],
        // triggered on every change
        onUpdate() {
        },
      })
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods: {
      setContent(pureHTML) {
        let string = this.convertToTiptap(pureHTML)
        if (string.length) {
          this.editor.commands.setContent(string)
          this.poems.forEach((poem, index) => {
            let poemString = '<ol><li><table class="poem"><tr class="beit">' +
                '<td class="mesra1">' + poem.poem1 + '</td><td class="mesra2">' + poem.poem2 + '</td>' +
                '</tr></table></li></ol>'
            this.insertPoem(this.editor, poemString, index)
          })
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
