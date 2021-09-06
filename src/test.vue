<template>
  <v-app>
    <vue-tiptap-katex :options="{ poem: true }" ref="tiptap" />
    <v-btn @click="temp">click</v-btn>
    <div v-html="test"></div>
  </v-app>
</template>

<script>
import VueTiptapKatex from '@/vue-tiptap-katex';
export default {
  name: 'Test',
  components: {VueTiptapKatex},
  methods: {
    temp () {
      this.test = this.$refs.tiptap.getContent()
    }
  },
  data () {
    return {
      test: ''
    }
  }
}
</script>

<style>
  .beit {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  .beit .mesra {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    white-space: nowrap;
  }

  @media only screen and (max-width: 500px) {
    .beit {
      flex-direction: column;
    }
    .beit .mesra {
      white-space: normal;
      flex-basis: auto;
    }
  }
</style>
