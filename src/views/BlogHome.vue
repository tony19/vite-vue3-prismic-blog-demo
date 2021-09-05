<template>
  <div v-if="hasContent" class="page">
    <div class="home">
      <div class="blog-avatar" :style="{ backgroundImage }">
      </div>

      <h1 class="blog-title">
        {{ headline }}
      </h1>
      <p class="blog-description">{{ description }}</p>
    </div>
    <blog-posts/>
  </div>

  <div v-else class="home">
    <p>Please add some content to your blog home document.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BlogPosts from '@/components/BlogPosts.vue'

export default defineComponent({
  name: 'blog-home',
  components: {
    BlogPosts
  },
  data() {
    return {
      headline: '',
      description: '',
      image: '',
      posts: [],
      linkResolver: this.$prismic.linkResolver,
    }
  },
  mounted() {
    this.getContent()
  },
  methods: {
    async getContent() {
      const document = await this.$prismic.client.getSingle('blog_home', {})
      if (document) {
        this.headline = this.$prismic.asText(document.data.headline)
        this.description = this.$prismic.asText(document.data.description)
        this.image = document.data.image.url
      } else {
        this.$router.push({ name: 'not-found' })
      }
    },
  },
  computed: {
    backgroundImage(): string {
      return this.image ? `url(${this.image})` : ''
    },
    hasContent(): boolean {
      return !!(this.image ||  this.headline || this.description)
    }
  },
})
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: auto;
  text-align: center;
}
.home .blog-avatar {
  height: 140px;
  width: 140px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  margin: 1em auto;
}
.home .blog-description {
  font-size: 18px;
  color: #9A9A9A;
  line-height: 30px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px solid #DADADA;
}
@media (max-width: 767px) {
  .home {
    padding: 0 20px;
  }
}
</style>