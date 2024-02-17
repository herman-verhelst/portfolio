<script setup lang="ts">
import transitionConfig from "~/helpers/transition-config";
import FooterComp from "~/components/footer-comp.vue";
import {useProjectsStore} from "~/stores/projects";
import {storeToRefs} from "pinia";
import gsap from "gsap";
import middleware from "~/helpers/middleware";

const projectsStore = useProjectsStore()
const projects = storeToRefs(projectsStore).projects

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware
})

onMounted(() => {
  const projectList = document.getElementById(`projects`)

  projectList?.addEventListener('mouseleave', () => {
    gsap.set('#cursor-t1', {
      backgroundImage: '',
      backgroundSize: 'cover',
      mixBlendMode: 'difference'

    })
    gsap.to('#cursor-t1', {
      width: '20px',
      borderRadius: '999px',
      duration: .2,
    })
  })

})

const {t} = useI18n();

useHead({
  title: `${t(`title.projects`)}`
})

</script>

<template>
  <main>
    <div class="page page--large-top-padding min-h-lvh">
      <h1 data-startanimation="0" class="title">
        {{ $t('projects.title1') }}<br/>
        <b>{{ $t('projects.title2') }}</b>.
      </h1>
      <ul id="projects">
        <li :data-startanimation="index" v-for="(project, index) of projects">
          <project-overview-card :project="project"></project-overview-card>
        </li>
      </ul>
    </div>

    <footer-comp></footer-comp>
  </main>
</template>

<style scoped lang="scss">

</style>