<script setup lang="ts">
defineProps({
  project: {
    required: true
  },
})

</script>

<template>
  <div class="project__content">
    <template v-for="component of project.components">
      <project-images
          v-if="component.type === 'images'"
          :images="component.images"
          :small="component.small"
          :page="project.link">
      </project-images>
      <project-text
          v-if="component.type === 'text'"
          :title="component.title"
          :text="component.text"
          :page="project.link"
          :full-width="component.fullWidth">
      </project-text>
      <project-image-full-screen
          v-if="component.type === 'image-full-screen'"
          :image="component.image"
          :page="project.link">
      </project-image-full-screen>
      <project-link
          v-if="component.type === 'link'"
          :image="component.image"
          :link="component.link"
          :project-id="project.id"
          :page="project.link">
      </project-link>
      <project-shop
          v-if="component.type === 'shop'"
          :page="project.link"
          :products="component.products"
          :project-id="project.id">
      </project-shop>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>