<script lang="ts" setup>
import type {Ref} from "vue";
import {v4 as uuid} from "uuid";

const props = defineProps({
  label: {
    type: String
  },
  initial: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits<{
  (e: 'valueChange', value: boolean): void
}>()

let id: Ref<string> = ref(uuid())
let value: Ref<boolean> = ref(props.initial);

function valueChange() {
  emit('valueChange', value.value)
}
</script>

<template>
  <label v-cursor :for="id" class="switch">
    <input :id="id"
           type="checkbox"
           v-model="value"
           @change="valueChange">
    <span class="toggle"></span>
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>

</style>