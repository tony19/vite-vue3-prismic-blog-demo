<template>
  <div class="outer-container">
    <p>Loading the Prismic's Preview...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'preview',
  async beforeCreate() {
    const { token, documentId } = this.$route.query
    const url = await this.$prismic.client.getPreviewResolver(token as string, documentId as string).resolve(this.$prismic.linkResolver, '/')
    window.location.replace(url)
 }
})
</script>