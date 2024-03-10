<script lang="ts" setup>
import {useLocalePath} from "#i18n";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useTransitionComposable} from "~/composables/transition-composable";
import {Power1} from "gsap/gsap-core";
import Context = gsap.Context;


const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

defineProps({
  footerColor: {
    type: String,
    default: 'footer--bg-default'
  },
})

const {transitionState} = useTransitionComposable();
let context: Context;
watch(
    () => transitionState.transitionComplete,
    (newValue) => {
      if (!newValue) return;

      context = gsap.context(() => {
        gsap.to('#nav', {
          y: '-100%',
          duration: .2,
          ease: Power1.easeInOut,
          scrollTrigger: {
            trigger: '#footer',
            start: "top 65px",
            toggleActions: "play reverse play reset",
          }
        })

        gsap.to('.footer', {
          margin: 0,
          padding: '0.5rem',
          borderRadius: 0,
          duration: .2,
          height: '100vh',
          ease: Power1.easeInOut,
          scrollTrigger: {
            trigger: '#footer',
            start: "top 5%",
            toggleActions: "play reverse play reset",
          }
        })

        const elements: any = document.querySelectorAll('[data-footertrigger]');
        for (let i = 0; i < elements.length; i++) {
          const index: number = elements[i].dataset.footertrigger;
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
              trigger: '#footer',
              start: "top 50%",
              toggleActions: "play reverse play reset",
            }
          })
        }
      })
    }
)

onUnmounted(() => {
  if (context) context.revert();
  ScrollTrigger.killAll();
})

</script>

<template>
  <footer id="footer" :class="footerColor" class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <h2 class="footer__title">

          <span data-footertrigger="0">{{ $t('footer.think') }}</span>
          <span data-footertrigger="1">{{ $t('footer.dare') }}</span>
          <span data-footertrigger="2">{{ $t('footer.create') }}</span>
        </h2>
        <div class="footer__links">

          <div data-footertrigger="3" class="footer__socials">
            <h3 class="proforma">{{ $t('socials') }}</h3>
            <ul>
              <li><a class="link" v-cursor href="#">Dribbble</a></li>
              <li><a class="link" v-cursor href="#">Behance</a></li>
              <li><a class="link" v-cursor href="#">LinkedIn</a></li>
              <li><a class="link" v-cursor href="#">GitHub</a></li>
              <li><a class="link" v-cursor href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div data-footertrigger="5" class="footer__small">
          <p>Herman Verhelst | 2024</p>

          <div class="lang-switcher__container lang-switcher__container--small">
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'nl'}" :to="switchLocalePath('nl')"
                       class="link nav__link lang-switcher">Nl
            </nuxt-link>
            |
            <nuxt-link v-cursor :class="{'lang-switcher--active': $i18n.locale === 'en'}" :to="switchLocalePath('en')"
                       class="link nav__link lang-switcher">Eng
            </nuxt-link>
          </div>
        </div>

        <pixel-image
            data-footertrigger="6"
            :is-full-page="false"
            :number-of-rows="2"
            :dark-bg="true"
            :is-playing="false"
            canvas-id="footer"
            class="pixel-image--footer">
        </pixel-image>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>

</style>