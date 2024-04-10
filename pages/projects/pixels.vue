<script lang="ts" setup>
import PixelImage from "~/components/pixel-image.vue";
import {usePixelsStore} from "~/stores/pixels";
import type {Ref} from "vue";
import {useProjectsStore} from "~/stores/projects";
import transitionConfig from "~/helpers/transition-config";
import middleware from "~/helpers/middleware";
import {toCamelCase} from "~/utils/string-utils";
import ProjectContent from "~/components/project/project-content.vue";

const pixelsStore = usePixelsStore();

const pixelColor: Ref<String> = ref('#151413');
const backgroundColor: Ref<String> = ref('');
const pixelColorOpen: Ref<Boolean> = ref(true);
const backgroundColorOpen: Ref<Boolean> = ref(true);

const {t} = useI18n();

const projectsStore = useProjectsStore();
const {findProjectByLink} = projectsStore;

const project = findProjectByLink('pixels')
console.log(project)
if (project) useHead({
  title: `Herman Verhelst | ${t(`projects.${toCamelCase(project.link)}.title`)}`
})

definePageMeta({
  pageTransition: transitionConfig,
  middleware: middleware,
})

function handleDetailChange(value: number) {
  pixelsStore.setDetail(value);
}

function handleResolutionChange(value: number) {
  pixelsStore.setResolution(value);
}

function toggleOpen(block: string) {
  if (block === 'pixel') pixelColorOpen.value = !pixelColorOpen.value
  else backgroundColorOpen.value = !backgroundColorOpen.value
}

function syncColors(value: boolean) {
  pixelsStore.setSync(value);
}

watch(() => pixelsStore.pixelColor, (value) => {
  pixelColor.value = value;
})

watch(() => pixelsStore.backgroundColor, (value) => {
  backgroundColor.value = value;
})

</script>

<template>
  <main>
    <div class="page">
      <div class="pixels">
        <pixel-image
            :is-full-page="true"
            canvas-id="project"
            class="pixels__canvas"
        ></pixel-image>
        <div class="pixels__controls">
          <div class="pixels__controls__group">
            <h3>{{ $t('projects.pixels.color') }}</h3>
            <toggle label="projects.pixels.sync" @value-change="syncColors"></toggle>
            <color-picker type="sync"></color-picker>

            <div class="color__container">
              <div :aria-expanded="pixelColorOpen" class="color-picker__container">
                <div class="color-picker__label">
                  <label>{{ $t('projects.pixels.pixels') }}</label>
                  <button :style="{backgroundColor: pixelColor}" class="button button--icon-small"
                          @click="toggleOpen('pixel')">
                    <svg viewBox="0 0 48 48">
                      <path
                          d="m30.23,19.65l-6.23,6.23-6.23-6.23c-.2-.2-.51-.2-.71,0l-.71.71c-.2.2-.2.51,0,.71l7.29,7.29c.2.2.51.2.71,0l7.29-7.29c.2-.2.2-.51,0-.71l-.71-.71c-.2-.2-.51-.2-.71,0Z"/>
                    </svg>
                  </button>
                </div>
                <color-picker :initial-b=".1" :initial-h="30" :initial-s=".08" type="pixelColor"></color-picker>
              </div>
              <div :aria-expanded="backgroundColorOpen" class="color-picker__container">
                <div class="color-picker__label">
                  <label>{{ $t('projects.pixels.background') }}</label>
                  <button :style="{backgroundColor: backgroundColor}" class="button button--icon-small"
                          @click="toggleOpen('background')">
                    <svg viewBox="0 0 48 48">
                      <path
                          d="m30.23,19.65l-6.23,6.23-6.23-6.23c-.2-.2-.51-.2-.71,0l-.71.71c-.2.2-.2.51,0,.71l7.29,7.29c.2.2.51.2.71,0l7.29-7.29c.2-.2.2-.51,0-.71l-.71-.71c-.2-.2-.51-.2-.71,0Z"/>
                    </svg>
                  </button>
                </div>
                <color-picker type="backgroundColor"></color-picker>
              </div>
            </div>
          </div>
          <div class="pixels__controls__group">
            <h3>{{ $t('projects.pixels.settings') }}</h3>
            <slider :initial="0" :max="10" :min="1" label="projects.pixels.detail" @value-change="handleDetailChange"></slider>
            <slider :initial=".1" :max="1" :min="0" label="projects.pixels.resolution" @value-change="handleResolutionChange"></slider>
          </div>
        </div>
      </div>
      <project-hero :project="project"></project-hero>
      <project-content :project="project"></project-content>
      <project-discover :current-project="project"></project-discover>
    </div>

    <footer-comp :footer-color="`footer--bg-${project.id}`"></footer-comp>
  </main>
</template>

<style lang="scss" scoped>
@use "assets/styles/pages/pixels";
</style>