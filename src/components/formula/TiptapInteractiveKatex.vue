<template>
  <node-view-wrapper
    :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
    data-drag-handle
  >
    <div
      v-if="editMode"
      id="mathfield"
      ref="mathfield"
      dir="ltr"
      locale="fa"
      :class="{ 'editable': editMode }"
    >
      {{ katex }}
    </div>
    <div
      v-if="!editMode"
      class="converted"
      dir="ltr"
      @click="editMode = true"
      v-html="computedKatex"
    />
    <div
      v-if="!editMode"
      ref="printdiv"
      icon
      color="blue"
      @click="editMode = true"
    >
      mdi-pencil
    </div>
    <div
      v-if="editMode"
      icon
      color="green"
      @click="toggleEdit"
    >
      mdi-check
    </div>
  </node-view-wrapper>
</template>

<script>
import 'katex/dist/katex.min.css'

import {NodeViewWrapper, nodeViewProps} from '@tiptap/vue-3'
import 'mathlive/dist/mathlive-fonts.css'
import 'mathlive/dist/mathlive-static.css'
import '@mdi/font/css/materialdesignicons.css'

import {MixinComponentFormula} from 'vue-tiptap-katex-core'

// eslint-disable-next-line vue/one-component-per-file
export default {
  components: {
    NodeViewWrapper,
  },
  mixins: [MixinComponentFormula],
  props: {
    nodeViewProps
  }
}
</script>

<style lang="scss" scoped>

.katex {
  direction: ltr;
  display: inline-block;

  .katex-html {
    .accent {
      background-color: unset !important;
      border-color: unset !important;
    }
  }
}

.vue-component {
  /*background: #FAF594;*/
  /*border: 1px solid #0D0D0D;*/
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
  white-space: normal;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}

.vue-component.inline {
  display: inline-flex;
}

.label {
  margin-left: 1rem;
  background-color: #0D0D0D;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin-top: 1.5rem;
  padding: 1rem;
}

/*#mathfield, .latexData {*/
/*    padding: 8px;*/
/*    font-size: 20px;*/
/*}*/

#mathfield {
  width: 95%;
}

#mathfield, .latexData {
  font-size: 32px;
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .3);
  box-shadow: 0 0 8px rgba(0, 0, 0, .2)
}
</style>

<style>
.ML__mathlive .ML__base span span span span span span span svg {
  width: 300em !important;
  height: 0.5em !important;
}

.converted p {
  margin-bottom: 0 !important;
}

.ML__keyboard div .rows > ul > .w30 {
  width: 200px;
}
</style>
