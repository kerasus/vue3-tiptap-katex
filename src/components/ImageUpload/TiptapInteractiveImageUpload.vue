<template>
  <node-view-wrapper
    :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
    data-drag-handle
  >
    <file-pond
      v-if="!node.attrs.url"
      instant-upload="false"
      :style="{ maxWidth: '600px', margin: '0 auto' }"
      name="file"
      label-idle="Drop files here..."
      accepted-file-types="image/jpeg, image/png"
      chunk-uploads="true"
      :server="editor.editorOptions.uploadServer"
      :files="files"
      @processfile="onFileUpload"
    />
    <div
      v-else-if="naturalHeight && naturalWidth"
      class="resizer-container"
      :style="{
        height: node.attrs.height + 'px',
        width: node.attrs.width + 'px',
        marginBottom: node.attrs.vertical + 'px',
        marginTop: -1 * node.attrs.vertical + 'px'
      }"
    >
      <span
        class="mdi mdi-drag"
        :style="{ top: node.attrs.vertical + 'px', height: node.attrs.height + 'px' }"
      />
      <vue-drag-resize
        :w="naturalWidth"
        :h="naturalHeight"
        :aspect-ratio="true"
        :sticks="['br']"
        axis="y"
        :y="node.attrs.vertical"
        @resizestop="resizeEnd"
        @dragstop="dragEnd"
      >
        <img :src="node.attrs.url">
      </vue-drag-resize>
    </div>
  </node-view-wrapper>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import VueDragResize from 'vue3-drag-resize'
import MixinComponentImageUpload from 'vue-tiptap-katex-core/components/ImageUpload/mixin'

import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
)

export default {
  mixins: [MixinComponentImageUpload],
  components: {
    NodeViewWrapper,
    FilePond,
    VueDragResize,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true,
    },
    updateAttributes: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style>
.vue-component.inline {
  display: inline-block;
}

.inline.uploading {
  width: 500px;
}

.inline .resizer-container {
  margin: 0 24px;
}

.filepond--credits {
  display: none;
}

.filepond--action-revert-item-processing {
  display: none;
}

.filepond--file-status-sub {
  display: none;
}

.resizer-container {
  position: relative;
  cursor: grab;
  display: flex;
  margin-right: 32px;
}

.resizer-container .mdi-drag {
  background: #e6e6e6;
  position: absolute;
  left: -16px;
}

.resizer-container .mdi-drag::before {
  position: relative;
  top: calc(50% - 10px);
}

.vdr {
  position: relative !important;
}

.resizer-container img {
  height: 100% !important;
}

</style>
