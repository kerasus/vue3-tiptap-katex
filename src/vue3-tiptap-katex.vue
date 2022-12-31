<template>
  <div class="vue-tiptap-katex">
    <div class="edit-table-modal">
      <edit-table-modal
          :show-modal="showDialog"
          @update:showDialog="setShowDialog"
          @cellBordersUpdated="updateTableStyle"
      />
    </div>
    <div class="tiptap-container">
      <div
          v-if="editor"
          class="tiptap-header"
      >
        <toolbar
            v-if="editorOptions"
            ref="toolbar"
            :editor="editor"
            :options="editorOptions"
            @show-edit-table-modal="showDialog = !showDialog"
        />
      </div>
      <div
          v-if="editor"
          class="editor-content"
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
import toolbar from 'vue-tiptap-katex-core/components/toolbar/toolbar.vue'
import Focus from '@tiptap/extension-focus'
import SlotBubbleMenu from 'vue-tiptap-katex-core/components/SlotBubbleMenu.vue'
import SlotFloatingMenu from 'vue-tiptap-katex-core/components/SlotFloatingMenu.vue'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from 'vue-tiptap-katex-core/extension/table'
import TextAlign from '@tiptap/extension-text-align'
import TextDirection from 'tiptap-text-direction-extension'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Shortkeys from 'vue-tiptap-katex-core/extension/Shortkeys/TiptapShortkeys'
import { DOMParser } from 'prosemirror-model'
// import Focus from '@tiptap/extension-focus'
import ThinSpace from 'vue-tiptap-katex-core/extension/ThinSpace/ThinSpace'
// import Paper from './Drawing/Paper.js'

import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/vue-3'

import mixinConvertToTiptap from 'vue-tiptap-katex-core/mixins/convertToTiptap'
import mesra from './components/poem/mesra'
import TiptapInteractiveReading from './components/reading/extension'
import TiptapInteractivePoem from './components/poem/bait'
import TiptapInteractiveImageUploadInline from './components/ImageUpload/extensionInline'
import TiptapInteractiveKatexInline from './components/formula/entensionInline'
import EditTableModal from './components/EditTableModal.vue'
// import {EditorView} from "prosemirror-view";
// import {EditorState} from "prosemirror-state";
// import {posToDOMRect} from "@tiptap/core";

export default {
  name: 'VueTiptapKatex',
  mixins: [mixinConvertToTiptap],
  components: {
    EditTableModal,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    toolbar,
    SlotBubbleMenu,
    SlotFloatingMenu,
  },
  props: {
    uploadServer: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  watch: {
    modelValue(newContent) {
      if (this.newModelValue === newContent) {
        return
      }
      this.setContent(newContent)
    },
  },
  data() {
    return {
      editor: null,
      showDialog: false,
      newModelValue: null,
    }
  },
  computed: {
    editorOptions() {
      const options = {
        bubbleMenu: true,
        floatingMenu: true,
        poem: false,
        reading: false,
        persianKeyboard: false,
        mathliveOptions: {},
        onResizeEnd: null,
      }
      Object.assign(options, this.options)
      return options
    },
  },
  created() {
    this.newModelValue = this.convertToTiptap(this.modelValue)
    this.$emit('update:modelValue', this.convertToTiptap(this.modelValue))
  },
  mounted() {
    const vueTiptapKatexInstance = this
    this.editor = new Editor({
      content: this.modelValue,
      parseOptions: {
        preserveWhitespace: true,
      },
      extensions: [
        Focus.configure({
          className: 'has-focus',
          mode: 'all',
        }),
        StarterKit.configure({
          paragraph: {
            HTMLAttributes: { dir: 'auto' },
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          defaultAlignment: '',
        }),
        Color.configure({
          types: ['textStyle'],
        }),
        TextStyle,
        Document,
        Text,
        TextDirection,
        Highlight.configure({
          multicolor: true,
        }),
        Underline,
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'tiptap-table',
            style: 'border-collapse: collapse !important',
          },
        }),
        TableRow.extend({
          content: 'tableCell*',
        }),
        TableCell,
        TiptapInteractiveKatexInline,
        TiptapInteractiveImageUploadInline,
        TiptapInteractivePoem,
        mesra,
        TiptapInteractiveReading,
        Shortkeys,
        ThinSpace,
      ],
      // triggered on every change
      onUpdate({ editor }) {
        vueTiptapKatexInstance.$emit('update:modelValue', editor.getHTML())
        vueTiptapKatexInstance.newModelValue = vueTiptapKatexInstance
          .convertToTiptap(editor.getHTML())
      },
      editorProps: {
        handleKeyDown: (view, event) => {
          if (event.key === 'Enter' && document.querySelector('.mesra.has-focus')) {
            event.preventDefault()
            this.insertPoem(this.editor, '<div class="beit"><div class="mesra"></div><div class="mesra"></div></div>')
            return true
          }
          return false
        },
      },
    })
    this.editor.editorOptions = this.editorOptions
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    updateTableStyle(data) {
      this.editor.commands.setCellAttribute('backgroundColor', data.background.color)
      this.editor.commands.setCellAttribute('borderBottom', this.convertTableStyleToCss(data.bottom))
      this.editor.commands.setCellAttribute('borderLeft', this.convertTableStyleToCss(data.left))
      this.editor.commands.setCellAttribute('borderRight', this.convertTableStyleToCss(data.right))
      this.editor.commands.setCellAttribute('borderTop', this.convertTableStyleToCss(data.top))
    },
    convertTableStyleToCss(data) {
      if (data.cellBorderType === 'none') {
        return 'none'
      }
      return `${data.cellBorderWidth}px ${data.cellBorderType} ${data.color}`
    },
    setShowDialog(val) {
      this.showDialog = val
    },
    getTableDirection() {
      // let selectedPartOfTable = []
      // let row = []
      // const consoleArray = []
      // let table = cell.parentElement.parentElement
      // for (let i = 0; i < table.children.length; i++) {
      //   const tableRow = table.children[i]
      //   const cellsOfRow = tableRow.children
      //   for (let j = 0; j < cellsOfRow.length; j++) {
      //     document.querySelectorAll('.selectedCell').forEach(cell => {
      //       if (cell === cellsOfRow[j]) {
      //         console.log(row, i)
      //         row.push({i, j})
      //         consoleArray.push({tableRow, cellsOfRow})
      //       }
      //     })
      //   }
      //   if (row.length) {
      //     selectedPartOfTable.push(row)
      //     row = []
      //   }
      // }
      // console.log(selectedPartOfTable)
      // console.log(consoleArray)
    },
    elementFromString(value) {
      const element = document.createElement('div')
      element.innerHTML = value.trim()

      return element
    },
    insertPoem({ state, view }, value) {
      const element = this.elementFromString(value)
      const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
      const { tr } = state
      let trx = tr
      trx = trx.insert(state.doc.content.size, slice.content)
      view.dispatch(trx)
    },
    setContent(pureHTML) {
      const string = this.convertToTiptap(pureHTML)
      if (string.length) {
        this.editor.commands.setContent(string)
      }
    },
    getContent() {
      return this.editor.getHTML()
    },
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
@import "css/base-editor-style";
</style>
