<template>
  <node-view-wrapper class="mesra">
    <div
      contenteditable="false"
      class="mesra-label"
    >
      مصراع
    </div>
    <div>
      <node-view-content class="content" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
import MixinComponentPoemMesra from 'vue-tiptap-katex-core/components/poem/mixin-mesra'

export default {
  name: 'Mesra',
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  mixins: [MixinComponentPoemMesra],
}
</script>

<style scoped>
.mesra {
  margin: 20px;
  border: 1px solid #eee;
  width: 50%;
}

.mesra-label {
  background: #eee;
  padding: 5px 10px 8px 20px;
  border-bottom-left-radius: 20px;
  width: max-content;
}
</style>
