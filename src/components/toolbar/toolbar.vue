<template>
  <div
    v-if="editor"
    class="tiptap-toolbar"
  >
    <!--    <mdicon name="react" />-->

    <!--    https://github.com/Akryum/v-tooltip        tooltip package ToDo-->
    <ul>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <span
            class="mdi mdi-format-paragraph toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <span
            class="mdi mdi-format-header-1 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <span
            class="mdi mdi-format-header-2 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <span
            class="mdi mdi-format-header-3 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <span
            class="mdi mdi-format-header-4 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <span
            class="mdi mdi-format-header-5 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          <span
            class="mdi mdi-format-header-6 toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <span
            class="mdi mdi-format-bold toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <span
            class="mdi mdi-format-italic toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <span
            class="mdi mdi-format-underline toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <span
            class="mdi mdi-format-strikethrough toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleHighlight().run()"
        >
          <span
            class="mdi mdi-format-color-highlight toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="justify('right')"
        >
          <span
            class="mdi mdi-format-align-right toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="justify('center')"
        >
          <span
            class="mdi mdi-format-align-center toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="justify('left')"
        >
          <span
            class="mdi mdi-format-align-left toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <span
            class="mdi mdi-format-align-justify toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setTextDirection('rtl').run()"
        >
          <span
            class="mdi mdi-format-textdirection-r-to-l toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setTextDirection('ltr').run()"
        >
          <span
            class="mdi mdi-format-textdirection-l-to-r toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span
            class="mdi mdi-format-list-bulleted toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <span
            class="mdi mdi-format-list-numbered toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          <span
            class="mdi mdi-arrow-expand-down toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <span
            class="mdi mdi-arrow-split-horizontal toolbar-item-icon"
          />
        </div>
      </li>
      <li><div class="vl" /></li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        >
          <span
            class="mdi mdi-table-plus toolbar-item-icon"
          />
        </div>
      </li>
      <!--      <v-tooltip
      v-if="editor.can().mergeCells()"
      top
      ToDo
    >-->
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().mergeCells().run()"
        >
          <span
            class="mdi mdi-sigma  toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
          class="toolbar-item"
          @click="editor.chain().focus().splitCell().run()"
        >
          <span
            class="mdi mdi-image toolbar-item-icon"
          />
        </div>
      </li>
      <!--      <v-tooltip
      v-if="editor.can().addColumnAfter()"
      top
      ToDo
    >-->
      <li><div class="vl" /></li>
      <li>
        <div class="toolbar-item">
          <span
            class="mdi mdi-redo toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="toolbar-item">
          <span
            class="mdi mdi-undo toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="toolbar-item">
          <span
            class="mdi mdi-content-paste toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="toolbar-item">
          <span
            class="mdi mdi-format-columns toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="toolbar-item">
          <span
            class="mdi mdi-eye-off toolbar-item-icon"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    // import DynamicTable from "./dynamicTools/DynamicTable"

    import { DOMParser } from 'prosemirror-model'

    function elementFromString(value) {
      const element = document.createElement('div')
      element.innerHTML = value.trim()

      return element
    }

    function insertHTML({ state, view }, value) {
      const { selection } = state
      const element = elementFromString(value)

      const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
      const transaction = state.tr.insert(selection.anchor, slice.content)

      view.dispatch(transaction)
    }

  export default {
    name: 'Toolbar',
    components: {
      // DynamicTable,
    },
    data () {
      return {
        poemCom: '<p style="color: red;">test</p>'
      }
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
      editor: {
        type: Object,
        default: () => {}
      },
      options: {
        type: Object,
        default: () => {
          return {
            poem: false
          }
        }
      }
    },
    computed: {
      tiptapInteractiveImageUpload () {
        return '<tiptap-interactive-image-upload token="' + this.accessToken + '" upload="' + this.uploadUrl + '"></tiptap-interactive-image-upload>'
      },
      tiptapInteractiveImageUploadInline () {
        return '<tiptap-interactive-image-upload-inline token="' + this.accessToken + '" upload="' + this.uploadUrl + '"></tiptap-interactive-image-upload-inline>'
      }
    },
    methods: {
      insertPoem () {
        insertHTML(this.editor, '<ol><li><table class="poem"><tr class="beit"><td class="mesra1">معشوقه به سامان شد تا باد چنین بادا</td><td class="mesra2">کفرش همه ایمان شد تا باد چنین بادا</td></tr></table></ol></li>')
      },
      justify (value) {
        this.editor.chain().focus().setTextAlign(value).run()
        this.editor.chain().focus().setImageAlign(value).run()
      },
      paste () {
        navigator.clipboard.readText()
          .then(text => {
            let string = this.convertToTiptap(text)
            this.editor.commands.insertContent(string)
          })
          .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
          });
      },
      convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
        string = string.replaceAll('¬', '&#8202;')
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

        string = string.replaceAll('\\[ ', '\\[')
        string = string.replaceAll(' \\]', ' \\]')
        string = string.replaceAll(' $', '$')
        string = string.replaceAll('$ ', '$')

        let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms;
        string = string.replace(regex, (match) => {
          let finalMatch
          if (match.includes('$$')) {
            finalMatch = match.slice(2, -2)
          } else if (match.includes('$')) {
            finalMatch = match.slice(1, -1)
          } else {
            finalMatch = match.slice(2, -2)
          }
          return '<tiptap-interactive-katex-inline katex="' + finalMatch + '"></tiptap-interactive-katex-inline>'
        })
        return string

      },
    }
  }
</script>

<style scoped lang="scss">

.vl {
  border-left: 1px dotted gray;
  white-space: nowrap;
  display: inline;
  margin-right: 12px ;
  margin-left: 12px ;
}

    button:not(.v-btn) {
        border: solid 1px gray;
        padding: 5px;
        margin: 2px;
    }

    .formula-menu {
      border-radius: 5px !important;
    }

    .formula-menu .v-list-item,
    .formula-menu .v-list {
      padding: 0;
    }
.tiptap-toolbar {
  ul {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      div.toolbar-item {
        color: rgba(0,0,0,.54);
        display: block;
        line-height: 30px;
        text-decoration: none;
        padding: 6px 5px 0;
      }
    }
  }
  ul li div.toolbar-item:hover {
    background: rgba(102, 102, 102, 0.54);
    border-radius: 25px;
  }
  ul li div.toolbar-item,
  ul li div.toolbar-item:after,
  ul li div.toolbar-item:before {
    -webkit-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
  }
  .toolbar-item{
    .toolbar-item-icon {
      font-size: 24px;
    }
  }
}
</style>
