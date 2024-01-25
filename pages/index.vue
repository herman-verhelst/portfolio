<script setup lang="ts">

import transitionConfig from "~/helpers/transitionConfig";
import PixelImage from "~/components/pixel-image.vue";

definePageMeta({
  pageTransition: transitionConfig
})
</script>

<template>

  <section class="home section--first section--padding start-animation">
    <div class="home__section home__section--title" id="title-section">
      <h1 class="title" id="title">
        <span class="start-animation">Denken. </span> <br/>
        <span class="start-animation">Durven. </span> <br/>
        <span class="start-animation">Maken. </span> <br/>
      </h1>

      <div class="home__text">
        <p class="start-animation">
          Durven denken. <br/>
          Een idee. Een boodschap. <br/>
          Materiaal. Kleur. Vorm. <br/>
          Vormentaal.

        </p>
        <p class="start-animation">
          Durven maken. <br/>
          Potlood en papier. <br/>
          Hout.<br/>
          Ambacht en digitaal.
        </p>
        <p class="start-animation">
          Gemaakt om te ontdekken.
        </p>
      </div>
    </div>

    <div class="home__section home__section--pi" id="graphic">
      <pixel-image></pixel-image>
    </div>
  </section>

</template>

<style scoped lang="scss">
@use "assets/styles/pages/home";
</style>