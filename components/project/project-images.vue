<script setup lang="ts">
defineProps({
  images: {
    required: true
  },
  small: {
    type: Boolean,
    required: true
  },
  page: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="project__images" :class="{'project__images--small': small}">
    <div v-for="(image, index) of images" class="project__images-container">
      <img :data-scrolltrigger="index" :src="`/images/projects/${page}/${image.src}`" :alt="image.alt">
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>