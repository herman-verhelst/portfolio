<script lang="ts" setup>
import PixelImage from "~/components/pixel-image.vue";
import {usePixelsStore} from "~/stores/pixels";
import {convertRemToPixels} from "~/utils/number-utils";

const pixelsStore = usePixelsStore();

onMounted(() => {

})

function handleDetailChange(value: number) {
  pixelsStore.setDetail(value);
}

function handleResolutionChange(value: number) {
  pixelsStore.setResolution(value);
}

let isHueDragging: boolean = false;
let isSBDragging: boolean = false;
const hue = ref<HTMLDivElement | null>(null)
const huePicker = ref<HTMLDivElement | null>(null)
const sb = ref<HTMLDivElement | null>(null)
const sbPicker = ref<HTMLDivElement | null>(null)

let color = {
  h: 0,
  s: 100,
  b: 100,
}

function startHueDrag(event: MouseEvent) {
  isHueDragging = true;
  onDrag(event);
}

function startSBDrag(event: MouseEvent) {
  isSBDragging = true;
  onDrag(event);
}

function onDrag(event: MouseEvent) {
  if (!huePicker.value || !hue.value || !sb.value || !sbPicker.value) return;

  if (isHueDragging) {
    const hueRect = hue.value.getBoundingClientRect();
    const huePickerRect = huePicker.value.getBoundingClientRect();
    const x = Math.max(huePickerRect.width / 2, Math.min(event.clientX - hueRect.left, hueRect.width - huePickerRect.width / 2 - convertRemToPixels(.25)));
    const percentage = Math.floor(Math.max(0, Math.min((event.clientX - hueRect.left) / hueRect.width * 360, 360)));
    huePicker.value.style.left = `${x - huePickerRect.width / 2}px`;
    color.h = percentage;
    sb.value.style.background =
        `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0%,  hsl(${percentage}, 100%, 50%) 100%)`
    sbPicker.value.style.background = `${convertHSBToRGB(color.h, color.s, color.b)}`

  } else if (isSBDragging) {
    const sbRect = sb.value.getBoundingClientRect();
    const sbPickerRect = sbPicker.value.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - sbRect.left, sbRect.width));
    const y = Math.max(0, Math.min(event.clientY - sbRect.top, sbRect.height));
    color.s = x / sbRect.width * 100
    color.b = 100 - (y / sbRect.height * 100)

    sbPicker.value.style.left = `${x - sbPickerRect.width / 2}px`;
    sbPicker.value.style.top = `${y - sbPickerRect.height / 2}px`;
    sbPicker.value.style.background = `${convertHSBToRGB(color.h, color.s, color.b)}`
  }
}

function stopDrag() {
  isHueDragging = false;
  isSBDragging = false;
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
              <div ref="hue" class="hue" @mousedown="startHueDrag">
                <div ref="huePicker" class="picker"></div>
              </div>
              <div ref="sb" class="saturation-brightness" @mousedown="startSBDrag">
                <div ref="sbPicker" class="picker"></div>
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