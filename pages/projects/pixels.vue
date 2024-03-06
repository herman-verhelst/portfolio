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

let isDragging: boolean = false;
const hue = ref<HTMLDivElement | null>(null)
const huePicker = ref<HTMLDivElement | null>(null)
let hueStartingPosition = {left: 0}

function startDrag(event: MouseEvent) {
  if (!hue.value) return;

  isDragging = true;
  const rect = hue.value?.getBoundingClientRect();
  hueStartingPosition = {
    left: event.clientY - rect.top,
  };
}

function onDrag(event: MouseEvent) {
  if (!isDragging || !huePicker.value || !hue.value) return;

  const rect = hue.value.getBoundingClientRect();
  const x = Math.max(0.1, Math.min(event.clientX - rect.left, rect.width - .1));
  const y = 0; // Lock the y-axis movement
  huePicker.value.style.left = `${x - hueStartingPosition.left}px`;

}

function stopDrag() {
  isDragging = false;
}
</script>

<template>
  <main @mousemove="onDrag" @mouseup="stopDrag">
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
            <div class="color-picker">
              <div ref="hue" class="hue" @mousedown="startDrag">
                <div ref="huePicker" class="picker"></div>
              </div>
              <div class="value-brightness">
                <div class="picker"></div>
              </div>
            </div>
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