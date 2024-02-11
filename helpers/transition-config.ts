import type {NuxtAppConfig} from "@nuxt/schema";
import gsap from "gsap";
import {Power1} from "gsap/gsap-core";
import {useTransitionComposable} from "~/composables/transition-composable";

const {
    toggleTransitionComplete,
    toggleFirstTransitionComplete,
    toggleStartSecondTransition,
    transitionState
} = useTransitionComposable();

const pageTransition: NuxtAppConfig['pageTransition'] = {
    name: 'sliders',
    onEnter: (el, done) => {
        watch(
            () => transitionState.firstTransitionComplete,
            (newValue) => {
                if (!newValue) return;

                gsap.set(el, {opacity: 0})
                gsap.timeline({
                    paused: true,
                    onComplete() {
                        toggleTransitionComplete(true);
                        done();
                    },
                    onStart() {
                        toggleStartSecondTransition(true)
                    }
                })
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
            }
        )
    },
    onLeave: (el, done) => {
        toggleTransitionComplete(false);
        toggleFirstTransitionComplete(false);
        toggleStartSecondTransition(false);
        gsap.set('#pt-slider-1', {height: 0, top: 0});
        gsap.set('#pt-slider-2', {height: 0, top: 0});

        gsap.timeline({
            paused: true,
            onComplete() {
                toggleFirstTransitionComplete(true);
                done();
            }
        })
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