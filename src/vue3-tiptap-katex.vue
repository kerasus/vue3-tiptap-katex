<template>
  <div class="vue-tiptap-katex">
    <div class="edit-table-modal">
      <edit-table-modal :show-modal="showDialog"
                        @update:showDialog="setShowDialog"
                        @cellBordersUpdated="updateTableStyle" />
    </div>
    <div class="tiptap-container">
      <div v-if="editor"
           class="tiptap-header">
        <toolbar v-if="editorOptions"
                 ref="toolbar"
                 :editor="editor"
                 :options="editorOptions"
                 @show-edit-table-modal="showDialog = !showDialog" />
      </div>
      <div v-if="editor"
           class="editor-content">
        <bubble-menu v-if="editorOptions && editorOptions.bubbleMenu"
                     class="bubble-menu"
                     :tippy-options="{ duration: 100, showOnCreate: false }"
                     :editor="editor">
          <slot-bubble-menu :editor="editor" />
        </bubble-menu>
        <floating-menu v-if="editorOptions && editorOptions.floatingMenu"
                       class="floating-menu"
                       :tippy-options="{ duration: 100 }"
                       :editor="editor">
          <slot-floating-menu :editor="editor" />
        </floating-menu>
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from 'vue-tiptap-katex-core/components/toolbar/toolbar.vue'
import SlotBubbleMenu from 'vue-tiptap-katex-core/components/SlotBubbleMenu.vue'
import SlotFloatingMenu from 'vue-tiptap-katex-core/components/SlotFloatingMenu.vue'
import Focus from '@tiptap/extension-focus'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import * as VueTiptapKatexAssist from 'vue-tiptap-katex-core/assist.js'

import {
  ExtensionTiptapShortkeys,
  ExtensionThinSpace,
  ExtensionTextDirection,
  ExtensionTableCell
} from 'vue-tiptap-katex-core'
import { DOMParser } from 'prosemirror-model'
// import Focus from '@tiptap/extension-focus'
// import Paper from './Drawing/Paper.js'

import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu
} from '@tiptap/vue-3'

import mesra from './components/poem/mesra.mjs'
import TiptapInteractiveReading from './components/reading/extension.mjs'
import TiptapInteractivePoem from './components/poem/bait.mjs'
import TiptapInteractiveImageUploadInline from './components/ImageUpload/extensionImageInline.mjs'
import TiptapInteractiveKatexInline from './components/formula/extensionFormulaInline.mjs'
import EditTableModal from './components/EditTableModal.vue'
// import {EditorView} from "prosemirror-view";
// import {EditorState} from "prosemirror-state";
// import {posToDOMRect} from "@tiptap/core";

export default {
  name: 'VueTiptapKatex',
  components: {
    EditTableModal,
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
      default() {
        return {}
      }
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      showDialog: false,
      newModelValue: null,
      isPageMounted: false
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
        onResizeEnd: null
      }
      Object.assign(options, this.options)
      return options
    }
  },
  watch: {
    modelValue(newContent) {
      if (this.newModelValue === newContent) {
        return
      }
      this.setContent(newContent)
    }
  },
  beforeMount () {
    this.newModelValue = VueTiptapKatexAssist.convertToTiptap(this.modelValue)
    this.$emit('update:modelValue', VueTiptapKatexAssist.convertToTiptap(this.modelValue))
  },
  mounted () {
    const vueTiptapKatexInstance = this
    const editorConfig = {
      content: this.modelValue,
      parseOptions: {
        preserveWhitespace: true
      },
      extensions: [
        Focus.configure({
          className: 'has-focus',
          mode: 'all'
        }),
        StarterKit.configure({
          paragraph: {
            HTMLAttributes: { dir: 'auto' }
          }
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          defaultAlignment: ''
        }),
        Color.configure({
          types: ['textStyle']
        }),
        TextStyle,
        Document,
        Text,
        ExtensionTextDirection,
        Highlight.configure({
          multicolor: true
        }),
        Underline,
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'tiptap-table',
            style: 'border-collapse: collapse !important'
          }
        }),
        TableRow.extend({
          content: 'tableCell*'
        }),
        ExtensionTableCell,
        TiptapInteractiveKatexInline,
        TiptapInteractiveImageUploadInline,
        TiptapInteractivePoem,
        mesra,
        TiptapInteractiveReading,
        ExtensionTiptapShortkeys,
        ExtensionThinSpace
      ],
      // triggered on every change
      onUpdate({ editor }) {
        vueTiptapKatexInstance.$emit('update:modelValue', editor.getHTML())
        vueTiptapKatexInstance.newModelValue =
            VueTiptapKatexAssist.convertToTiptap(editor.getHTML())
      },
      editorProps: {
        handleKeyDown: (view, event) => {
          if (event.key === 'Enter' && document.querySelector('.mesra.has-focus')) {
            event.preventDefault()
            this.insertPoem(this.editor, '<div class="beit"><div class="mesra"></div><div class="mesra"></div></div>')
            return true
          }
          return false
        }
      }
    }
    this.editor = new Editor(editorConfig)
    this.editor.editorOptions = this.editorOptions
  },
  beforeUnmount() {
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
      const string = VueTiptapKatexAssist.convertToTiptap(pureHTML)
      if (string.length) {
        this.editor.commands.setContent(string)
      }
    },
    getContent() {
      return this.editor.getHTML()
    }
  }
}
</script>

<style lang="scss">
/* Basic editor styles */
@import "css/base-editor-style";
</style>
