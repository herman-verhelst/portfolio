<script setup lang="ts">
import ProjectTag from "~/components/project-tag.vue";

defineProps({
  project: {
    required: true
  }
})
</script>

<template>
<div>
  <img :src="project.thumbnail" alt="">
  <h1 class="project__title">{{$t(project.title)}}</h1>
  <p class="project__subtitle">{{$t(project.subtitle)}}</p>
  <div class="tag__container w-full">
    <project-tag v-for="tag of project?.tags">
      {{ $t(tag.name) }}
    </project-tag>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>