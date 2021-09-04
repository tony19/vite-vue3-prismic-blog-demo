<template>
  <div v-if="hasContent" class="page">
    <div class="home">
      <!-- Button to edit document in dashboard -->
      <!-- <prismic-edit-button :documentId="documentId"/> -->
      <div class="blog-avatar" :style="{ backgroundImage: 'url(' + fields.image?.url + ')' }">
      </div>

      <h1 class="blog-title" v-if="fields.headline">
        {{ $prismic.asText(fields.headline) }}
      </h1>
      <p v-if="fields.description" class="blog-description">{{ $prismic.asText(fields.description) }}</p>
    </div>
    <blog-posts/>
  </div>

  <div v-else class="home">
    <p>Please add some content to your blog home document.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BlogPosts from '@/components/BlogPosts.vue'
import type { RichTextField, ImageField } from '@prismicio/types'

export default defineComponent({
  name: 'blog-home',
  components: {
    BlogPosts
  },
  data() {
    return {
      documentId: '',
      fields: {
        headline: null,
        description: null,
        image: null
      } as {
        headline: RichTextField | null,
        description: RichTextField | null,
        image: ImageField | null
      },
      posts: [],
      linkResolver: this.$prismic.options.linkResolver,
      hasContent: false
    }
  },
  created() {
    this.getContent()
  },
  methods: {
    async getContent() {
      const document = await this.$prismic.client.getSingle('blog_home', {})
      if (document) {
        this.documentId = document.id
        this.fields.headline = document.data.headline as RichTextField
        this.fields.description = document.data.description as RichTextField
        this.fields.image = document.data.image as ImageField
        this.checkForContent()
      } else {
        this.$router.push({ name: 'not-found' })
      }
    },
    checkForContent() {
      if (
        this.fields.image?.url ||
        this.$prismic.asText(this.fields.headline as RichTextField) ||
        this.$prismic.asText(this.fields.description as RichTextField)
      ) {
        this.hasContent = true
      }
    },
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