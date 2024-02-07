<script setup lang="ts">
import ProjectTag from "~/components/project-tag.vue";
import {toCamelCase} from "~/utils/string-utils";

defineProps({
  project: {
    required: true
  }
})
</script>

<template>
  <section class="project__hero">
    <img class="project__thumbnail" :src="`/images/projects/${project.link}/${project.thumbnail}`" alt="">
    <div class="project__hero-text">
      <div class="project__title-container">
        <h1 class="project__title">{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h1>
        <div class="project__hero-graphic" :class="`project__hero-graphic--color-${project.id}`"></div>
      </div>
      <p class="project__subtitle" :class="'project__subtitle--color-' + project.id">
        {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>
      <div class="tag__container w-full">
        <project-tag v-for="tag of project?.tags">
          {{ $t(tag.name) }}
        </project-tag>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>