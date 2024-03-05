<script lang="ts" setup>
import PixelImage from "~/components/pixel-image.vue";
import {usePixelsStore} from "~/stores/pixels";

const pixelsStore = usePixelsStore();

onMounted(() => {

})

function handleDetailChange(value: number) {
  pixelsStore.setDetail(value);
}

function handleResolutionChange(value: number) {
  pixelsStore.setResolution(value);
}
</script>

<template>
  <main>
    <div class="page pixels">
      <pixel-image
          :is-full-page="true"
          canvas-id="project"
          class="pixels__canvas"
      ></pixel-image>
      <div class="pixels__controls">
        <div class="pixels__controls__group">
          <h3>Kleur</h3>
          <toggle label="Synchroniseer kleur"></toggle>
          <div class="color__container">
            <div id="foreground"></div>
          </div>
        </div>
        <div class="pixels__controls__group">
          <h3>Pixelinstellingen</h3>
          <slider :initial="2" :max="10" :min="1" label="Detail" @value-change="handleDetailChange"></slider>
          <slider :initial=".3" :max="1" :min="0" label="Resolutie" @value-change="handleResolutionChange"></slider>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "assets/styles/pages/pixels";
</style>