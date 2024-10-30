<script setup lang="ts">
import gsap from "gsap";
import {useTransitionComposable} from "~/composables/transition-composable";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true,
  }
})

const {transitionState} = useTransitionComposable();

watch(
    () => transitionState.transitionComplete,
    (newValue) => {
      if (!newValue) return;

      let sections = gsap.utils.toArray(".horizontal-scroll__panel");
      let container = document.getElementById(`hs-${props.id}`);

      console.log(-100 + (100 / props.width), props.width)
      gsap.to(sections, {
        xPercent: -100 + (100 / props.width),
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

      <slot></slot>

  </div>
</template>

<style scoped lang="scss">
</style>