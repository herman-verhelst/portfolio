<script setup lang="ts">
import {toCamelCase} from "~/utils/string-utils";

defineProps({
  project: {
    required: true
  }
})
</script>

<template>
  <section class="project__hero">
    <img data-startanimation class="project__thumbnail" :src="`/images/projects/${project.link}/${project.thumbnail}`" alt="">
    <div class="project__hero-text">
      <div data-startanimation="2" class="project__title-container">
        <h1 class="project__title">{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h1>
        <div class="project__hero-graphic" :class="`project__hero-graphic--color-${project.id}`"></div>
      </div>
      <p data-startanimation="3" class="project__subtitle" :class="'project__subtitle--color-' + project.id">
        {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>
      <project-tag-container data-startanimation="4" :tags="project.tags"></project-tag-container>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>