<script setup lang="ts">
defineProps({
  videos: {
    required: true
  },
  page: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="project__images">
    <div v-for="(video, index) of videos" class="project__images-container">
      <video autoplay loop muted :data-scrolltrigger="index">
        <source :src="`/images/projects/${page}/${video.src}`"/>
      </video>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>