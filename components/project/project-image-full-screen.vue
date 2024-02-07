<script setup lang="ts">
defineProps({
  image: {
    required: true
  },
  page: {
    type: String,
    required: true
  }
})
</script>

<template>
  <img class="project__image-full-screen" :src="`/images/projects/${page}/${image.src}`" :alt="image.alt">
</template>

<style scoped lang="scss">

</style>