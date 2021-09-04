import { createApp } from 'vue'
import { createPrismic } from '@prismicio/vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(createPrismic({
    endpoint: 'https://blog-demo2.prismic.io/api/v2',
    linkResolver,
    htmlSerializer
  }))
  .mount('#app')
