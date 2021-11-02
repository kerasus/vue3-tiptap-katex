<template>
  <div>
    SlotBubbleMenu
  </div>
</template>

<script>
  export default {
    name: 'SlotBubbleMenu',
    props: {
      editor: {
        type: Object,
        default: () => {}
      }
    },
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
