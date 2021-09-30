<template>
  <div
    v-if="editor"
    class=""
  >
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <v-icon>mdi-format-paragraph</v-icon>
        </v-btn>
      </template>
      <span>Paragraph</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <v-icon>mdi-format-header-1</v-icon>
        </v-btn>
      </template>
      <span>Heading 1</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
      </template>
      <span>Heading 2</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <v-icon>mdi-format-header-3</v-icon>
        </v-btn>
      </template>
      <span>Heading 3</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <v-icon>mdi-format-header-4</v-icon>
        </v-btn>
      </template>
      <span>Heading 4</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <v-icon>mdi-format-header-5</v-icon>
        </v-btn>
      </template>
      <span>Heading 5</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          <v-icon>mdi-format-header-6</v-icon>
        </v-btn>
      </template>
      <span>Heading 6</span>
    </v-tooltip>

    <div class="vl mx-3" />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
      </template>
      <span>Bold</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
      </template>
      <span>Italic</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
      </template>
      <span>Underline</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <v-icon>mdi-format-strikethrough</v-icon>
        </v-btn>
      </template>
      <span>Line Through</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleHighlight().run()"
        >
          <v-icon>mdi-format-color-highlight</v-icon>
        </v-btn>
      </template>
      <span>Highlight</span>
    </v-tooltip>

    <div class="vl mx-3" />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="justify('right')"
        >
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
      </template>
      <span>Align Right</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="justify('center')"
        >
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>
      </template>
      <span>Align Center</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="justify('left')"
        >
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
      </template>
      <span>Align Left</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </template>
      <span>Align Justify</span>
    </v-tooltip>

    <div class="vl mx-3" />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setTextDirection('rtl').run()"
        >
          <v-icon>mdi-format-textdirection-r-to-l</v-icon>
        </v-btn>
      </template>
      <span>Text rtl</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setTextDirection('ltr').run()"
        >
          <v-icon>mdi-format-textdirection-l-to-r</v-icon>
        </v-btn>
      </template>
      <span>Text ltr</span>
    </v-tooltip>

    <div class="vl mx-3" />


    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </template>
      <span>Unordered List</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>
      </template>
      <span>Ordered List</span>
    </v-tooltip>

    <div class="vl mx-3" />
    <!--    <v-btn-->
    <!--      small-->
    <!--      tile-->
    <!--      icon-->
    <!--      :outlined="editor.isActive('code')"-->
    <!--      @click="editor.chain().focus().toggleCode().run()"-->
    <!--    >-->
    <!--      <v-icon>mdi-code-braces</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      small-->
    <!--      tile-->
    <!--      icon-->
    <!--      :outlined="editor.isActive('codeBlock')"-->
    <!--      @click="editor.chain().focus().toggleCodeBlock().run()"-->
    <!--    >-->
    <!--      <v-icon>mdi-code-braces-box</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      small-->
    <!--      tile-->
    <!--      icon-->
    <!--      :outlined="editor.isActive('blockquote')"-->
    <!--      @click="editor.chain().focus().toggleBlockquote().run()"-->
    <!--    >-->
    <!--      <v-icon>mdi-comment-quote-outline</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      small-->
    <!--      tile-->
    <!--      icon-->
    <!--      @click="editor.chain().focus().unsetAllMarks().run()"-->
    <!--    >-->
    <!--      <v-icon>mdi-format-clear</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      small-->
    <!--      tile-->
    <!--      icon-->
    <!--      @click="editor.chain().focus().clearNodes().run()"-->
    <!--    >-->
    <!--      <v-icon>mdi-vector-polyline-remove</v-icon>-->
    <!--    </v-btn>-->

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          <v-icon>mdi-arrow-expand-down</v-icon>
        </v-btn>
      </template>
      <span>Break</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <v-icon>mdi-arrow-split-horizontal</v-icon>
        </v-btn>
      </template>
      <span>Horizontal Divider</span>
    </v-tooltip>

    <div class="vl mx-3" />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        >
          <v-icon>mdi-table-plus</v-icon>
        </v-btn>
      </template>
      <span>Table</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().mergeCells()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().mergeCells().run()"
        >
          <v-icon>mdi-table-merge-cells</v-icon>
        </v-btn>
      </template>
      <span>Merge Cells</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().splitCell()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().splitCell().run()"
        >
          <v-icon>mdi-table-split-cell</v-icon>
        </v-btn>
      </template>
      <span>Split Cells</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().addColumnAfter()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          <v-icon>mdi-table-column-plus-after</v-icon>
        </v-btn>
      </template>
      <span>Add Column</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().addRowAfter()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().addRowAfter().run()"
        >
          <v-icon>mdi-table-row-plus-after</v-icon>
        </v-btn>
      </template>
      <span>Add Row</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().deleteColumn()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().deleteColumn().run()"
        >
          <v-icon>mdi-table-column-remove</v-icon>
        </v-btn>
      </template>
      <span>Delete Column</span>
    </v-tooltip>

    <v-tooltip
      v-if="editor.can().deleteRow()"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().deleteRow().run()"
        >
          <v-icon>mdi-table-row-remove</v-icon>
        </v-btn>
      </template>
      <span>Delete Row</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().insertContent('<tiptap-interactive-katex-inline></tiptap-interactive-katex-inline> ').run()"
        >
          <v-icon>mdi-sigma</v-icon>
        </v-btn>
      </template>
      <span>Add Formula</span>
    </v-tooltip>

    <!--    <v-menu-->
    <!--            open-on-hover-->
    <!--            bottom-->
    <!--            :tile="true"-->
    <!--            offset-y-->
    <!--            rounded-->
    <!--            content-class="formula-menu"-->
    <!--    >-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-btn-->
    <!--                small-->
    <!--                tile-->
    <!--                icon-->
    <!--                v-on="on"-->
    <!--                v-bind="attrs"-->
    <!--        >-->
    <!--          <v-icon>mdi-sigma</v-icon>-->
    <!--        </v-btn>-->
    <!--      </template>-->

    <!--      <v-list>-->
    <!--        <v-list-item>-->
    <!--          <v-btn dense tile elevation="0" color="#fff" block @click="editor.chain().focus().insertContent('<tiptap-interactive-katex-inline></tiptap-interactive-katex-inline>').run()">-->
    <!--            Inline-->
    <!--          </v-btn>-->
    <!--        </v-list-item>-->
    <!--        <v-list-item>-->
    <!--          <v-btn dense tile elevation="0" color="#fff" block @click="editor.chain().focus().insertContent('<tiptap-interactive-katex></tiptap-interactive-katex>').run()">-->
    <!--            Block-->
    <!--          </v-btn>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-menu>-->

    <!--    <v-tooltip top>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-btn-->
    <!--          small-->
    <!--          tile-->
    <!--          icon-->
    <!--          v-bind="attrs"-->
    <!--          v-on="on"-->
    <!--          @click="editor.chain().focus().insertContent(tiptapInteractiveImageUpload).run()"-->
    <!--        >-->
    <!--          <v-icon>mdi-image</v-icon>-->
    <!--        </v-btn>-->
    <!--      </template>-->
    <!--      <span>Image</span>-->
    <!--    </v-tooltip>-->

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().insertContent(tiptapInteractiveImageUploadInline).run()"
        >
          <v-icon>mdi-image</v-icon>
        </v-btn>
      </template>
      <span>Image</span>
    </v-tooltip>

    <!--    <dynamic-table :editor="editor" />-->
    <div class="vl mx-3" />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().redo().run()"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </template>
      <span>Redo</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().undo().run()"
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>
      </template>
      <span>Undo</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="paste"
        >
          <v-icon>mdi-content-paste</v-icon>
        </v-btn>
      </template>
      <span>Paste</span>
    </v-tooltip>

    <v-tooltip
      v-if="options && options.poem"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="insertPoem"
        >
          <!--          @click="editor.chain().focus().insertContent('<tiptap-interactive-poem></tiptap-interactive-poem>').run()"            -->
          <!--          <tiptap-interactive-poem><table><tr><td>test1</td><td>test2</td></tr></table></tiptap-interactive-poem>          -->
          <v-icon>mdi-format-columns</v-icon>
        </v-btn>
      </template>
      <span>Poem</span>
    </v-tooltip>

    <v-tooltip
      v-if="options && options.poem"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().insertContent('<tiptap-interactive-reading>Type Here</tiptap-interactive-reading>').run()"
        >
          <v-icon>mdi-eye-off</v-icon>
        </v-btn>
      </template>
      <span>Reading</span>
    </v-tooltip>
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
        default: () => {}
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

        let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gm;        string = string.replace(regex, (match) => {
          console.log(match)
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

<style scoped>

.vl {
  border-left: 1px dotted gray;
  white-space: nowrap;
  display: inline;
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
</style>
