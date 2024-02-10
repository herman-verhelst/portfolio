<script setup lang="ts">
import {toCamelCase} from "../../.nuxt/imports";

defineProps({
  text: {
    type: String,
    required: true
  },
  title: {
    required: true
  },
  page: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="project__text">
    <div>
      <h2 data-scrolltrigger v-if="title">{{ $t(`projects.${toCamelCase(page)}.titles.${title}`) }}</h2>
      <p data-scrolltrigger class="proforma">{{ $t(`projects.${toCamelCase(page)}.text.${text}`) }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>