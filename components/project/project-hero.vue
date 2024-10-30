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
    <div class="project__hero-info">
      <div class="project__hero-info__text">
        <div>
          <h1 data-startanimation="2" class="project__title">{{
              $t(`projects.${toCamelCase(project.link)}.title`)
            }}</h1>
          <p data-startanimation="3" class="project__subtitle" :class="'project__subtitle--color-' + project.id">
            {{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}
          </p>
        </div>
        <div>
          <p data-startanimation="4" class="project__hero-text">
            {{ $t(`projects.${toCamelCase(project.link)}.heroText`) }}
          </p>
        </div>
      </div>
    </div>
    <img
        data-startanimation
        class="project__thumbnail"
        :src="`/images/projects/${project.link}/${project.thumbnail}`"
        alt="">
    <project-tag-container data-startanimation="5" :tags="project.tags"></project-tag-container>

  </section>
</template>

<style scoped lang="scss">

</style>