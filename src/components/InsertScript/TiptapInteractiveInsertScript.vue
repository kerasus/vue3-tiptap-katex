<template>
  <node-view-wrapper class="barehtml">
    <div contenteditable="false"
         class="mesra-label">
          <textarea v-model="scriptData" @input="onChangeScript($event.target.value)" />
          <div v-if="scriptData"
               class="resizer-container">
            <span class="mdi mdi-drag" />
            <div style="width: 100%" ref="scriptContainer"></div>
          </div>
    </div>
    <div style="display: none;">
      <node-view-content class="content" />
    </div>
  </node-view-wrapper>

<!--  <node-view-wrapper class="barehtml"-->
<!--                     data-drag-handle>-->
<!--    <textarea v-model="scriptData" @input="onChangeScript($event.target.value)" />-->
<!--    <div v-if="scriptData"-->
<!--         class="resizer-container">-->
<!--      <span class="mdi mdi-drag" />-->
<!--      <div style="width: 100%" ref="scriptContainer"></div>-->
<!--    </div>-->
<!--  </node-view-wrapper>-->
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'

export default {
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
      required: true
    }
  },
  data () {
    return {
      scriptData: null
    }
  },
  methods: {
    onChangeScript (newValue) {
      if (!newValue) {
        return
      }
      this.$refs.scriptContainer.innerHTML = this.scriptData
      this.updateAttributes({
        data: this.scriptData
      })
    }
  }
}
</script>

<style scoped lang="scss">
.barehtml {
  width: 100%;
  max-width: 500px;
  textarea {
    width: 100%;
    border: solid 1px #dadada;
    border-radius: 8px;
    display: block;
    margin: 0;
    padding: 0;
  }
  .resizer-container {
    position: relative;
    cursor: grab;
    display: flex;
    margin: 0 0 0 17px;
    .mdi-drag {
      background: #e6e6e6;
      position: absolute;
      height: 100%;
      left: -16px;
      &::before {
        position: relative;
        top: calc(50% - 10px);
      }
    }
  }
  display: inline-block;
}
</style>
