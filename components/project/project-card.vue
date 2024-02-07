<script setup lang="ts">
import {useLocalePath} from "#i18n";

const localePath = useLocalePath();

defineProps({
  project: {
    required: true
  },
})

</script>

<template>
  <nuxt-link v-if="project" :to="localePath(`/projects/${project.link}`)" class="project__discover-card">
    <img :src="`/images/projects/${project.link}/${project.thumbnail}`" alt="">
    <div class="project__discover-text">
      <p>{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</p>
      <button class="button button--icon-small" :class="`button--color-${project?.id}`">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
          <path
              d="M5.3335 17.1667H23.8668L19.7335 20.9667L20.6668 21.9667L26.5335 16.5L20.6668 11.0333L19.7335 12.0333L23.8668 15.8333H5.3335V17.1667Z"
              fill="#F6F2EF"/>
        </svg>
      </button>
    </div>
  </nuxt-link>
</template>

<style scoped lang="scss">

</style>