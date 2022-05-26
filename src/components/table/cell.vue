<template>
  <node-view-wrapper
    class="cell"
    :class="{
      'border-top-none': !node.attrs.cellBorderVisibility.top,
      'border-right-none': !node.attrs.cellBorderVisibility.right,
      'border-bottom-none': !node.attrs.cellBorderVisibility.bottom,
      'border-left-none': !node.attrs.cellBorderVisibility.left
    }"
    :style="{
      border: node.attrs.cellBorderWidth + ' ' + node.attrs.cellBorderType + ' ' + node.attrs.cellBorderColor,
      backgroundColor: node.attrs.cellBg,
      width: node.attrs.cellWidth
    }"
  >
    <div>
      <node-view-content class="content" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'


export default {
  name: 'Cell',
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>
.cell {
  margin: 0;
  width: 50px;
  height: 50px;
  border: 1px solid;
}

.border-left-none {
  border-left: none;
}

.border-right-none {
  border-right: none;
}

.border-top-none {
  border-top: none;
}

.border-bottom-none {
  border-bottom: none;
}
</style>
