<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
                     data-drag-handle>
    <file-pond v-if="!node.attrs.url"
               instant-upload="false"
               :style="{ maxWidth: '600px', margin: '0 auto' }"
               name="file"
               label-idle="Drop files here..."
               accepted-file-types="image/jpeg, image/png"
               chunk-uploads="true"
               :server="editor.editorOptions.uploadServer"
               :files="files"
               @processfile="onFileUpload" />
    <div v-else
         class="resizer-container"
         ref="container"
         :style="{
           height: node.attrs.height + 'px',
           width: node.attrs.width + 'px',
           marginBottom: node.attrs.vertical + 'px',
           marginTop: -1 * node.attrs.vertical + 'px'
         }">
      <span class="mdi mdi-drag"
            :style="{ top: node.attrs.vertical + 'px', height: node.attrs.height + 'px' }" />
      <img :src="node.attrs.url"
           :width="node.attrs.width"
           :height="node.attrs.height" />
      <div class="resize-handle"
           @mousedown="startResizing" />
      <!--            <vue-drag-resize :w="naturalWidth"-->
      <!--                             :h="naturalHeight"-->
      <!--                             :aspect-ratio="true"-->
      <!--                             :sticks="['br']"-->
      <!--                             axis="y"-->
      <!--                             :y="node.attrs.vertical"-->
      <!--                             @resizestop="resizeEnd"-->
      <!--                             @dragstop="dragEnd">-->
      <!--              <img :src="node.attrs.url">-->
      <!--            </vue-drag-resize>-->
    </div>
  </node-view-wrapper>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import { defineAsyncComponent } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { MixinComponentImageUpload } from 'vue-tiptap-katex-core'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
)

export default {
  components: {
    NodeViewWrapper,
    FilePond
  },
  mixins: [MixinComponentImageUpload],
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
      mounted: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    }
  },
  mounted() {
    this.mounted = true
    if (this.$refs.container) {
      this.$refs.container.style.position = 'relative'
    }
  },
  methods: {
    startResizing(event) {
      event.preventDefault()
      event.stopPropagation()
      this.resizing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = this.naturalWidth;
      this.startHeight = this.naturalHeight;

      document.addEventListener("mousemove", this.resize);
      document.addEventListener("mouseup", this.stopResizing);
    },
    resize(event) {
      if (this.resizing) {
        const deltaX = this.startX - event.clientX; // Calculate the change in X (reverse for left-side resizing)
        const deltaY = event.clientY - this.startY; // Change in Y remains the same

        // Update width and height
        this.naturalWidth = Math.max(50, this.startWidth + deltaX);
        this.naturalHeight = Math.max(50, this.startHeight + deltaY);

        this.updateAttributes({
          width: this.naturalWidth,
          height: this.naturalHeight
        })
        if (this.editor.editorOptions.onResizeEnd) {
          this.updateAttributes({
            url: this.editor.editorOptions.onResizeEnd(this.node.attrs.url, this.naturalWidth, this.naturalHeight)
          })
        }

      }
    },
    stopResizing() {
      this.resizing = false;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResizing);
    },
  }
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


</style>

<style scoped>
.resizer-container {
  max-width: 100%;
}
.resizer-container img {
  width: 100% !important;
  height: 100% !important;
}
.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border: solid 1px black;
  background-color: white;
  cursor: nwse-resize;
}
</style>
