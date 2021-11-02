<template>
  <node-view-wrapper
    class="vue-component"
    data-drag-handle
  >
    <node-view-content
      id="test"
      ref="test"
      as="table"
      class="content"
      dir="auto"
    />
  </node-view-wrapper>
</template>

<script>

import {NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-3'
export default {
  name: 'TiptapInteractivePoem',
  components: {
    NodeViewWrapper,
    NodeViewContent
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
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.test)
      console.log(document.getElementById('test'))
      document.getElementById('test').innerHTML = '<div style="color: red;">test</div>'
    }, 2000);
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

<style lang="scss">
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;

td,
th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;

> * {
  margin-bottom: 0;
}
}

th {
  font-weight: bold;
  text-align: left;
  background-color: #f1f3f5;
}
}
</style>
