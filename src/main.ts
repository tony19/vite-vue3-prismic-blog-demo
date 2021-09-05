import Vue from 'vue'
// @ts-ignore
import PrismicVue from '@prismicio/vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'

Vue.use(PrismicVue, {
  endpoint: 'https://blog-demo2.prismic.io/api/v2',
  linkResolver,
  htmlSerializer
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
