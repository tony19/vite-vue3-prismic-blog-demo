<template>
  <section>
    <section v-for="(slice, index) in slices" :key="'slice-' + index">
      <template v-if="slice.slice_type === 'text'">
        <text-slice :slice="slice"></text-slice>
      </template>
      <template v-else-if="slice.slice_type === 'quote'">
        <quote-slice :slice="slice"></quote-slice>
      </template>
      <template v-else-if="slice.slice_type === 'image_with_caption'">
        <image-caption-slice :slice="slice"></image-caption-slice>
      </template>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from 'vue'
import type { Slice } from '@prismicio/types'

export default defineComponent({
  props: {
    slices: {
      type: Array as PropType<Slice[]>,
      required: true,
    },
  },
  name: 'slices-block',
  components: {
    QuoteSlice: defineAsyncComponent(() => import('@/components/slices/QuoteSlice.vue')),
    TextSlice: defineAsyncComponent(() => import('@/components/slices/TextSlice.vue')),
    ImageCaptionSlice: defineAsyncComponent(() => import('@/components/slices/ImageCaptionSlice.vue')),
  },
})
</script>