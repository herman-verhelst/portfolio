<script setup lang="ts">

import PixelImage from "~/components/pixel-image.vue";
import middleware from "~/helpers/middleware";
import transitionConfig from "~/helpers/transition-config";

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware
})
</script>

<template>
  <main>
    <div class="about__container page min-h-lvh m-auto">
      <div class="about">
        <h1 data-startanimation="1" class="about__title title">
          {{ $t('about.title') }}
        </h1>
        <div data-startanimation="2" class="about__text">
          <p>{{ $t('about.paragraph1') }}</p>
          <p>{{ $t('about.paragraph2') }}</p>
          <p>{{ $t('about.paragraph3') }}</p>
          <p>{{ $t('about.paragraph4') }}</p>
        </div>
      </div>

    </div>


    <footer-comp></footer-comp>
  </main>
</template>

<style scoped lang="scss">
@use "assets/styles/pages/about";
</style>