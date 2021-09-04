<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>

      <h1>Page not found</h1>
      <p>Sorry we were unable to find the page you are looking for: {{ attemptedRoute.path }}</p>
      <router-link to="/blog" style="text-decoration: underline;">Return to home</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'not-found',
  setup() {
    const attemptedRoute = reactive({} as { path: string, name: string })

    onMounted(() => {
      const route = useRoute()
      attemptedRoute.path = route.path
      attemptedRoute.name = route.name as string
    })

    return { attemptedRoute }
  }
})
</script>