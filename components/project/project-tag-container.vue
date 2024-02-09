<script setup lang="ts">
import ProjectTag from "~/components/project/project-tag.vue";

defineProps({
  tags: {
    required: true
  }
})
</script>

<template>
  <div class="tag__container w-full">
    <project-tag v-for="tag of tags">
      {{ $t(tag.name) }}
    </project-tag>
  </div>
</template>

<style scoped lang="scss">

</style>