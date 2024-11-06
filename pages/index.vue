<script lang="ts" setup>

import transitionConfig from "~/helpers/transition-config";
import PixelImage from "~/components/pixel-image.vue";
import FooterComp from "~/components/footer-comp.vue";
import {useProjectsStore} from "~/stores/projects";
import middleware from "~/helpers/middleware";


const projectsStore = useProjectsStore();
const {findProjectById} = projectsStore;

const discoverProject1 = findProjectById(1)
const discoverProject2 = findProjectById(2)
const discoverProject3 = findProjectById(3)
const discoverProject4 = findProjectById(4)
const discoverProject5 = findProjectById(5)
const discoverProject6 = findProjectById(8)

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware
})

const {t} = useI18n();

useHead({
  title: `${t(`title.index`)}`
})

</script>

<template>
  <main>
    <div class="home__container">
      <div class="home">
        <div class="hero">
          <h1 class="title">
            <span data-startanimation>Herman Verhelst</span>
          </h1>

          <p data-startanimation="2" class="text">
            {{ $t('home.text') }}
          </p>
        </div>
      </div>

      <section class="section section--last project__home-2__container">
        <div class="project__home-2__column">
          <project-home-2
              data-scrolltrigger
              :project="discoverProject1"
              :height="'30rem'"
          ></project-home-2>
          <project-home-2
              data-scrolltrigger
              :project="discoverProject4"
              :height="'30rem'"
          ></project-home-2>
        </div>
        <div class="project__home-2__column">
          <project-home-2
              data-scrolltrigger
              :project="discoverProject2"
              :height="'40rem'"
          ></project-home-2>
          <project-home-2
              data-scrolltrigger
              :project="discoverProject5"
              :height="'25rem'"
          ></project-home-2>
        </div>
        <div class="project__home-2__column">
          <project-home-2
              data-scrolltrigger
              :project="discoverProject3"
              :height="'20rem'"
          ></project-home-2>
          <project-home-2
              data-scrolltrigger
              :project="discoverProject6"
              :height="'30rem'"
          ></project-home-2>
        </div>

      </section>
    </div>


    <footer-comp></footer-comp>
  </main>

</template>

<style lang="scss" scoped>
@use "assets/styles/pages/home";
</style>