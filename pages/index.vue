<script setup lang="ts">

import transitionConfig from "~/helpers/transitionConfig";
import PixelImage from "~/components/pixel-image.vue";
import FooterComp from "~/components/footer-comp.vue";

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
          <span>{{$t('home.loves')}} <b>{{$t('home.wood')}}</b></span>
        </h1>

        <p class="text proforma">
          {{$t('home.text')}}
        </p>
      </div>

      <pixel-image></pixel-image>
    </div>

    <footer-comp></footer-comp>
  </main>

</template>

<style scoped lang="scss">
@use "assets/styles/pages/home";
</style>