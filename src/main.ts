import { createApp } from 'vue'
// @ts-ignore
import { createPrismic } from '@prismicio/vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(createPrismic({
    endpoint: window.prismic.endpoint,
    linkResolver,
    htmlSerializer
  }))
  .mount('#app')
