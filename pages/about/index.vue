<script setup lang="ts">
import transitionConfig from "~/helpers/transitionConfig";

definePageMeta({
  pageTransition: transitionConfig
})
</script>

<template>
  <main>
    <nuxt-link to="/">Home</nuxt-link>
    <h1 class="text-3xl">About</h1>
  </main>


</template>

<style scoped lang="scss">

</style>