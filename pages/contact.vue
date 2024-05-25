<script setup lang="ts">
import transitionConfig from "~/helpers/transition-config";
import middleware from "~/helpers/middleware";
import PixelImage from "~/components/pixel-image.vue";

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware
})

const {t} = useI18n();

useHead({
  title: `${t(`title.contact`)}`
})
</script>

<template>
  <main>
    <div class="contact page page--large-top-padding min-h-lvh">
      <h1 class="contact__title title">
        <span data-startanimation="0" class="mb-2">{{ $t('contact.title1') }}<br/></span>
        <span data-startanimation="1">{{ $t('contact.title2') }}<br/></span>
        <b data-startanimation="2"><a v-cursor class="mt-6 inline-block project__discover__link" href="mailto:mail@herman-verhelst.be">mail@herman-verhelst.be</a></b>
      </h1>

      <pixel-image data-startanimation="3" :number-of-rows="6" canvas-id="contact" class="contact__pixel-image"></pixel-image>
    </div>

    <footer-comp></footer-comp>
  </main>
</template>

<style lang="scss" scoped>
@use "assets/styles/pages/contact";
</style>