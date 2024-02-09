// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
    ],
    plugins: [
        '~/plugins/directives.ts'
    ],
    css: ['~/assets/styles/styles.scss'],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://use.typekit.net/uln8fgf.css'
                },
            ]
        }
    },
    i18n: {
        vueI18n: 'i18n.config.ts',
        locales: ['nl', 'en'],
        defaultLocale: 'nl',
        strategy: 'prefix',
        detectBrowserLanguage: false
    }
})
