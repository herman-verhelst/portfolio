<script lang="ts" setup>
import {useLocalePath} from "#i18n";
import {useProjectsStore} from "~/stores/projects";

const localePath = useLocalePath();

const projectsStore = useProjectsStore();
const {findProjectById} = projectsStore;

const props = defineProps({
  currentProject: {
    required: true,
  },
})

const project: any = props.currentProject;
let discoverProject1, discoverProject2;
if (project.id !== 1 && project.id !== 2) {
  discoverProject1 = findProjectById(1)
  discoverProject2 = findProjectById(2)
} else if (project.id === 1) {
  discoverProject1 = findProjectById(2)
  discoverProject2 = findProjectById(3)
} else {
  discoverProject1 = findProjectById(1)
  discoverProject2 = findProjectById(3)
}

</script>

<template>
  <section class="project__discover">
    <h2>Ontdek zeker ook <br/>
      <nuxt-link v-cursor :to="localePath('/projects')">mijn andere projecten.</nuxt-link>
    </h2>

    <div class="project__discover-projects">
      <project-card data-scrolltrigger="0" :project="discoverProject1"></project-card>
      <project-card data-scrolltrigger="1" :project="discoverProject2"></project-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>