<template>
  <node-view-wrapper
    class="poem ma-4"
    data-drag-handle
  >
    <node-view-content
      class="content"
      dir="auto"
    />
  </node-view-wrapper>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-3'
import MixinComponentPoem from 'vue-tiptap-katex-core/components/poem/mixin'

export default {
  name: 'TiptapInteractivePoem',
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  mixins: [MixinComponentPoem],
}
</script>

<style lang="scss">
.poem .content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.poem {
  width: 100%;
}
</style>
