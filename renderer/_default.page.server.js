import { renderToString } from 'vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { createPageApp } from './app'
// import "/assets/styles/index.css";
import logoUrl from './favicon.ico'

// By default we do not want to pre-render our pages.
// This makes pre-rendering opt-in by adding `doNotPrerender = false` to pages.
export const doNotPrerender = true

export const passToClient = ['pageProps', 'urlPathname']

export async function render(pageContext) {
  const page = createPageApp(pageContext, false)
  const pageHtml = pageContext.Page ? await renderToString(page) : ''
  const title = pageContext.exports.title ? pageContext.exports.title : 'tiptap katex editor'
  const desc = pageContext.exports.description || 'tiptap editor using mathlive package to render katex in vue 3'

  return escapeInject`
    <!DOCTYPE html>
    <html lang="en">
      <head>

        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <link rel="icon" href="${logoUrl}">

      </head>
      <body>

        <!-- This is where the page HTML is injected into the document. -->
        <div id="page">${dangerouslySkipEscape(pageHtml)}</div>

      </body>
    </html>
  `
}
