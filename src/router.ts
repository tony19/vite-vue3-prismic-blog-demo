import { createRouter, createWebHistory } from 'vue-router'
import BlogHome from './views/BlogHome.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'blog-home' }
    },
    {
      path: '/blog',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:uid',
      name: 'post',
      component: () => import('./views/Post.vue')
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('./views/Preview.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'not-found' }
    }
  ],
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})
