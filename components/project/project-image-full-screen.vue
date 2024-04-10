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
  <img
      data-scrolltrigger
      :alt="image.alt"
      :src="`/images/projects/${page}/${image.src}`"
      :style="image.autoHeight ? {'height': 'auto'} : ''"
      class="project__image-full-screen">
</template>

<style lang="scss" scoped>

</style>