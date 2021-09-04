<template>
  <div v-if="posts.length" class="blog-main">
    <div v-for="post in posts" :key="post.id" v-bind:post="post" class="blog-post">
      <router-link :to="linkResolver(post)">
        <h2 v-if="post.data.title">{{ $prismic.asText(post.data.title) }}</h2>
        <template v-if="post.data.date">
          <p class="blog-post-meta">
            <span class="created-at">{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(post.data.date)) }}</span>
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

<script>
import { onMounted, ref, defineComponent } from 'vue'
import { usePrismic } from '@prismicio/vue'

export default defineComponent({
  name: 'blog-posts',
  setup() {
    const { client, options, predicate } = usePrismic()
    const posts = ref([])

    const getPosts = () => {
      client
        .query(predicate.at('document.type', 'post'), { orderings : '[my.post.date desc]' })
        .then(response => posts.value = response.results)
    }

    const getFirstParagraph = (post, textLimit = 300) => {
      let firstParagraph = ''

      for (const slice of post.data.body) {
        if (slice.slice_type === 'text') {
          firstParagraph = slice.primary.text.find(b => b.type === 'paragraph')?.text
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

    onMounted(getPosts)

    return {
      posts,
      getFirstParagraph,
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      linkResolver: options.linkResolver,
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