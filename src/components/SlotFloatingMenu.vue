<template>
  <div>
    SlotFloatingMenu
  </div>
</template>

<script>
  export default {
    name: 'SlotFloatingMenu',
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
