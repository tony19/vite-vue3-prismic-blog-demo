<template>
  <div v-if="posts.length" class="blog-main">
    <div v-for="post in posts" :key="post.id" class="blog-post">
      <router-link :to="post.url">
        <h2>{{ post.title }}</h2>
        <p class="blog-post-meta">
          <span class="created-at">{{ post.date }}</span>
        </p>
        <div>
          <p>{{ post.firstParagraph }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else class="blog-main">
    <p>No Posts published at this time.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import type { PrismicDocument, Slice } from '@prismicio/types'

const getFirstParagraph = (post: PrismicDocument, textLimit = 300) => {
  if (!post.data.body) return ''

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

const formatDate = (date: string) => {
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' } as Intl.DateTimeFormatOptions
  return Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date))
}

type PostType = {
  id: string,
  title: string,
  date: string,
  url: string,
  firstParagraph: string,
}

export default defineComponent({
  name: 'blog-posts',
  data() {
    return {
      posts: [] as PostType[],
    }
  },
  async mounted() {
    const { asText, client, Predicates, linkResolver } = this.$prismic
    const parsePosts = (posts: PrismicDocument[]) => {
      return posts.map(post => ({
          id: post.id,
          title: asText(post.data.title),
          date: formatDate(post.data.date as string),
          url: linkResolver?.(post as any) ?? '',
          firstParagraph: getFirstParagraph(post),
      }))
    }
    const response = await client.query(
      Predicates.at('document.type', 'post'),
      { orderings : '[my.post.date desc]' }
    )
    this.posts = parsePosts(response.results as PrismicDocument[])
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