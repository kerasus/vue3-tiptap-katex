import { createApp } from 'vue'
import App from './App.vue'

const { app, router } = createApp(App);

router.isReady()
    .then(() => {
    app.mount("#app");

    console.log("hydrated");
});
