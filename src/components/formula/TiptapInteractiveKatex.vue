<template>
  <node-view-wrapper :class="{ 'vue-component': true, 'inline': node.attrs.inline, 'editable': editMode }"
                     data-drag-handle>
    <!--    ToDo : add FormulaBroken fix mode-->
    <!--    <div-->
    <!--        v-if="editMode && isFormulaBroken"-->
    <!--        icon-->
    <!--        color="green"-->
    <!--        @click="fixFormula"-->
    <!--    >-->
    <!--      <span-->
    <!--          class="mdi mdi-checkbox-multiple-marked"-->
    <!--      />-->
    <!--    </div>-->
    <template v-if="isElementReady">
      <div v-if="editMode"
           id="mathfield"
           ref="mathfield"
           class="editable"
           dir="ltr" />
      <div v-if="editMode"
           @click="toggleEdit">
        <span class="mdi mdi-check" />
      </div>
      <div v-if="!editMode"
           class="converted"
           dir="ltr"
           @click="editMode = true"
           v-html="computedKatex" />
    </template>
  </node-view-wrapper>
</template>

<script>
import { MixinComponentFormula } from 'vue-tiptap-katex-core'

import 'katex/dist/katex.min.css'
// eslint-disable-next-line no-unused-vars
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import '@mdi/font/css/materialdesignicons.css'

// ------------------- Mathlive ---------------------

import 'mathlive/dist/mathlive-fonts.css'
import 'mathlive/dist/mathlive-static.css'

// --------------------------------------------------

export default {
  name: 'TiptapInteractiveKatex',
  components: {
    NodeViewWrapper
  },
  mixins: [MixinComponentFormula]
}
</script>

<style lang="scss" scoped>

.mdi-check {
  color: #4caf50;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), background-color 0.3s;
  margin-right: 10px;
}

.mdi-check:hover {
  background-color: rgba(76, 175, 80, 0.3);
}

.katex {
  direction: ltr;
  display: inline-block;

  .colorbox {
    background-color: transparent !important;
  }

  .katex-html {
    .accent {
      background-color: transparent !important;
      border-color: transparent !important;
    }
    .overline {
      font-size: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
      line-height: inherit !important;
      text-transform: inherit !important;
      font-family: inherit !important;
    }
  }
}

.ML__fieldcontainer {
  .ML__fieldcontainer__field {
    .accent {
      background-color: transparent !important;
      border-color: transparent !important;
    }
    .overline {
      font-size: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
      line-height: inherit !important;
      text-transform: inherit !important;
      font-family: inherit !important;
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
  &.editable {
    display: flex;
    max-width: fit-content;
    justify-content: flex-end;
  }
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
.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: normal !important;
}
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

.ML__keyboard div .rows > ul > .h80 {
  height: 80px;
}

.ML__keyboard div .rows > ul > .h100 {
  height: 100px;
}

.ML__keyboard div .rows>ul>li aside {
  color: #fff !important;
}

@media only screen and (min-width: 1025px) {
  .ML__keyboard div .rows>ul {
    height: fit-content !important;
  }
}
</style>
