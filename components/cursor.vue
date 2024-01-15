<script lang="ts" setup>
import gsap from "gsap";
import {Power1} from "gsap/gsap-core";

const trailingCursors: string[] = ['#cursor-t1', "#cursor-t2"];

onMounted(() => {
  document.body.addEventListener('mousemove', onMouseMove);
  document.body.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
})

function onMouseMove(event: MouseEvent): void {
  gsap.set('#cursor', {
    left: event.clientX,
    top: event.clientY,
  });

  for (let i = 0; i < trailingCursors.length; i++) {
    gsap.to(trailingCursors[i], {
      left: event.clientX,
      top: event.clientY,
      stagger: -1
    });
  }
}

function onMouseDown(): void {
  for (let i = 0; i < trailingCursors.length; i++) {
    gsap.to(trailingCursors[i], {
      scale: .8,
      duration: .1,
      ease: Power1.easeInOut
    });
  }
}

function onMouseUp(): void {
  for (let i = 0; i < trailingCursors.length; i++) {
    gsap.to(trailingCursors[i], {
      scale: 1,
      duration: .1,
      ease: Power1.easeInOut
    });
  }
}
</script>

<template>
  <div id="cursor" class="cursor difference"></div>
  <div id="cursor-t1" class="cursor cursor--trailing difference"></div>
  <div id="cursor-t2" class="cursor cursor--trailing bw"></div>

</template>

<style lang="scss" scoped>

</style>