<template>
  <div class='post-part single container'>
    <prismic-rich-text class="textslice" :field="slice.primary.text"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import type { Slice } from '@prismicio/types'

export default defineComponent({
  name: 'quote-slice',
  props: {
    slice: {
      type: Object as PropType<Slice>,
      required: true,
    }
  },
})
</script>