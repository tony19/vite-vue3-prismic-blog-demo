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
import { defineComponent, PropType } from '@vue/composition-api'
import type { Slice } from '@prismicio/types'

export default defineComponent({
  name: 'slices-block',
  props: {
    slices: {
      type: Array as PropType<Slice[]>,
      required: true,
    },
  },
  components: {
    QuoteSlice: () => import('@/components/slices/QuoteSlice.vue'),
    TextSlice: () => import('@/components/slices/TextSlice.vue'),
    ImageCaptionSlice: () => import('@/components/slices/ImageCaptionSlice.vue'),
  },
})
</script>