<script lang="ts" setup>
import Cursor from "~/components/cursor.vue";
import PageTransition from "~/components/page-transition.vue";
import Navigation from "~/components/navigation.vue";
import {useTransitionComposable} from "~/composables/transition-composable";

const {toggleTransitionComplete} = useTransitionComposable();

onMounted(() => {
  toggleTransitionComplete(true)
})

</script>

<template>
  <page-transition></page-transition>
  <cursor></cursor>
  <navigation></navigation>

  <slot/>

</template>

<style>
</style>