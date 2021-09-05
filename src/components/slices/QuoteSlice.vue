<template>
  <div class='post-part single container'>
    <blockquote class="block-quotation">
      {{ quote }}
    </blockquote>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { RichTextField, Slice } from '@prismicio/types'
import { usePrismic } from '@prismicio/vue'

export default defineComponent({
  name: 'quote-slice',
  props: {
    slice: {
      type: Object as PropType<Slice>,
      required: true,
    }
  },
  setup(props) {
    const { asText } = usePrismic()
    return {
      quote: asText(props.slice.primary.quote as RichTextField)
    }
  }
})
</script>

<style scoped>
.block-quotation {
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 24px;
}
.block-quotation:before {
  content: "« "
}
.block-quotation:after {
  content: " »"
}
.block-citation {
  display: inline-block;
  font-style: italic;
  border-left: solid #B4B4B4 4px;
  padding-left: 10px;
}
@media screen and (min-width: 975px) {
  .block-quotation {
    width: 130%;
    margin: 0 -15% 2rem -15%;
    font-size: 30px;
    padding: 0;
  }
  .block-citation {
    margin: 20px 0;
  }
}
</style>