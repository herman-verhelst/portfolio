<script lang="ts" setup>

import transitionConfig from "~/helpers/transition-config";
import {useProjectsStore} from "~/stores/projects";
import middleware from "~/helpers/middleware";
import {toCamelCase} from "~/utils/string-utils";

const {t} = useI18n();

const projectsStore = useProjectsStore();
const {findProjectByLink} = projectsStore;

const route = useRoute()

const project = findProjectByLink(route.params.id as string)

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware,
})

if (project) useHead({
  title: `${t(`projects.${toCamelCase(project.link)}.title`)}`
})

</script>

<template>
  <main>
    <div class="page">
      <project-hero :project="project"></project-hero>

      <div class="project__content">
        <template v-for="component of project.components">
          <project-images
              v-if="component.type === 'images'"
              :images="component.images"
              :small="component.small"
              :page="route.params.id">
          </project-images>
          <project-text
              v-if="component.type === 'text'"
              :title="component.title"
              :text="component.text"
              :page="route.params.id">
          </project-text>
          <project-image-full-screen
              v-if="component.type === 'image-full-screen'"
              :image="component.image"
              :page="route.params.id">
          </project-image-full-screen>
        </template>
      </div>

      <project-discover></project-discover>
    </div>

    <footer-comp :footer-color="`footer--bg-${project.id}`"></footer-comp>
  </main>
</template>

<style lang="scss" scoped>

</style>