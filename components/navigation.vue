<script lang="ts" setup>
import {useLocalePath} from "#i18n";

const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath();

</script>

<template>
  <nav id="nav" class="nav">
    <div>
      <div class="logo__container">
        <nuxt-link v-cursor :to="localePath('/')" class="logo">
          <img alt="Logo - Herman Verhelst" src="~/assets/icons/logo_color.svg">
        </nuxt-link>
      </div>

      <div class="links__container">
        <ul>
          <li>
            <nuxt-link v-cursor :to="localePath('/projects')" class="nav__link">{{ $t('nav.projects') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link v-cursor class="nav__link" to="#">{{ $t('nav.about') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link v-cursor :to="localePath('/contact')" class="nav__link">{{ $t('nav.contact') }}</nuxt-link>
          </li>

          <li class="lang-switcher__container">
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'nl'}"
                       :to="switchLocalePath('nl')"
                       class="nav__link lang-switcher">Nl
            </nuxt-link>
            |
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'en'}"
                       :to="switchLocalePath('en')"
                       class="nav__link lang-switcher">Eng
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="nav__hamburger">

      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>