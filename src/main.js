import Vue from 'vue'
import Test from './test'
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import vuetify from './plugins/vuetify' // path to vuetify export

Vue.use(VueKatex, {
  globalOptions: {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\[", right: "\\]", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false}
    ]
  }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Test),
}).$mount('#app')
