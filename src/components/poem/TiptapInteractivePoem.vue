<template>
  <node-view-wrapper
    class="vue-component"
    data-drag-handle
  >
    <v-row>
      <v-col :cols="6">
        <v-text-field
          v-model="poem1"
          outlined
          dense
          label="مصراع 1"
          @change="update"
        />
      </v-col>
      <v-col :cols="6">
        <v-text-field
          v-model="poem2"
          outlined
          dense
          label="مصراع 2"
          @change="update"
        />
      </v-col>
    </v-row>
  </node-view-wrapper>
</template>

<script>

import {NodeViewWrapper, nodeViewProps} from '@tiptap/vue-2'
export default {
  name: 'TiptapInteractivePoem',
  components: {
    NodeViewWrapper,
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
    editor: {
      type: Object
    }
  },
  data () {
    return {
      poem1: '',
      poem2: ''
    }
  },
  created() {
    if (this.node.attrs.poem1) {
      this.poem1 = this.node.attrs.poem1
    }
    if (this.node.attrs.poem2) {
      this.poem2 = this.node.attrs.poem2
    }
  },
  methods: {
    update () {
      this.updateAttributes({
        poem1: this.poem1,
        poem2: this.poem2,
      })
    }
  }
}
</script>

<style scoped>

</style>