<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>
      <!-- Button to edit document in dashboard -->
      <!-- <prismic-edit-button :documentId="documentId"/> -->

      <h1 class="blog-title" v-if="fields.title">{{ $prismic.asText(fields.title) }}</h1>
      <p class="blog-post-meta" v-if="fields.date"><span class="created-at">{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(fields.date)) }}</span></p>
    </div>
    <slices-block :slices="slices"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SlicesBlock from '@/components/SlicesBlock.vue'

export default defineComponent({
  name: 'post',
  components: {
    SlicesBlock
  },
  data() {
    return {
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      documentId: '',
      fields: {
        title: null,
        date: null,
      },
      slices: []
    }
  },
  created() {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid)
    next()
  },
  methods: {
    getContent(uid: string) {
      this.$prismic.client.getByUID('post', uid, {})
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.title
            this.fields.date = document.data.date
            this.slices = document.data.body
          } 
          else {
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
})
</script>

<style>
.post-part.single a {
  text-decoration: none;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 23px;
}
.blog-post-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
}

/* Media Queries */
@media (max-width: 767px) {
  .post-part pre {
    font-size: 14px;
  }
  .blog-post-meta {
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) {
  .blog-post-meta {
    font-size: 16px;
  }
}
</style>