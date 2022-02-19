<template>
  <node-view-wrapper
    :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
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
      :server="{ url: '/api/v1/question/upload/620e09bd2079aa7c1b00cf8d', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs' } }"
      :files="files"
      @processfile="onFileUpload"
    />
    <Vue3DraggableResizable

    >
      This is a test example
    </Vue3DraggableResizable>
  </node-view-wrapper>
</template>

<script>
  import vueFilePond from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  const FilePond = vueFilePond(
      FilePondPluginFileValidateType,
      FilePondPluginImagePreview
  );

  import Vue3DraggableResizable from 'vue3-draggable-resizable'
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

  import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'


  export default {
    components: {
      NodeViewWrapper,
      FilePond,
      Vue3DraggableResizable
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
    data() {
      return {
        files: []
      }
    },
    computed: {
      accessToken () {
        return this.node.attrs.token
      },
      headers () {
        return {
          Authorization: 'Bearer ' + this.accessToken
        }
      },
    },
    created() {

    },
    methods: {
      onFileUpload (err, file) {
        if (!err) {
          this.updateAttributes({
            url: JSON.parse(file.serverId).url
          })
        }
      }
    }
  }
</script>

<style>
.filepond--credits {
  display: none;
}

.filepond--action-revert-item-processing {
  display: none;
}

.filepond--file-status-sub {
  display: none;
}
</style>
