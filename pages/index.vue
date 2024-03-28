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
    <div class="home">
      <div class="hero">
        <h1 class="title">
          <span data-startanimation>Herman Verhelst</span>
          <span data-startanimation>{{ $t('home.designer') }}</span>
          <span data-startanimation="1"><b>Web</b> <i class="proforma">&</i> <b>{{ $t('home.information') }}</b></span>
          <span data-startanimation="2"><b>{{ $t('home.wood') }}</b></span>
        </h1>

        <p data-startanimation="3" class="text proforma">
          {{ $t('home.text') }}
        </p>
      </div>

      <pixel-image data-startanimation="4" :number-of-rows="4" canvas-id="homepage" class="pixel-image--home"></pixel-image>
    </div>

    <section class="section">
      <project-home
          data-scrolltrigger
          :project="discoverProject1"
          thumbnail-grid="1 / span 8"
          text-grid="span 4"
      ></project-home>
    </section>

    <horizontal-scroll :width="1.5" id="home" class="mb-16">
      <div :id="`hs-home`" class="horizontal-scroll__container">
        <div class="horizontal-scroll__panel w-[150vw] !pt-32">
          <project-home
              class="col-span-7 row-span-3"
              :project="discoverProject2"
              thumbnail-grid="1 / span 8"
              text-grid="span 4"
          ></project-home>

          <project-home
              class="col-span-7 col-start-6 row-span-2 row-start-4"
              :project="discoverProject3"
              thumbnail-grid="5 / span 8"
              text-grid="1 / span 4"
          ></project-home>


        </div>
      </div>
    </horizontal-scroll>

    <section class="section section--last">
      <project-home
          data-scrolltrigger
          :project="discoverProject4"
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