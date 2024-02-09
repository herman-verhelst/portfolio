<script lang="ts" setup>
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
  <img v-scroll-animation :alt="image.alt" :src="`/images/projects/${page}/${image.src}`"
       class="project__image-full-screen">
</template>

<style lang="scss" scoped>

</style>