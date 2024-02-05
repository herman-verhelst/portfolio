<script setup lang="ts">
import {useLocalePath} from "#i18n";

const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath();

</script>

<template>
  <nav id="nav" class="nav">
    <div>
      <div class="logo__container">
        <nuxt-link :to="localePath('/')" aria-hidden="true" class="logo button">
          <img alt="Logo - Herman Verhelst" src="~/assets/icons/logo_color.svg">
        </nuxt-link>
      </div>

      <div class="links__container">
        <ul>
          <li>
            <nuxt-link class="nav__link" :to="localePath('/projects')">{{ $t('nav.projects') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="nav__link" to="/">{{ $t('nav.about') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link class="nav__link" to="/">{{ $t('nav.contact') }}</nuxt-link>
          </li>

          <li class="lang-switcher__container">
            <nuxt-link class="nav__link lang-switcher" :class="{'lang-switcher--active': $i18n.locale === 'nl'}"
                       :to="switchLocalePath('nl')">Nl
            </nuxt-link>
            |
            <nuxt-link class="nav__link lang-switcher" :class="{'lang-switcher--active': $i18n.locale === 'en'}"
                       :to="switchLocalePath('en')">Eng
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>