<script setup lang="ts">
import {useLocalePath} from "#i18n";
import {toCamelCase} from "~/utils/string-utils";

const localePath = useLocalePath();

defineProps({
  project: {
    required: true
  },
  thumbnailGrid: {
    default: '1 / span 8'
  },
  textGrid: {
    default: 'span 4'
  }
})
</script>

<template>
  <nuxt-link v-if="project" :to="localePath(`/projects/${project.link}`)" class="project__home">
    <img :style="{gridColumn: thumbnailGrid}" :src="`/images/projects/${project.link}/${project.thumbnail}`" alt="">
    <div :style="{gridColumn: textGrid}" class="project__home__text">
      <div class="project__home__title">
        <h2>{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h2>
        <button class="button button--icon-small" :class="`button--color-${project?.id}`">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
            <path
                d="M5.3335 17.1667H23.8668L19.7335 20.9667L20.6668 21.9667L26.5335 16.5L20.6668 11.0333L19.7335 12.0333L23.8668 15.8333H5.3335V17.1667Z"
                fill="#F6F2EF"/>
          </svg>
        </button>
      </div>
      <p class="proforma">
        {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>

      <project-tag-container class="mt-8" :tags="project.tags"></project-tag-container>

    </div>

  </nuxt-link>
</template>

<style scoped lang="scss">

</style>