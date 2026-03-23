import { readdirSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineNuxtConfig({
    ssr: true,
    nitro: {
        prerender: {
            autoSubfolderIndex: true
        }
    },
    future: {
        compatibilityVersion: 4,
    },
    modules: ['@nuxt/content', 'nuxt-studio', '@nuxtjs/i18n', "@nuxtjs/seo", "@vite-pwa/nuxt"],
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
            type: 'LocalBusiness',
            name: 'NEXTDOOR Interieur Ontwerp',
            url: 'https://nextdoorinterieurontwerp.nl',
            logo: 'https://nextdoorinterieurontwerp.nl/images/logo.svg',
            telephone: '+31638894042',
            email: 'info@nextdoorinterieurontwerp.nl',
            address: {
                streetAddress: 'Leonardusstraat 4',
                addressLocality: 'Oss',
                postalCode: '5341 AN',
                addressCountry: 'NL',
            },
            geo: {
                latitude: 51.7654,
                longitude: 5.5176,
            },
            openingHoursSpecification: [
                {
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '17:00',
                }
            ],
            sameAs: [
                'https://www.instagram.com/nextdoorinterieurontwerp',
            ],
        }
    },
    ogImage: {
        enabled: true,
        defaults: {
            component: 'Default',
            width: 1200,
            height: 630,
            alt: 'NEXTDOOR Interieur Ontwerp',
        }
    },
    seo: {
        fallbackTitle: false,
    },
    i18n: {
        locales: [
            { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
            { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' }
        ],
        defaultLocale: 'nl',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        lazy: true,
        baseUrl: 'https://nextdoorinterieurontwerp.nl'
    },
    robots: {
        enabled: true,
    },
    sitemap: {
        enabled: true,
    },
    $production: {
        studio: {
            enabled: false
        }
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
        '/': { prerender: true },
        '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
        '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
        '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'shortcut icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:ital,wght@0,400;0,600;0,700;1,400&display=swap', media: 'print', onload: "this.media='all'" }
            ],
            meta: [
                { name: 'geo.region', content: 'NL-NB' },
                { name: 'geo.placename', content: 'Oss' },
                { name: 'geo.position', content: '51.7654;5.5176' },
                { name: 'ICBM', content: '51.7654, 5.5176' },
            ]
        }
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'NEXTDOOR Interieur Ontwerp',
            short_name: 'NEXTDOOR',
            description: 'Allround bureau voor interieurontwerp, interieuradvies en vormgeving, bouwbegeleiding en advies',
            theme_color: '#cfe0ed',
            background_color: '#cfe0ed',
            display: 'standalone',
            start_url: '/',
            lang: 'nl',
            icons: [
                {
                    src: '/images/pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/images/pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: '/images/pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2}'],
            globIgnores: ['**/locales/**'],
            navigateFallback: null,
            maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-cache',
                        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                        cacheableResponse: { statuses: [0, 200] },
                    },
                },
                {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'gstatic-fonts-cache',
                        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                        cacheableResponse: { statuses: [0, 200] },
                    },
                },
                {
                    urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'pages-cache',
                        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
                        cacheableResponse: { statuses: [0, 200] },
                    },
                },
            ],
        },
        client: {
            installPrompt: true,
        },
        devOptions: {
            enabled: false,
        },
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
        },
        build: {
            chunkSizeWarningLimit: 4000,
            modulePreload: false,
            rollupOptions: {
                onwarn(warning, warn) {
                    if (warning.code === 'SOURCEMAP_ERROR') return
                    warn(warning)
                }
            }
        }
    },
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2024-04-03',
})