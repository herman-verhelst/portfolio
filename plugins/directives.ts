import gsap from "gsap";
import {Power1} from "gsap/gsap-core";

export default defineNuxtPlugin((app) => {
    app.vueApp.directive('cursor', {
        mounted (element) {
            const trailingCursors: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName('cursor--trailing') as HTMLCollectionOf<HTMLDivElement>;
            const cursorWidth: number = 5;

            element.addEventListener('mouseenter', () => {
                for (let i = 0; i < trailingCursors.length; i++) {
                    trailingCursors[i].style.width = `${cursorWidth}rem`
                }
            })
            element.addEventListener('mouseleave', () => {
                for (let i = 0; i < trailingCursors.length; i++) {
                    trailingCursors[i].style.width = ''
                }
            })
        }
    });

    app.vueApp.directive('scroll-animation', {
        mounted (element) {
            gsap.fromTo(element, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                duration: .2,
                ease: Power1.easeInOut,
                scrollTrigger: {
                    trigger: element,
                    markers: true,
                    start: 'top bottom',
                    end: 'bottom top',
                    toggleActions: "play reverse restart reverse",
                },
            })
        }
    })
})