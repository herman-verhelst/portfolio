<script lang="ts" setup>

import transitionConfig from "~/helpers/transition-config";
import PixelImage from "~/components/pixel-image.vue";
import FooterComp from "~/components/footer-comp.vue";
import {useProjectsStore} from "~/stores/projects";

const projectsStore = useProjectsStore();
const {findProjectById} = projectsStore;

const discoverProject1 = findProjectById(1)
const discoverProject2 = findProjectById(1)
const discoverProject3 = findProjectById(1)
const discoverProject4 = findProjectById(1)

definePageMeta({
  pageTransition: transitionConfig
})
</script>

<template>
  <main>
    <div class="home page page--large-top-padding">
      <div class="hero">
        <h1 class="title">
          <span><b>Herman Verhelst</b></span>
          <span><b>Web</b> <i class="proforma">&</i> <b>Information</b> <br/> designer</span>
          <span>{{ $t('home.loves') }} <b>{{ $t('home.wood') }}</b></span>
        </h1>

        <p class="text proforma">
          {{ $t('home.text') }}
        </p>
      </div>

      <pixel-image :number-of-rows="4" canvas-id="homepage" class="pixel-image--home"></pixel-image>
    </div>

    <section class="section">
      <project-home
          :project="discoverProject1"
          thumbnail-grid="1 / span 8"
          text-grid="span 4"
      ></project-home>
    </section>

    <horizontal-scroll id="home">
      <div class="horizontal-scroll__panel">
        <project-home
            class="section"
            :project="discoverProject1"
            thumbnail-grid="1 / span 8"
            text-grid="span 4"
        ></project-home>
      </div>
      <div class="horizontal-scroll__panel">
        <project-home
            class="section"
            :project="discoverProject1"
            thumbnail-grid="1 / span 8"
            text-grid="span 4"
        ></project-home>
      </div>
    </horizontal-scroll>

    <section class="section section--last">
      <project-home
          :project="discoverProject1"
          thumbnail-grid="1 / span 8"
          text-grid="span 4"
      ></project-home>
    </section>
    <footer-comp></footer-comp>
  </main>

</template>

<style lang="scss" scoped>
@use "assets/styles/pages/home";
</style>