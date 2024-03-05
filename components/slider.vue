<script lang="ts" setup>
import type {Ref} from "vue";
import {mapNumber} from "~/utils/number-utils";
import { v4 as uuid } from 'uuid';

const props = defineProps({
  label: {
    type: String
  },
  initial: {
    type: Number,
    default: .5
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  step: {
    type: Number,
    default: .01
  }
})

const emit = defineEmits<{
  (e: 'valueChange', value: number): void
}>()

let id: Ref<string> = ref(uuid())
let value: Ref<number> = ref(props.initial);
const percentage = mapNumber(value.value, 0, 1, props.min, props.max) * 100;
let background: Ref<string> = ref(`linear-gradient(to right, #151413FF, #151413FF ${percentage}%, #D6CDC6FF ${percentage}%)`);

function valueChange() {
  const percentage = mapNumber(value.value, 0, 1, props.min, props.max) * 100;
  background.value = `linear-gradient(to right, #151413FF, #151413FF ${percentage}%, #D6CDC6FF ${percentage}%)`
  emit('valueChange', value.value)
}
</script>

<template>
  <label class="slider" :for="id">
    <span v-if="label">{{ label }}</span>
    <input
        :id="id"
        v-model="value"
        v-cursor
        :max="max" :min="min" :step="step"
        :style="{'background': background}"
        type="range"
        @input="valueChange">
  </label>
</template>

<style lang="scss" scoped>

</style>