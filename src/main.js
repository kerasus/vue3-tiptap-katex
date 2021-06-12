import Vue from 'vue'
import VueTiptapKatex from './vue-tiptap-katex'
import vuetify from './plugins/vuetify' // path to vuetify export

Vue.use(VueTiptapKatex)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(VueTiptapKatex),
}).$mount('#app')
