import { createApp } from 'vue'
import Test from './test.vue'

export const eventBus = createApp(Test)

createApp(Test).mount('#app')