<script setup lang="ts">
import gsap from "gsap";
import {useTransitionComposable} from "~/composables/transition-composable";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
})

const {transitionState} = useTransitionComposable();

watch(
    () => transitionState.transitionComplete,
    (newValue) => {
      if (!newValue) return;

      let sections = gsap.utils.toArray(".horizontal-scroll__panel");
      let container = document.getElementById(`hs-${props.id}`);

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          id: `st-${props.id}`,
          trigger: container,
          pin: true,
          scrub: .1,
          end: `+=${document.querySelector(".horizontal-scroll__container")?.offsetWidth}`
        }
      })
    }
)

</script>

<template>
  <div class="horizontal-scroll__section">
    <div :id="`hs-${id}`" class="horizontal-scroll__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>