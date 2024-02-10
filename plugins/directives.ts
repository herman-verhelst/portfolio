import {defineNuxtPlugin} from "nuxt/app";

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

})