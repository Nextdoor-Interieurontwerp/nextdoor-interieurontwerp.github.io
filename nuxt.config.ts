import { readdirSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineNuxtConfig({
    ssr: true,
    nitro: {
        prerender: {
            autoSubfolderIndex: true
        }
    },
    $production: {
        studio: false
    },
    future: {
        compatibilityVersion: 4,
    },
    modules: ['@nuxt/content', 'nuxt-studio', '@nuxtjs/i18n', "@nuxtjs/seo"],
    hooks: {
        'build:before': (): void => {
            type MediaItem = {
                url: string
                alt: string
                type: string
            };
            const mediaDir = resolve(__dirname, 'public/images/media')
            const outputJson = resolve(__dirname, 'public/media-list.json')

            if (existsSync(mediaDir)) {
                const files: string[] = readdirSync(mediaDir)
                const mediaItems : MediaItem[] = files
                    .filter((file: string) => /\.(jpg|jpeg|png|gif|webp|mp4|webm|ogg)$/i.test(file))
                    .map((file: string) => ({
                        url: `/images/media/${file}`,
                        alt: file.split('.').slice(0, -1).join('.').replace(/[_-]/g, ' '),
                        type: /\.(mp4|webm|ogg)$/i.test(file) ? 'video' : 'image'
                    }))

                writeFileSync(outputJson, JSON.stringify(mediaItems, null, 2))
                console.log(`[Media Plugin] Generated media-list.json with ${mediaItems.length} items.`)
            } else {
                console.warn(`[Media Plugin] Media directory not found: ${mediaDir}`)
            }
        }
    },
    site: {
        url: 'https://nextdoorinterieurontwerp.nl',
        name: 'NEXTDOOR Interieur Ontwerp',
        description: 'Allround bureau voor interieurontwerp, interieuradvies en vormgeving, bouwbegeleiding en advies',
        defaultLocale: 'nl',
        indexable: true,
    },
    schemaOrg: {
        identity: {
            type: 'BusinessOrganization',
            name: 'NEXTDOOR Interieur Ontwerp',
            url: 'https://nextdoorinterieurontwerp.nl',
            logo: '/images/logo.svg', // Assuming this is available
        }
    },
    ogImage: {
        enabled: true,
        defaults: {
            url: '/images/og-main.jpg',
            width: 1200,
            height: 630,
            alt: 'NEXTDOOR Interieur Ontwerp'
        }
    },
    seo: {
        fallbackTitle: false,
    },
    i18n: {
        locales: [
            { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
            { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
        ],
        defaultLocale: 'nl',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        baseUrl: 'https://nextdoorinterieurontwerp.nl'
    },
    robots: {
        enabled: true,
    },
    sitemap: {
        enabled: true,
    },
    studio: {
        repository: {
            provider: 'github',
            owner: 'd2af5',
            repo: 'website',
            branch: 'main',
        }
    },
    routeRules: {
        '/': { prerender: true }
    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/webp', href: '/favicon.webp' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:ital,wght@0,400;0,600;0,700;1,400&display=swap' }
            ]
        }
    },
    devtools: { enabled: true },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                'lucide-vue-next',
                '@unhead/schema-org/vue',
            ]
        }
    },
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2024-04-03',
})