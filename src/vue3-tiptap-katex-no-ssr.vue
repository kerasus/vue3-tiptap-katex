<template>
  <div class="vue-tiptap-katex-no-ssr">
    <component :is="editorComponent"
               ref="tiptap"
                      v-model="localModelValue"
                      :upload-server="uploadServer"
                      :loading="loading"
                      :options="options"
    />
  </div>
</template>

<script>
export default {
  name: 'VueTiptapKatexNoSsr',
  props: {
    uploadServer: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      editorComponent: null,
    }
  },
  mounted () {
    import('./vue3-tiptap-katex.vue')
        .then((vue3TiptapKatex) => {
          this.editorComponent = vue3TiptapKatex.default
        })
        .catch()
  },
  computed: {
    localModelValue: {
      get () {
        return this.modelValue
      },
      set (newValue) {
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  methods: {
    updateTableStyle(data) {
      this.$refs.tiptap.updateTableStyle(data)
    },
    convertTableStyleToCss(data) {
      return this.$refs.tiptap.convertTableStyleToCss(data)
    },
    setShowDialog(val) {
      this.$refs.tiptap.setShowDialog(val)
    },
    getTableDirection() {
      return this.$refs.tiptap.getTableDirection()
    },
    elementFromString(value) {
      return this.$refs.tiptap.elementFromString(value)
    },
    insertPoem({ state, view }, value) {
      this.$refs.tiptap.insertPoem({ state, view }, value)
    },
    setContent(pureHTML) {
      this.$refs.tiptap.setContent(pureHTML)
    },
    getContent() {
      return this.$refs.tiptap.getContent()
    }
  }
}
</script>
