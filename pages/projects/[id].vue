<script lang="ts" setup>

import transitionConfig from "~/helpers/transition-config";
import {useProjectsStore} from "~/stores/projects";
import middleware from "~/helpers/middleware";
import {toCamelCase} from "~/utils/string-utils";
import ProjectContent from "~/components/project/project-content.vue";

const {t} = useI18n();

const projectsStore = useProjectsStore();
const {findProjectByLink} = projectsStore;

const route = useRoute()
console.log(route.params)


const project = findProjectByLink(route.params.id as string)

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware,
})

if (project) useHead({
  title: `Herman Verhelst | ${t(`projects.${toCamelCase(project.link)}.title`)}`
})

</script>

<template>
  <main>
    <div class="page">
      <project-hero :project="project"></project-hero>
      <project-content :project="project"></project-content>
      <project-discover :current-project="project"></project-discover>
    </div>

    <footer-comp :footer-color="`footer--bg-${project.id}`"></footer-comp>
  </main>
</template>

<style lang="scss" scoped>

</style>