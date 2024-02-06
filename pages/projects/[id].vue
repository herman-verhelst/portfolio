<script setup lang="ts">

import transitionConfig from "~/helpers/transitionConfig";
import {useProjectsStore} from "~/stores/projects";


const projectsStore = useProjectsStore();
const {filterProjects} = projectsStore;

const route = useRoute()

const project = filterProjects(route.params.id as string)
console.log(project)

definePageMeta({
  pageTransition: transitionConfig
})
</script>

<template>
  <main>
    <div class="page">
      <project-hero :project="project"></project-hero>
    </div>

    <footer-comp></footer-comp>
  </main>
</template>

<style scoped lang="scss">

</style>