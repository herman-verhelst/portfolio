<script setup lang="ts">
import transitionConfig from "~/helpers/transitionConfig";
import FooterComp from "~/components/footer-comp.vue";
import {Project} from "~/utils/models/project";

const projects: Project[] = [
  new Project(
      1,
      'projects.woodenBoxes.title',
      'projects.woodenBoxes.subtitle',
      [{name: 'tags.mind'}, {name: 'tags.wood'}, {name: 'tags.dataVis'}],
      'wooden-boxes'
  ),
  new Project(
      2,
      'projects.woodenBoxes.title',
      'projects.woodenBoxes.subtitle',
      [{name: 'tags.mind'}, {name: 'tags.wood'}, {name: 'tags.dataVis'}],
      'wooden-boxes'
  )
]

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