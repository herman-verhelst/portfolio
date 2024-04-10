<script lang="ts" setup>
defineProps({
  image: {
    required: true
  },
  link: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  },
  projectId: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <a v-cursor
     :href="link"
     class="project__discover-card project__discover-card--full-height"
     data-scrolltrigger
     target="_blank">
    <div class="project__discover-text">
      <p class="project__discover__link">{{ $t('projects.link') }}</p>
      <button :class="`button--color-${projectId}`" class="button button--icon-small">
        <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M5.3335 17.1667H23.8668L19.7335 20.9667L20.6668 21.9667L26.5335 16.5L20.6668 11.0333L19.7335 12.0333L23.8668 15.8333H5.3335V17.1667Z"
              fill="#F6F2EF"/>
        </svg>
      </button>
    </div>

    <div class="project__discover-img-container">
      <img
          :alt="image.alt"
          :src="`/images/projects/${page}/${image.src}`"
          class="project__discover-img">
    </div>
  </a>

</template>

<style lang="scss" scoped>

</style>