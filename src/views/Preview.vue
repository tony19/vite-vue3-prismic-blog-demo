<template>
  <div class="outer-container">
    <p>Loading the Prismic's Preview...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePrismic } from '@prismicio/vue'

export default defineComponent({
  name: 'preview',
  setup() {
    onMounted(async () => {
      const { token, documentId } = useRoute().query
      const { client, options } = usePrismic()

      const url = await client.resolvePreviewURL({
        linkResolver: options.linkResolver,
        defaultURL: '/',
        previewToken: token as string,
        documentId: documentId as string,
      })
      window.location.replace(url)
    })
  }
})
</script>