<script lang="ts" setup>
import {useLocalePath} from "#i18n";

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

defineProps({
  footerColor: {
    type: String,
    default: 'footer--bg-default'
  },
})
</script>

<template>
  <footer :class="footerColor" class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <h2 class="footer__title">

          <span>{{ $t('footer.think') }}.</span>
          <span>{{ $t('footer.dare') }}.</span>
          <span>{{ $t('footer.create') }}.</span>
        </h2>
        <div class="footer__links">

          <div class="footer__socials">
            <h3 class="proforma">{{ $t('socials') }}</h3>
            <ul>
              <li><a href="#">Dribbble.</a></li>
              <li><a href="#">Behance.</a></li>
              <li><a href="#">LinkedIn.</a></li>
              <li><a href="#">GitHub.</a></li>
              <li><a href="#">Instagram.</a></li>
            </ul>
          </div>
          <div class="footer__contact">
            <h3 class="proforma">{{ $t('contact.title') }}</h3>
            <nuxt-link :to="localePath('/contact')">{{ $t('contact.question') }}</nuxt-link>
          </div>
        </div>
      </div>
      <div>
        <div class="footer__small">
          <p>Herman Verhelst | 2024</p>

          <div class="lang-switcher__container lang-switcher__container--small">
            <nuxt-link :class="{'lang-switcher--active': $i18n.locale === 'nl'}" :to="switchLocalePath('nl')"
                       class="nav__link lang-switcher">Nl
            </nuxt-link>
            |
            <nuxt-link :class="{'lang-switcher--active': $i18n.locale === 'en'}" :to="switchLocalePath('en')"
                       class="nav__link lang-switcher">Eng
            </nuxt-link>
          </div>
        </div>

        <pixel-image
            :is-full-page="false"
            :number-of-rows="2"
            :dark-bg="true"
            canvas-id="footer"
            class="pixel-image--footer">
        </pixel-image>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>

</style>