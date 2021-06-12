<template>
  <v-btn-toggle
    v-model="bubbleMenuItems"
    dense
    background-color="primary"
    dark
    multiple
  >
    <v-btn
      :value="'H1'"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      <v-icon>mdi-format-header-1</v-icon>
    </v-btn>
    <v-btn
      :value="'H2'"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      <v-icon>mdi-format-header-2</v-icon>
    </v-btn>
    <v-btn
      :value="'bulletList'"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn
      :value="'insertTable'"
      @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
    >
      <v-icon>mdi-table-plus</v-icon>
    </v-btn>
    <v-btn
      :value="'insertTable'"
      @click="editor.chain().focus().insertContent('<tiptap-interactive-katex></tiptap-interactive-katex>').run()"
    >
      <v-icon>mdi-sigma</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
  export default {
    name: 'SlotFloatingMenu',
    props: ['editor'],
    data () {
      return {
        bubbleMenuItems: [],
      }
    },
    computed: {
      computedBubbleMenuItems() {
        let items = []
        if (this.editor.isActive('heading', { level: 1 })) {
          items.push('H1')
        }
        if (this.editor.isActive('heading', { level: 2 })) {
          items.push('H2')
        }
        if (this.editor.isActive('bulletList')) {
          items.push('bulletList')
        }

        return items
      }
    },
    watch: {
      computedBubbleMenuItems () {
        this.bubbleMenuItems = this.computedBubbleMenuItems
      }
    }
  }
</script>

<style scoped>

</style>
