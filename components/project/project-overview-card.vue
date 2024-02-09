<script lang="ts" setup>
import {useLocalePath} from "#i18n";
import {toCamelCase} from "~/utils/string-utils";
import gsap from "gsap";

const localePath = useLocalePath();

const props = defineProps({
  project: {
    required: true,
  }
})

onMounted(() => {
      const card = document.getElementById(`project-card-${(props.project as any).id}`)

      card?.addEventListener('mouseenter', () => {
        gsap.set('#cursor-t1', {
          backgroundImage: `url(/images/projects/${(props.project as any).link}/${(props.project as any).thumbnail})`,
          backgroundSize: 'cover',
          mixBlendMode: 'initial'

        })
        gsap.to('#cursor-t1', {
          width: '10rem',
          borderRadius: '0.5rem',
          duration: .2,
        })
      });
    })

</script>

<template>
  <nuxt-link :id="`project-card-${project.id}`" :to="localePath(`/projects/${project.link}?id=${project.id}`)" class="project-card">
    <div class="w-full">
      <h2 class="project-card__title">{{ $t(`projects.${toCamelCase(project.link)}.title`) }}</h2>
      <p class="project-card__subtitle proforma">{{ $t(`projects.${toCamelCase(project.link)}.subtitle`) }}</p>
    </div>
    <project-tag-container :tags="project.tags"></project-tag-container>
    <button :class="`button--color-${project?.id}`" class="button button--icon">
      <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.3335 17.1667H23.8668L19.7335 20.9667L20.6668 21.9667L26.5335 16.5L20.6668 11.0333L19.7335 12.0333L23.8668 15.8333H5.3335V17.1667Z"
            fill="#F6F2EF"/>
      </svg>
    </button>
  </nuxt-link>
</template>

<style lang="scss" scoped>

</style>