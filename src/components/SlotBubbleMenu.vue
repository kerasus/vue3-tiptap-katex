<template>
  <v-btn-toggle
    v-model="bubbleMenuItems"
    dense
    background-color="primary"
    dark
    multiple
  >
    <v-btn
      :value="'bold'"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>
    <v-btn
      :value="'italic'"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>
    <v-btn
      :value="'strike'"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      <v-icon>mdi-format-strikethrough</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
  export default {
    name: 'SlotBubbleMenu',
    props: ['editor'],
    data () {
      return {
        bubbleMenuItems: [],
      }
    },
    computed: {
      computedBubbleMenuItems() {
        let items = []
        if (this.editor.isActive('bold')) {
          items.push('bold')
        }
        if (this.editor.isActive('italic')) {
          items.push('italic')
        }
        if (this.editor.isActive('strike')) {
          items.push('strike')
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
