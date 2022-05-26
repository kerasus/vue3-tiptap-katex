<template>
  <node-view-wrapper>
    <div>
      <node-view-content class="content">
        <!--        <div v-text="test" />-->
      </node-view-content>
      <div v-text="test" />
      test
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'


export default {
  name: 'TiptapInteractiveTable',
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
  data () {
    return {
      test: '<table-cell></table-cell>'
    }
  }
}
</script>

<style scoped>

</style>
