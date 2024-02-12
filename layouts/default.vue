<script lang="ts" setup>
import Cursor from "~/components/cursor.vue";
import PageTransition from "~/components/page-transition.vue";
import Navigation from "~/components/navigation.vue";
import {useTransitionComposable} from "~/composables/transition-composable";
import gsap from "gsap";
import {Power1} from "gsap/gsap-core";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const {toggleTransitionComplete} = useTransitionComposable();
const {transitionState} = useTransitionComposable();

let firstLoad: boolean = true;

onMounted(() => {
  toggleTransitionComplete(true);
  gsap.registerPlugin(ScrollTrigger);
  hideElements();

  watch(
      () => transitionState.transitionComplete,
      (newValue) => {
        if (!newValue) return;
        setupStartAnimations();
      }
  );
  watch(
      () => transitionState.startSecondTransition,
      (newValue) => {
        if (!newValue) return;
        hideElements();
      }
  )
})

const nuxt = useNuxtApp()

nuxt.hook('page:loading:end', () => {
  if (!firstLoad) return;
  firstLoad = false;

  gsap.timeline({
    onComplete: () => {
      setupStartAnimations();
    }
  })
      .to('#pt-slider-1', {
        height: 0,
        top: '100vh',
        duration: .2,
        ease: Power1.easeInOut
      })
      .to('#pt-slider-2', {
        height: 0,
        top: '100vh',
        duration: .2,
        ease: Power1.easeInOut,
      }, '<.1')
      .play()
})

function hideElements() {
  const elements: any = document.querySelectorAll('[data-startanimation], [data-scrolltrigger]');
  for (let i = 0; i < elements.length; i++) {
    gsap.set(elements[i], {
      opacity: 0,
      y: 16
    })
  }
}

function setupStartAnimations() {
  const elements: any = document.querySelectorAll('[data-startanimation]');
  if (elements.length > 0) {
    let tl: GSAPTimeline = gsap.timeline({
      onComplete: () => {
        setupScrollTriggers()
      }
    })
    for (let i = 0; i < elements.length; i++) {
      tl.to(elements[i], {
        opacity: 1,
        y: 0,
        duration: .2,
        ease: Power1.easeInOut,
      }, '-=.1')
    }

    tl.play();
  } else setupScrollTriggers();
}

function setupScrollTriggers() {
  const elements: any = document.querySelectorAll('[data-scrolltrigger]');
  for (let i = 0; i < elements.length; i++) {
    const index: number = elements[i].dataset.scrolltrigger;

    gsap.fromTo(elements[i], {
      opacity: 0,
      y: 16
    }, {
      opacity: 1,
      y: 0,
      duration: .2,
      delay: index ? index * .1 : 0,
      ease: Power1.easeInOut,
      scrollTrigger: {
        trigger: elements[i],
        start: 'top 90%',
        end: 'bottom-=16 top',
        toggleActions: "play reverse play reset",
      },
    })
  }

}

</script>

<template>
  <page-transition></page-transition>
  <cursor></cursor>
  <navigation></navigation>

  <slot/>

</template>

<style>
</style>