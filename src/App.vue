<template>
  <div>
    <router-view/>
    <footer-prismic/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FooterPrismic from '@/components/FooterPrismic.vue'

export default defineComponent({
  name: 'app',
  components: {
    FooterPrismic
  }
})
</script>

<style>
@import "./assets/css/resetr.css";
@import "./assets/css/common.css";
</style>