import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

export async function render(url) {
    const { app, router } = createApp(App);

    await router.push(url);
    await router.isReady();

    const ctx = {};
    const html = await renderToString(app, ctx);

    return html
    // const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    // return [html, preloadLinks];
}
