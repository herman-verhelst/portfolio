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
        <div data-footertrigger="3" class="footer__links">

          <div>
            <h3 class="proforma">{{ $t('footer.navigation') }}</h3>
            <ul>
              <li class="footer__link">
                <nuxt-link :to="localePath('/projects')" class="link" v-cursor>{{ $t('nav.projects') }}</nuxt-link>
              </li>
              <li class="footer__link">
                <nuxt-link :to="localePath('/contact')" class="link" v-cursor>{{ $t('nav.contact') }}</nuxt-link>
              </li>
            </ul>
          </div>

          <hr>

          <div>
            <div class="footer__icon-buttons">
              <a v-cursor href="https://www.linkedin.com/in/herman-verhelst/" target="_blank"
                 class="button button--footer button--icon">
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
                  <path
                      d="m133.37,0H10.63C4.76,0,0,4.76,0,10.63v122.74c0,5.87,4.76,10.63,10.63,10.63h122.74c5.87,0,10.63-4.76,10.63-10.63V10.63c0-5.87-4.76-10.63-10.63-10.63ZM42.92,122.68h-21.65V53.9h21.65v68.77Zm-10.82-78.3c-6.89,0-12.48-5.25-12.48-12.43s5.59-12.43,12.48-12.43,12.48,5.25,12.48,12.43-5.59,12.43-12.48,12.43Zm90.64,78.36h-21.65v-37.56c0-11.08-4.71-14.5-10.79-14.5-6.42,0-12.72,4.83-12.72,14.78v37.29h-21.65V53.95h20.82v9.53h.28c2.09-4.23,9.41-11.46,20.58-11.46,12.08,0,25.13,7.17,25.13,28.17v42.54Z"/>
                </svg>
              </a>
              <a v-cursor href="https://github.com/herman-verhelst" target="_blank"
                 class="button button--footer button--icon">
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.63 96">
                  <path
                      d="m48.85,0C21.84,0,0,22,0,49.22c0,21.76,13.99,40.17,33.4,46.69,2.43.49,3.32-1.06,3.32-2.36,0-1.14-.08-5.05-.08-9.13-13.59,2.93-16.42-5.87-16.42-5.87-2.18-5.7-5.42-7.17-5.42-7.17-4.45-3.01.32-3.01.32-3.01,4.93.33,7.52,5.05,7.52,5.05,4.37,7.5,11.4,5.38,14.24,4.07.4-3.18,1.7-5.38,3.07-6.6-10.84-1.14-22.24-5.38-22.24-24.28,0-5.38,1.94-9.78,5.01-13.2-.49-1.22-2.18-6.27.49-13.04,0,0,4.12-1.3,13.43,5.05,3.98-1.08,8.09-1.63,12.21-1.63,4.12,0,8.33.57,12.21,1.63,9.3-6.36,13.43-5.05,13.43-5.05,2.67,6.76.97,11.82.49,13.04,3.15,3.42,5.01,7.82,5.01,13.2,0,18.91-11.4,23.06-22.32,24.28,1.78,1.55,3.32,4.48,3.32,9.13,0,6.6-.08,11.9-.08,13.53,0,1.3.89,2.85,3.32,2.36,19.41-6.52,33.4-24.93,33.4-46.69.08-27.22-21.84-49.22-48.77-49.22Z"/>
                </svg>
              </a>
            </div>

            <a v-cursor class="project__discover__link"
               href="mailto:mail@herman-verhelst.be">mail@herman-verhelst.be</a>
            <p class="mt-2">BE 1006.588.103</p>
          </div>
        </div>
      </div>
      <div>
        <div data-footertrigger="5" class="footer__small">
          <p>Herman Verhelst | 2024</p>

          <div class="lang-switcher__container lang-switcher__container&#45;&#45;small">
            <nuxt-link v-cursor :class="{'lang-switcher&#45;&#45;active': $i18n.locale === 'nl'}"
                       :to="switchLocalePath('nl')"
                       class="link nav__link lang-switcher">Nl
            </nuxt-link>
            |
            <nuxt-link v-cursor :class="{'lang-switcher&#45;&#45;active': $i18n.locale === 'en'}"
                       :to="switchLocalePath('en')"
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