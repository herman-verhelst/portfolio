import type {NuxtAppConfig} from "@nuxt/schema";
import gsap from "gsap";
import {Power1} from "gsap/gsap-core";

const pageTransition: NuxtAppConfig['pageTransition'] = {
    name: 'sliders',
    onEnter: (el, done) => {
        gsap.set(el, {opacity: 0})
        gsap.timeline({paused: true, onComplete: done, delay: .1})
            .to(el, {
                opacity: 1,
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


    },
    onLeave: (el, done) => {
        gsap.set('#pt-slider-1', {height: 0, top: 0});
        gsap.set('#pt-slider-2', {height: 0, top: 0});

        gsap.timeline({paused: true, onComplete: done})
            .to('#pt-slider-1', {
                height: '100vh',
                duration: .2,
                ease: Power1.easeInOut
            })
            .to('#pt-slider-2', {
                height: '100vh',
                duration: .2,
                ease: Power1.easeInOut,
            }, '<.1')
            .play()
    }
}

export default pageTransition;