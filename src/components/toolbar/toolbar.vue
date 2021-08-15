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

    <div class="vl mx-3"></div>

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

    <div class="vl mx-3"></div>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().setTextAlign('right').run()"
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
          @click="editor.chain().focus().setTextAlign('center').run()"
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
          @click="editor.chain().focus().setTextAlign('left').run()"
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

    <div class="vl mx-3"></div>


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

    <div class="vl mx-3"></div>
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

    <div class="vl mx-3"></div>

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
          @click="editor.chain().focus().insertContent('<tiptap-interactive-katex-inline></tiptap-interactive-katex-inline>').run()"
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

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          tile
          icon
          v-bind="attrs"
          v-on="on"
          @click="editor.chain().focus().insertContent(tiptapInteractiveImageUpload).run()"
        >
          <v-icon>mdi-image</v-icon>
        </v-btn>
      </template>
      <span>Image</span>
    </v-tooltip>

    <!--    <dynamic-table :editor="editor" />-->
    <div class="vl mx-3"></div>

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
  </div>
</template>

<script>
    // import DynamicTable from "./dynamicTools/DynamicTable"

  export default {
    name: 'Toolbar',
    components: {
      // DynamicTable,
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
      }
    },
    computed: {
      tiptapInteractiveImageUpload () {
        return '<tiptap-interactive-image-upload token="' + this.accessToken + '" upload="' + this.uploadUrl + '"></tiptap-interactive-image-upload>'
      }
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
