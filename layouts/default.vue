<script lang="ts" setup>

import Cursor from "~/components/cursor.vue";
import PageTransition from "~/components/page-transition.vue";
import Navigation from "~/components/navigation.vue";
</script>

<template>
  <page-transition></page-transition>
  <cursor></cursor>
  <navigation></navigation>

  <main>
    <slot/>
  </main>
</template>

<style>
</style>