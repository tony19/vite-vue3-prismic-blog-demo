<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>

      <h1 class="blog-title">{{ title }}</h1>
      <p class="blog-post-meta"><span v-if="date" class="created-at">{{ date }}</span></p>
    </div>
    <slices-block :slices="slices"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed } from 'vue'
import SlicesBlock from '@/components/SlicesBlock.vue'
import type { RichTextField, DateField, Slice } from '@prismicio/types'
import { usePrismic } from '@prismicio/vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

const formatDate = (date: Date) => {
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' } as Intl.DateTimeFormatOptions
  return Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date))
}

export default defineComponent({
  name: 'post',
  components: {
    SlicesBlock
  },
  setup() {
    const fields = reactive({
        title: '',
        date: null,
      } as {
        title: string,
        date: Date | null,
      }
    )
    const slices = ref([] as Slice[])

    const { client, asText, asDate } = usePrismic()
    const router = useRouter()

    const getContent = async(uid: string) => {
      const document = await client.getByUID('post', uid, {})
      if (document) {
        fields.title = asText(document.data.title as RichTextField)
        fields.date = asDate(document.data.date as DateField) as Date
        slices.value = document.data.body as Slice[]
      } else {
        router.push({ name: 'not-found' })
      }
    }

    onBeforeRouteUpdate((to, from, next) => {
      getContent(to.params.uid as string)
      next()
    })

    onMounted(() => getContent(useRoute().params.uid as string))

    return {
      date: computed(() => fields.date ? formatDate(fields.date as Date) : ''),
      slices,
      title: fields.title,
    }
  }
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