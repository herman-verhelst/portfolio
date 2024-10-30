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
    <h2 class="font-light" data-scrolltrigger="0">{{$t('projects.other1')}}
      <nuxt-link class="project__discover__link" v-cursor :to="localePath('/projects')">{{$t('projects.other2')}}</nuxt-link>
    </h2>

    <div class="project__discover-projects">
      <project-home2 data-scrolltrigger="1" :project="discoverProject1"></project-home2>
      <project-home2 data-scrolltrigger="2" :project="discoverProject2"></project-home2>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>