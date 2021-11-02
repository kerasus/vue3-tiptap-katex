import { createApp } from 'vue'
import Test from './test'

export const eventBus = createApp(Test)

createApp(Test).mount('#app')