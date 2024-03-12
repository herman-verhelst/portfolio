<script setup lang="ts">
import {convertRemToPixels} from "~/utils/number-utils";
import {usePixelsStore} from "~/stores/pixels";
import {storeToRefs} from "pinia";

const pixelsStore = usePixelsStore();
const {sync} = storeToRefs(pixelsStore)

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  initialH: {
    type: Number,
    default: 0
  },
  initialS: {
    type: Number,
    default: .02
  },
  initialB: {
    type: Number,
    default: .97
  },
})

onMounted(() => {
  document.addEventListener('mousemove', (e: MouseEvent) => onDrag(e));
  document.addEventListener('mouseup', () => stopDrag());
  if (sb.value && sbPicker.value) {
    sb.value.style.background =
        `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0%,  hsl(${pixelC.h}, 100%, 50%) 100%)`
    sbPicker.value.style.background = `${convertHSBToRGB(pixelC.h, pixelC.s, pixelC.b)}`
  }
})

let isHueDragging: boolean = false;
let isSBDragging: boolean = false;
const hue = ref<HTMLDivElement | null>(null)
const huePicker = ref<HTMLDivElement | null>(null)
const sb = ref<HTMLDivElement | null>(null)
const sbPicker = ref<HTMLDivElement | null>(null)

let pixelC = {
  h: props.initialH,
  s: props.initialS * 100,
  b: props.initialB * 100,
}

watch(() => pixelsStore.sync, (value) => {
  pixelC.h = pixelsStore.syncHue;
  if (sb.value && sbPicker.value) {
    sb.value.style.background =
        `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0%,  hsl(${pixelC.h}, 100%, 50%) 100%)`
    sbPicker.value.style.background = `${convertHSBToRGB(pixelC.h, pixelC.s, pixelC.b)}`
  }
})

watch(() => pixelsStore.syncHue, (value) => {
  if (!sb.value || !sbPicker.value) return;

  pixelC.h = value;
  sb.value.style.background =
      `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0%,  hsl(${value}, 100%, 50%) 100%)`
  sbPicker.value.style.background = `${convertHSBToRGB(pixelC.h, pixelC.s, pixelC.b)}`

  if (props.type === 'pixelColor') pixelsStore.setPixelColor(pixelC);
  else if (props.type === 'backgroundColor') pixelsStore.setBackgroundColor(pixelC);

})

function startHueDrag(event: MouseEvent) {
  isHueDragging = true;
  onDrag(event);
}

function startSBDrag(event: MouseEvent) {
  isSBDragging = true;
  onDrag(event);
}

function onDrag(event: MouseEvent) {

  if (sync.value && isHueDragging && huePicker.value && hue.value) {
    const hueRect = hue.value.getBoundingClientRect();
    const huePickerRect = huePicker.value.getBoundingClientRect();
    const x = Math.max(huePickerRect.width / 2, Math.min(event.clientX - hueRect.left, hueRect.width - huePickerRect.width / 2 - convertRemToPixels(.25)));
    const percentage = Math.floor(Math.max(0, Math.min((event.clientX - hueRect.left) / hueRect.width * 360, 360)));
    huePicker.value.style.left = `${x - huePickerRect.width / 2}px`;
    pixelC.h = percentage;

    pixelsStore.setSyncHue(pixelC.h);
    return;
  }

  if (!sb.value || !sbPicker.value) return;

  if (isHueDragging) {
    if (!huePicker.value || !hue.value) return;

    const hueRect = hue.value.getBoundingClientRect();
    const huePickerRect = huePicker.value.getBoundingClientRect();
    const x = Math.max(huePickerRect.width / 2, Math.min(event.clientX - hueRect.left, hueRect.width - huePickerRect.width / 2 - convertRemToPixels(.25)));
    const percentage = Math.floor(Math.max(0, Math.min((event.clientX - hueRect.left) / hueRect.width * 360, 360)));
    huePicker.value.style.left = `${x - huePickerRect.width / 2}px`;
    pixelC.h = percentage;
    sb.value.style.background =
        `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0%,  hsl(${percentage}, 100%, 50%) 100%)`

    if (props.type === 'pixelColor') pixelsStore.setPixelColor(pixelC);
    else if (props.type === 'backgroundColor') pixelsStore.setBackgroundColor(pixelC);

    sbPicker.value.style.background = `${convertHSBToRGB(pixelC.h, pixelC.s, pixelC.b)}`

  } else if (isSBDragging) {
    const sbRect = sb.value.getBoundingClientRect();
    const sbPickerRect = sbPicker.value.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - sbRect.left, sbRect.width));
    const y = Math.max(0, Math.min(event.clientY - sbRect.top, sbRect.height));
    pixelC.s = x / sbRect.width * 100
    pixelC.b = 100 - (y / sbRect.height * 100)

    sbPicker.value.style.left = `${x - sbPickerRect.width / 2}px`;
    sbPicker.value.style.top = `${y - sbPickerRect.height / 2}px`;

    if (props.type === 'pixelColor') pixelsStore.setPixelColor(pixelC);
    else if (props.type === 'backgroundColor') pixelsStore.setBackgroundColor(pixelC);

    sbPicker.value.style.background = `${convertHSBToRGB(pixelC.h, pixelC.s, pixelC.b)}`
  }
}

function stopDrag() {
  isHueDragging = false;
  isSBDragging = false;
}
</script>

<template>
  <div class="color-picker">
    <div v-if="(!sync && type !== 'sync') || (type === 'sync' && sync)" ref="hue" class="hue" @mousedown="startHueDrag">
      <div :style="{left: `${initialH / 3.60}%`}" ref="huePicker" class="picker"></div>
    </div>
    <div v-if="type !== 'sync'" ref="sb" class="saturation-brightness" @mousedown="startSBDrag">
      <div :style="{top: `calc(${100 - initialB * 100}% - .5rem)`, left: `calc(${initialS * 100}% - .5rem)`}" ref="sbPicker" class="picker"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>