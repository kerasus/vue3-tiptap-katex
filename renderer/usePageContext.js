// `usePageContext` allows us to access `pageContext` in any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { inject } from 'vue'

export { usePageContext }
export { setPageContext }

// eslint-disable-next-line symbol-description
const key = Symbol()

function usePageContext() {
  const pageContext = inject(key)
  return pageContext
}

function setPageContext(app, pageContext) {
  app.provide(key, pageContext)
}
