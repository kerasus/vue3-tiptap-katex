import { createSSRApp, createApp, h } from "vue"
import PageShell from './app.vue'

export function createPageApp(PageContext, clientOnly) {
  const { Page: PageComponent, pageProps } = PageContext;
  const createAppFunc = clientOnly ? createApp : createSSRApp;

  const AppComponent = {
    render() {
      const renderLayoutSlot = () => h(PageComponent, pageProps || {})
      return h(PageShell
          , pageProps || {},
          { default: renderLayoutSlot })
    }
  };

  const page = createAppFunc(AppComponent)
  page.provide("pageContext", PageContext)
  return page;
}