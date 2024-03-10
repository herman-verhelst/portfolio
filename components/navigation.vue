<script lang="ts" setup>
import {useLocalePath} from "#i18n";
import {gsap} from "gsap";
import {Power1} from "gsap/gsap-core";
import type {Ref} from "vue";

const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath();

let navigationOpen: Ref<boolean> = ref(false);
let tl: GSAPTimeline;

onMounted(() => {
  window.addEventListener('resize', createNavDrawer);
  createNavDrawer();
})


function createNavDrawer() {
  if (window.innerWidth > 900) {
    if (tl) {
      gsap.set('#nav-drawer', {
        y: 0
      })
      tl.revert();
    }
    return;
  }
  gsap.set('#nav-drawer', {
    y: '-100%'
  })
  tl = gsap.timeline()
      .to('#nav-drawer', {
        y: 0,
        ease: Power1.easeInOut,
      })
      .pause()
}

function toggleNavigation() {
  navigationOpen.value = !navigationOpen.value
  if (navigationOpen.value) {
    tl.restart()
    return;
  }
  tl.reverse();
}

function hideNavigation() {
  navigationOpen.value = false
  setTimeout(() => tl.revert(), 200)
}

</script>

<template>
  <nav id="nav" class="nav">
    <div :aria-expanded="navigationOpen">
      <div class="logo__container">
        <nuxt-link v-cursor :to="localePath('/')" class="logo" @click="hideNavigation">
          <img alt="Logo - Herman Verhelst" src="~/assets/icons/logo_color.svg">
        </nuxt-link>
      </div>

      <div id="nav-drawer" class="nav__links">
        <ul>
          <li>
            <nuxt-link v-cursor :to="localePath('/projects')" class="nav__link link" @click="hideNavigation">
              {{ $t('nav.projects') }}
            </nuxt-link>
          </li>
<!--          <li>
            <nuxt-link v-cursor class="nav__link link" to="#" @click="hideNavigation">{{ $t('nav.about') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link v-cursor :to="localePath('/contact')" class="nav__link link" @click="hideNavigation">
              {{ $t('nav.contact') }}
            </nuxt-link>
          </li>-->

          <li class="lang-switcher__container tablet:mt-auto">
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'nl'}" :to="switchLocalePath('nl')"
                       class="nav__link lang-switcher link"
                       @click="hideNavigation">Nl
            </nuxt-link>
            |
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'en'}" :to="switchLocalePath('en')"
                       class="nav__link lang-switcher link"
                       @click="hideNavigation">Eng
            </nuxt-link>
          </li>
        </ul>
      </div>

      <button :aria-expanded="navigationOpen" class="nav__hamburger" @click="toggleNavigation">
        <span class="nav__hamburger__line"></span>
        <span class="nav__hamburger__line"></span>
        <span class="nav__hamburger__line"></span>
      </button>

    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>