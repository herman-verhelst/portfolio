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
  <div class="project__images" :class="{'project__images--small': small, 'project__images--fixed-ar': images[0].aspectRatio || images[0].autoHeight}">
    <div v-for="(image, index) of images" class="project__images-container" :style="{'aspect-ratio': image.aspectRatio, 'width': image.width}">
      <img :data-scrolltrigger="index" :src="`/images/projects/${page}/${image.src}`" :alt="image.alt">
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>