<template>
  <div v-if="posts.length" class="blog-main">
    <div v-for="post in posts" :key="post.id" class="blog-post">
      <router-link :to="linkResolver?.(post)">
        <h2 v-if="post.data.title">{{ $prismic.asText(post.data.title) }}</h2>
        <template v-if="post.data.date">
          <p class="blog-post-meta">
            <span class="created-at">{{ formatDate(post.data.date) }}</span>
          </p>
        </template>
        <div>
          <p v-if="post.data.body">{{ getFirstParagraph(post) }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else class="blog-main">
    <p>No Posts published at this time.</p>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import { usePrismic } from '@prismicio/vue'
import type { Slice, PrismicDocument } from '@prismicio/types'

export default defineComponent({
  name: 'blog-posts',
  setup() {
    const { client, options, predicate } = usePrismic()
    const posts = ref([] as PrismicDocument[])

    onMounted(async () => {
      const response = await client.get({
        predicates: predicate.at('document.type', 'post'),
        orderings : 'my.post.date desc',
      })
      posts.value = response.results
    })

    const getFirstParagraph = (post: PrismicDocument, textLimit = 300) => {
      if (!post.data.body) return

      let firstParagraph = ''
      for (const slice of post.data.body as Slice[]) {
        if (slice.slice_type === 'text') {
          firstParagraph = (slice.primary.text as any[]).find(b => b.type === 'paragraph')?.text
          if (firstParagraph) break
        }
      }

      if (firstParagraph.length > textLimit) {
        const limitedText = firstParagraph.substr(0, textLimit)
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...'
      } else {
        return firstParagraph
      }
    }

    const formatDate = (date: string | number | Date) => {
      const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' } as Intl.DateTimeFormatOptions
      return Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date))
    }

    return {
      posts,
      getFirstParagraph,
      linkResolver: options.linkResolver,
      formatDate,
    }
  }
})
</script>

<style scoped>
.blog-main {
  max-width: 700px;
  margin: auto;
}
.blog-post {
  margin-bottom: 3rem;
}
.blog-post h2 {
  margin: 0;
}
.blog-post-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
  font-size: 16px;
}
@media (max-width: 767px) {
  .blog-main {
    padding: 0 20px;
    font-size: 18px;
  }
}
</style>