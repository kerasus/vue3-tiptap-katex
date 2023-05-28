import { createPageApp } from './app'

export async function render(pageContext) {
  const page = createPageApp(pageContext, document.getElementById('page')?.innerHTML === '')
  page.mount('#page')
}
