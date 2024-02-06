<script setup lang="ts">
import ProjectTag from "~/components/project-tag.vue";
import {useLocalePath} from "#i18n";

const localePath = useLocalePath();

defineProps({
  project: {
    required: true
  }
})
</script>

<template>
  <nuxt-link :to="localePath(`/projects/${project.link}`)" class="project-card">
    <div class="w-full">
      <h2 class="project-card__title">{{ $t(project.title) }}</h2>
      <p class="project-card__subtitle proforma">{{ $t(project.subtitle) }}</p>
    </div>
    <div class="tag__container w-full">
      <project-tag v-for="tag of project?.tags">
        {{ $t(tag.name) }}
      </project-tag>
    </div>
    <button class="button button--icon" :class="`button--color-${project?.id}`">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <path
            d="M5.3335 17.1667H23.8668L19.7335 20.9667L20.6668 21.9667L26.5335 16.5L20.6668 11.0333L19.7335 12.0333L23.8668 15.8333H5.3335V17.1667Z"
            fill="#F6F2EF"/>
      </svg>

    </button>
  </nuxt-link>
</template>

<style scoped lang="scss">

</style>