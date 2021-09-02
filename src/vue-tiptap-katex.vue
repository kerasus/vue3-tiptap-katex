<template>
  <div :class="{ 'tiptap-plus-container': true }">
    <v-overlay
            v-if="loading"
            absolute
            :value="loading"
            opacity="0.5"
    />
    <v-progress-circular
            v-if="loading"
            :size="50"
            color="#fff"
            indeterminate
    />
    <v-card
            elevation="3"
            class="tiptap-plus"
    >
      <v-card-title
              v-if="editor"
              class="tiptap-header"
      >
        <slot name="toolbar">
          <toolbar
                  :editor="editor"
                  :access-token="accessToken"
                  :upload-url="uploadUrl"
          />
        </slot>
      </v-card-title>
      <v-card-text class="pa-0">
        <bubble-menu
                v-if="editorOptions.bubbleMenu"
                class="bubble-menu"
                :tippy-options="{ duration: 100, showOnCreate: false }"
                :editor="editor"
        >
          <slot-bubble-menu :editor="editor" />
        </bubble-menu>
        <floating-menu
                v-if="editorOptions.floatingMenu"
                class="floating-menu"
                :tippy-options="{ duration: 100 }"
                :editor="editor"
        >
          <slot-floating-menu :editor="editor" />
        </floating-menu>
        <editor-content :editor="editor" />
      </v-card-text>
    </v-card>
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


  import StarterKit from '@tiptap/starter-kit'
  import Table from '@tiptap/extension-table'
  import TableRow from '@tiptap/extension-table-row'
  import TableCell from '@tiptap/extension-table-cell'
  import TableHeader from '@tiptap/extension-table-header'
  import TextAlign from '@tiptap/extension-text-align'
  import Highlight from '@tiptap/extension-highlight'
  import Underline from '@tiptap/extension-underline'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'
  import Document from '@tiptap/extension-document'
  import Heading from '@tiptap/extension-heading'
  import ImageAlign from './extension/ImageAlign/ImageAlign'
  // import Paper from './Drawing/Paper.js'

  import {
    Editor,
    EditorContent,
    BubbleMenu,
    FloatingMenu
  } from '@tiptap/vue-2'

  import {Extension} from '@tiptap/core'
  const AutoDir = Extension.create({
    addGlobalAttributes() {
      return [
        {
          types: [
            'heading',
            'paragraph',
            'bulletList',
            'orderedList',
          ],
          attributes: {
            autoDir: {
              renderHTML: () => ({
                dir: 'auto',
              }),
              parseHTML: element => ({
                autoDir: element.dir.autoDir || 'auto',
              }),
            },
          },
        },
      ]
    },
  })

  const HalfSpace = Extension.create({
    addKeyboardShortcuts() {
      return {
        // ↓ your new keyboard shortcut
        // eslint-disable-next-line vue/no-parsing-error
        'Mod-Shift-Space': () => this.editor.chain().focus().insertContent('').run(),
      }
    },
  })


  // import {EditorView} from "prosemirror-view";
  // import {EditorState} from "prosemirror-state";
  // import {posToDOMRect} from "@tiptap/core";

  export default {
    name: 'VueTiptapKatex',
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
          floatingMenu: true
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
            types: ['heading', 'paragraph', 'TiptapInteractiveImageUpload'],
            defaultAlignment: ''
          }),
          Highlight,
          Underline,
          Paragraph,
          Heading,
          Document,
          Text,
          // Document.extend({
          //   content: 'paper',
          // }),
          // Text,
          // Paper,
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
          AutoDir,
          ImageAlign,
          HalfSpace
        ],
        // triggered on every change
        onUpdate() {
          // that.$emit('input', that.convertToPureHTML(this.getHTML()))
          // that.$emit('update', this.getHTML())
          // console.log('html', this.getHTML())
          // const json =
          // send the content to an API here
        },
      })

      // this.editor.on('focus', this.focusHandler)
      // this.editor.on('blur', this.blurHandler)
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods: {
      setContent(pureHTML) {
        let string = this.convertToTiptap(pureHTML)
        this.editor.commands.setContent(string)
      },
      getContent() {
        return this.convertToPureHTML(this.editor.getHTML())
      },
      convertToPureHTML(string) { //call this function when you want to convert tiptap output to pure html
        string = this.convertInlineInteractiveImagesToHTML(string)
        string = this.convertInteractiveImagesToHTML(string)
        string = this.convertInteractiveIKatexToHTML(string)
        return string
      },
      convertInteractiveImagesToHTML(string) { //this function converts interactiveImage from tiptap to html image
        var wrapper = document.createElement('div')
        wrapper.innerHTML = string
        let images = wrapper.querySelectorAll('tiptap-interactive-image-upload')
        images.forEach(item => {
          let interactiveImage = item.attributes[0].nodeValue
          if (interactiveImage) {
            //create img tag and set its attrs
            interactiveImage =
                    '<img src="' + item.attributes['url'].nodeValue + '" width="' + item.attributes['width'].nodeValue + '" height="' + item.attributes['height'].nodeValue + '" />'
            //create img parent and set the display settings and justify the image
            var imageWrapper = document.createElement('div')
            imageWrapper.innerHTML = interactiveImage
            imageWrapper.style.display = 'flex'
            if (item.attributes['justify'].nodeValue === 'right') {
              imageWrapper.style.justifyContent = 'flex-start'
            } else if (item.attributes['justify'].nodeValue === 'center') {
              imageWrapper.style.justifyContent = 'center'
            } else if (item.attributes['justify'].nodeValue === 'left') {
              imageWrapper.style.justifyContent = 'flex-end'
            }
            item.replaceWith(imageWrapper)
          }
        })
        return wrapper.innerHTML
      },
      convertInlineInteractiveImagesToHTML(string) { //this function converts interactiveImage from tiptap to html image
        var wrapper = document.createElement('div')
        wrapper.innerHTML = string
        let images = wrapper.querySelectorAll('tiptap-interactive-image-upload-inline')
        images.forEach(item => {
          let interactiveImage = item.attributes[0].nodeValue
          if (interactiveImage) {
            //create img tag and set its attrs
            interactiveImage =
                    '<img src="' + item.attributes['url'].nodeValue + '" width="' + item.attributes['width'].nodeValue + '" height="' + item.attributes['height'].nodeValue + '" style="margin-bottom: ' + item.attributes['vertical'].nodeValue + 'px;" />'
            //create img parent and set the display settings and justify the image
            var imageWrapper = document.createElement('span')
            imageWrapper.style.display = 'inline-block'
            imageWrapper.style.height = item.attributes['height'].nodeValue + 'px'
            imageWrapper.innerHTML = interactiveImage
            item.replaceWith(imageWrapper)
          }
        })
        return wrapper.innerHTML
      },
      convertInteractiveIKatexToHTML(string) { //this function converts interactiveKatex from tiptap to html image
        var wrapper = document.createElement('div')
        wrapper.innerHTML = string
        let images = wrapper.querySelectorAll('tiptap-interactive-katex-inline')
        images.forEach(item => {
          let interactiveKatex = item.attributes[0].nodeValue
          if (interactiveKatex) {
            interactiveKatex = '$' + item.attributes['katex'].nodeValue + '$'
            var katexWrapper = document.createElement('div')
            katexWrapper.setAttribute('katex', true)
            katexWrapper.innerHTML = interactiveKatex
            item.replaceWith(katexWrapper.innerHTML)
          }
        })
        return wrapper.innerHTML
      },

      convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
        string = this.convertHTMLImageToInlineInteractive(string)
        string = this.convertHTMLImageToInteractive(string)
        string = this.convertHTMLKatexToInteractive(string)
        return string
      },
      convertHTMLImageToInteractive(string) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = string
        let imagesParent = wrapper.querySelectorAll('img')
        imagesParent.forEach(item => {
          let imageHTML = item.attributes[0].nodeValue
          if (imageHTML) {
            let justify = 'center'
            if (item.parentElement.style.display === 'flex') {
              if (item.parentElement.style.justifyContent === 'flex-start') {
                justify = 'right'
              } else if (item.parentElement.style.justifyContent === 'center') {
                justify = 'center'
              } else if (item.parentElement.style.justifyContent === 'flex-end') {
                justify = 'left'
              }
            }
            imageHTML =
                    '<tiptap-interactive-image-upload-inline' +
                    ' url="' + item.attributes['src'].nodeValue + '" ' +
                    'width="' + item.attributes['width'].nodeValue + '" ' +
                    'height="' + item.attributes['height'].nodeValue + '" ' +
                    'justify="' + justify + '"' +
                    '></tiptap-interactive-image-upload-inline>'
            var imageWrapper = document.createElement('div')
            imageWrapper.innerHTML = imageHTML
            if (item.parentElement.style.display === 'flex') {
              item.parentElement.replaceWith(imageWrapper)
            } else {
              item.replaceWith(imageWrapper)
            }
          }
        })
        return wrapper.innerHTML
      },
      convertHTMLImageToInlineInteractive(string) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = string
        let imagesParent = wrapper.querySelectorAll('span img')
        imagesParent.forEach(item => {
          let imageHTML = item.attributes[0].nodeValue
          if (imageHTML) {
            let marginBottom = 0
            if (item.style.marginBottom) {
              marginBottom = item.style.marginBottom.slice(0, -2)
            }
            imageHTML =
                    '<tiptap-interactive-image-upload-inline' +
                    ' url="' + item.attributes['src'].nodeValue + '" ' +
                    'width="' + item.attributes['width'].nodeValue + '" ' +
                    'height="' + item.attributes['height'].nodeValue + '" ' +
                    'vertical="' + marginBottom + '" ' +
                    'justify="center"' +
                    '></tiptap-interactive-image-upload-inline>'
            var imageWrapper = document.createElement('span')
            imageWrapper.innerHTML = imageHTML
            item.parentElement.replaceWith(imageWrapper)
          }
        })
        return wrapper.innerHTML
      },
      convertHTMLKatexToInteractive(string) {
        // var wrapper = document.createElement('div')
        // wrapper.innerHTML = string
        // let katexes = wrapper.querySelectorAll('div[katex="true"]')
        // katexes.forEach(item => {
        //   let katexHTML = '<tiptap-interactive-katex katex="' + item.innerHTML.slice(1, -1) + '"></tiptap-interactive-katex>'
        //
        //   var doc = new DOMParser().parseFromString(katexHTML, "text/xml");
        //   item.replaceWith(doc.firstChild)
        // })

        let regex = /(\$((?! ).){1}((?!\$).)*((?! ).){1}\$)/gi;
        string = string.replace(regex, (match) => {

          let finalMatch
          if (match.includes('$$')) {
            finalMatch = match.slice(2, -2)
          } else {
            finalMatch = match.slice(1, -1)
          }
          return '<tiptap-interactive-katex-inline katex="' + finalMatch + '"></tiptap-interactive-katex-inline>'
        })
        return string

      },

      // focusHandler() {
      //   console.log('focusHandler -> this.editor.view', this.editor.view)
      //   // we use `setTimeout` to make sure `selection` is already updated
      //   setTimeout(() => this.update(this.editor.view))
      // },
      // blurHandler(data) {
      //   console.log('blurHandler -> data', data)
      //   // if (this.preventHide) {
      //   //   this.preventHide = false
      //   //
      //   //   return
      //   // }
      //   //
      //   // if (
      //   //         event?.relatedTarget
      //   //         && this.element.parentNode?.contains(event.relatedTarget as Node)
      //   // ) {
      //   //   return
      //   // }
      //   //
      //   // this.hide()
      // },
      // update(view, oldState) {
      //   const {state, composing} = view
      //   const {doc, selection} = state
      //   const isSame = oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection)
      //   if (composing || isSame)
      //   {
      //     return
      //   }
      //   const {empty, $anchor, ranges} = selection
      //   // support for CellSelections
      //   const from = Math.min(...ranges.map(range => range.$from.pos))
      //   const to = Math.max(...ranges.map(range => range.$to.pos))
      //
      //   console.log('report : ', {from, to, empty, $anchor, ranges})
      //   console.log('report222 : ', posToDOMRect(view, from, to))
      //   // Sometime check for `empty` is not enough.
      //   // Doubleclick an empty paragraph returns a node size of 2.
      //   // So we check also for an empty text size.
      //   // if (empty || !$anchor.parent.textContent)
      //   // {
      //   //   this.hide()
      //   //   return
      //   // }
      //   // this.tippy.setProps({
      //   //   getReferenceClientRect: () => posToDOMRect(view, from, to),
      //   // })
      //   // this.show()
      // }
    },
  }
</script>

<style>
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
