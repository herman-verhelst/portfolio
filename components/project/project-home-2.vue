<script setup lang="ts">
import {useLocalePath} from "#i18n";
import {toCamelCase} from "~/utils/string-utils";

const localePath = useLocalePath();

defineProps({
  project: {
    required: true
  },
  height: {
    default: '20rem'
  }
})
</script>

<template>
  <nuxt-link
      v-cursor
      :to="localePath(`/projects/${project.link}?id=${project.id}`)" v-if="project"
      class="project__home-2"
      :style="{height: height}"
  >
    <div class="project__home-2__img">
      <img :src="`/images/projects/${project.link}/${project.thumbnail}`" alt="">
    </div>
    <div class="project__home-2__info">
      <div class="project__home-2__text-container">
        <h2>{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h2>
        <h2 class="project__home-2__text-shadow">{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h2>
      </div>
      <div class="project__home-2__text-container">
        <p> {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>
        <p class="project__home-2__text-shadow"> {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>
      </div>
    </div>

  </nuxt-link>
</template>

<style scoped lang="scss">

</style>