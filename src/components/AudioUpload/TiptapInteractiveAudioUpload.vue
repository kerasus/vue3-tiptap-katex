<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': true, 'uploading': !node.attrs.url }"
                     data-drag-handle>
    <!--    <div v-if="!node.attrs.url"-->
    <!--               instant-upload="false"-->
    <!--               :style="{ maxWidth: '600px', margin: '0 auto' }"-->
    <!--               name="file"-->
    <!--               label-idle="Drop files here..."-->
    <!--               accepted-file-types="video/mp4,video/x-m4v,video/*"-->
    <!--               chunk-uploads="true"-->
    <!--               :server="editor.editorOptions.uploadServer"-->
    <!--               :files="files"-->
    <!--               @processfile="onFileUpload" />-->
    <div v-if="!node.attrs.url">
      <input type="file" @change="previewFiles" accept="audio/*">
      <button v-if="files.length > 0" @click="upload" :disabled="uploading">
        <template v-if="!uploading">
          upload
        </template>
        <div v-else v-html="uploadPercent" />
      </button>
    </div>
    <div v-else
         class="resizer-container"
         :style="{
           marginBottom: node.attrs.vertical + 'px',
           marginTop: -1 * node.attrs.vertical + 'px'
         }">
      <span class="mdi mdi-drag"
            :style="{ top: node.attrs.vertical + 'px', height: node.attrs.height + 'px' }" />
      <audio controls :src="node.attrs.url" />
    </div>
  </node-view-wrapper>
</template>

<script>
// import vueFilePond from 'vue-filepond'
// import 'filepond/dist/filepond.min.css'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// import { MixinComponentImageUpload } from 'vue-tiptap-katex-core'

import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { defineAsyncComponent } from 'vue'

// const FilePond = vueFilePond(
//   FilePondPluginFileValidateType,
//   // FilePondPluginImagePreview
// )

export default {
  data() {
    return {
      files: [],
      uploading: false,
      uploadPercent: null
    }
  },
  components: {
    NodeViewWrapper,
    // FilePond,
    VueDragResize: defineAsyncComponent(() => {
      return new Promise((resolve) => {
        import('vue3-drag-resize')
            .then((response) => {
              resolve(response.default)
            })
      })
    })
  },
  // mixins: [MixinComponentImageUpload],
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
  methods: {
    previewFiles(event) {
      this.files = event.target.files
    },
    upload () {
      if (typeof this.editor.editorOptions.uploadAudio !== 'function') {
        return
      }

      this.uploading = true
      this.editor.editorOptions.uploadAudio(this.files, this.updateUploadingProgressBar, this.onFileUpload, this.onError)
    },
    updateUploadingProgressBar (percent) {
      this.uploadPercent = percent
    },
    onFileUpload (audioSrc) {
      this.uploading = false
      this.updateAttributes({
        url: audioSrc
      })
    },
    onError () {
      this.uploading = false
    }
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

.resizer-container img {
  height: 100% !important;
}

</style>
