<script lang="ts" setup>
import {useLocalePath} from "#i18n";
import {useProjectsStore} from "~/stores/projects";

const localePath = useLocalePath();

const projectsStore = useProjectsStore();
const {findProjectById} = projectsStore;

const discoverProject1 = findProjectById(1)
const discoverProject2 = findProjectById(1)

</script>

<template>
  <section class="project__discover">
    <h2>Ontdek zeker ook <br/>
      <nuxt-link :to="localePath('/projects')">mijn andere projecten.</nuxt-link>
    </h2>

    <div class="project__discover-projects">
      <project-card :project="discoverProject1"></project-card>
      <project-card :project="discoverProject2"></project-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>