import Vue from 'vue'
import Test from './test'
import vuetify from './plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Test),
}).$mount('#app')
