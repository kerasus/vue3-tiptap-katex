<template>
  <v-btn-toggle
    v-model="bubbleMenuItems"
    dense
    background-color="primary"
    dark
    multiple
  >
    <v-btn
      v-for="item in computedBubbleMenuItems"
      :key="'DynamicTable_'+item.name"
      :value="item.name"
      @click="editor.chain().focus()[item.name]().run()"
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-btn-toggle>
<!--    <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">-->
<!--        mergeOrSplit-->
<!--    </button>-->
<!--    <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">-->
<!--        setCellAttribute-->
<!--    </button>-->
<!--    <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">-->
<!--        fixTables-->
<!--    </button>-->
<!--    <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">-->
<!--        goToNextCell-->
<!--    </button>-->
<!--    <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">-->
<!--        goToPreviousCell-->
<!--    </button>-->
</template>

<script>
  export default {
    name: 'DynamicTable',
    props: ['editor'],
    data () {
      return {
        visibleItems: [],
        items: [
          {
            name: 'addColumnBefore',
            icon: 'mdi-table-column-plus-before'
          },
          {
            name: 'addColumnAfter',
            icon: 'mdi-table-column-plus-after'
          },
          {
            name: 'deleteColumn',
            icon: 'mdi-table-column-remove'
          },
          {
            name: 'addRowBefore',
            icon: 'mdi-table-row-plus-before'
          },
          {
            name: 'addRowAfter',
            icon: 'mdi-table-row-plus-after'
          },
          {
            name: 'deleteRow',
            icon: 'mdi-table-row-remove'
          },
          {
            name: 'deleteTable',
            icon: 'mdi-table-remove'
          },
          {
            name: 'mergeCells',
            icon: 'mdi-table-merge-cells'
          },
          {
            name: 'splitCell',
            icon: 'mdi-table-split-cell'
          },
          {
            name: 'toggleHeaderColumn',
            icon: 'mdi-format-header-pound'
          },
          {
            name: 'toggleHeaderRow',
            icon: 'mdi-format-header-pound'
          },
          {
            name: 'toggleHeaderCell',
            icon: 'mdi-format-header-pound'
          },
        ],
        bubbleMenuItems: [],
      }
    },
    computed: {
      computedBubbleMenuItems() {
        let items = []

        this.items.forEach( item => {
          let can = this.editor.can()[item.name]()
          if (can) {
            items.push(item)
          }
        })
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
