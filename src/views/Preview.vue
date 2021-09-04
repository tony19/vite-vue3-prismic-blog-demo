<template>
  <div class="outer-container">
    <p>Loading the Prismic's Preview...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { usePrismic } from '@prismicio/vue'

export default defineComponent({
  name: 'preview',
  setup() {
    const { token, documentId } = useRoute().query
    const { client, predicate } = usePrismic()
    client.getPreviewResolver(token as string, documentId as string).resolve(this.$prismic.linkResolver, '/')
      .then((url) => {
        window.location.replace(url)
      })
  }
})
</script>