<script lang="ts" setup>
import type {Ref} from "vue";
import {v4 as uuid} from "uuid";

const props = defineProps({
  label: {
    type: String
  },
  initial: {
    type: Number,
    default: .5
  },
});

const emit = defineEmits<{
  (e: 'valueChange', value: number): void
}>()

let id: Ref<string> = ref(uuid())
let value: Ref<number> = ref(props.initial);

function valueChange() {
  emit('valueChange', value.value)
}
</script>

<template>
  <label v-cursor :for="id" class="switch">
    <input :id="id"
           type="checkbox"
           @input="valueChange">
    <span class="toggle"></span>
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>

</style>