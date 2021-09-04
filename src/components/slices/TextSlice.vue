<template>
  <div class='post-part single container'>
    <prismic-rich-text class="textslice" :field="slice.primary.text"/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'text-slice',
  props: {
    slice: Object,
  },
}
</script>