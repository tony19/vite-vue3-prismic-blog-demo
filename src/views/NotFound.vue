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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'not-found',
  data() {
    return {
      attemptedRoute: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      (vm as any).attemptedRoute = {
        path: from.path,
        name: from.name,
      }
    })
  },
})
</script>