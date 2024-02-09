<script setup lang="ts">
import transitionConfig from "~/helpers/transition-config";
import FooterComp from "~/components/footer-comp.vue";
import {useProjectsStore} from "~/stores/projects";
import {storeToRefs} from "pinia";

const projectsStore = useProjectsStore()
const projects = storeToRefs(projectsStore).projects

definePageMeta({
  pageTransition: transitionConfig
})
</script>

<template>
  <main>
    <div class="page page--large-top-padding">
      <h1 class="title">
        {{ $t('projects.title1') }}<br/>
        <b>{{ $t('projects.title2') }}</b>.
      </h1>
      <ul>
        <li v-for="project of projects">
          <project-overview-card :project="project"></project-overview-card>
        </li>
      </ul>
    </div>

    <footer-comp></footer-comp>
  </main>
</template>

<style scoped lang="scss">

</style>