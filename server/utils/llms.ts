import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { BUSINESS, SITE_URL, formattedAddress } from '~~/shared/business'

export type Locale = 'nl' | 'en'

/**
 * Curated copy that has no home in the content collection. Everything else in
 * llms.txt / llms-full.txt is derived from content/, so it cannot drift.
 */
export const TAGLINE: Record<Locale, string> = {
    nl: 'Allround bureau voor interieurontwerp, interieuradvies en vormgeving, bouwbegeleiding en advies voor particulieren en bedrijven in Oss en omgeving (Noord-Brabant, Nederland).',
    en: 'Full-service agency for interior design, interior advice and styling, construction supervision and consultancy for residential and business clients in Oss and surroundings (Noord-Brabant, the Netherlands).',
}

export const SERVICES: Record<Locale, string[]> = {
    nl: [
        'Interieurontwerp (particulier & zakelijk)',
        'Interieuradvies en kleuradvies',
        'Bouwbegeleiding en verbouwadvies',
        '3D-visualisaties en plattegronden',
        'Moodboards en materiaaladvies',
        'Projectbegeleiding van A tot Z',
    ],
    en: [
        'Interior design (residential & business)',
        'Interior and colour advice',
        'Construction supervision and renovation advice',
        '3D visualisations and floor plans',
        'Mood boards and material advice',
        'Project supervision from start to finish',
    ],
}

export const AREA_SERVED: Record<Locale, string> = {
    nl: 'Oss en omgeving, heel Noord-Brabant en op aanvraag door heel Nederland',
    en: 'Oss and surroundings, all of Noord-Brabant and, on request, throughout the Netherlands',
}

const LABELS = {
    nl: { pages: 'Pagina\'s', projects: 'Projecten', services: 'Diensten', contact: 'Contact', address: 'Adres', phone: 'Telefoon', email: 'E-mail', website: 'Website', area: 'Werkgebied', location: 'Locatie', client: 'Opdrachtgever', scope: 'Werkzaamheden' },
    en: { pages: 'Pages', projects: 'Projects', services: 'Services', contact: 'Contact', address: 'Address', phone: 'Phone', email: 'Email', website: 'Website', area: 'Service area', location: 'Location', client: 'Client', scope: 'Scope' },
} as const

/** Pages listed in llms.txt, in the order a reader should meet them. */
const PAGE_ORDER = ['/', '/particulier', '/zakelijk', '/impressie', '/contact']

type ContentPage = {
    path?: string
    title?: string
    description?: string
    robots?: string
    translations?: Partial<Record<Locale, {
        title?: string
        description?: string
        category?: string
        location?: string
        services?: string
    }>>
}

/** Prefix a content path with the locale, matching `prefix_except_default`. */
export function localeUrl(path: string, locale: Locale): string {
    const prefix = locale === 'nl' ? '' : `/${locale}`
    return path === '/' ? `${SITE_URL}${prefix || '/'}` : `${SITE_URL}${prefix}${path}`
}

/** Strip the locale prefix so EN and NL pages share a comparable key. */
function unprefixed(path: string): string {
    const stripped = path.replace(/^\/en(?=\/|$)/, '')
    return stripped === '' ? '/' : stripped
}

async function allPages(event: H3Event): Promise<ContentPage[]> {
    return await queryCollection(event, 'content').all() as ContentPage[]
}

/** Indexable marketing pages for one locale, in PAGE_ORDER. */
export async function marketingPages(event: H3Event, locale: Locale): Promise<Array<ContentPage & { path: string }>> {
    const pages = await allPages(event)
    const inLocale = pages.filter((page): page is ContentPage & { path: string } => {
        if (!page.path) return false
        if (page.path.startsWith('/projects/')) return false
        if (page.robots?.includes('noindex')) return false
        return locale === 'en' ? page.path.startsWith('/en') : !page.path.startsWith('/en')
    })

    return inLocale
        .filter(page => PAGE_ORDER.includes(unprefixed(page.path)))
        .sort((a, b) => PAGE_ORDER.indexOf(unprefixed(a.path)) - PAGE_ORDER.indexOf(unprefixed(b.path)))
}

/**
 * Project pages. These live at locale-prefixed routes (/projects/<slug> and
 * /en/projects/<slug>) but read from one locale-neutral content file.
 */
export async function projectPages(event: H3Event): Promise<Array<ContentPage & { path: string }>> {
    const pages = await allPages(event)
    return pages
        .filter((page): page is ContentPage & { path: string } => Boolean(page.path?.startsWith('/projects/')))
        .sort((a, b) => a.path.localeCompare(b.path))
}

function contactBlock(locale: Locale, bold: boolean): string {
    const l = LABELS[locale]
    const wrap = (label: string) => (bold ? `**${label}:**` : `${label}:`)
    return [
        `- ${wrap(l.address)} ${formattedAddress}`,
        `- ${wrap(l.phone)} ${BUSINESS.telephone}`,
        `- ${wrap(l.email)} ${BUSINESS.email}`,
        `- ${wrap(l.website)} ${SITE_URL}`,
        `- ${wrap('Instagram')} ${BUSINESS.socials.instagram}`,
        `- ${wrap('LinkedIn')} ${BUSINESS.socials.linkedin}`,
        `- ${wrap('Facebook')} ${BUSINESS.socials.facebook}`,
        `- ${wrap('KvK')} ${BUSINESS.kvk}`,
    ].join('\n')
}

/** The short index: what the site is, what it offers, where everything lives. */
export async function renderLlmsIndex(event: H3Event): Promise<string> {
    const lines: string[] = [`# ${BUSINESS.fullName}`, '', `> ${TAGLINE.nl}`, '']

    for (const locale of ['nl', 'en'] as const) {
        const l = LABELS[locale]
        const heading = locale === 'nl' ? 'Nederlands' : 'English'
        lines.push(`## ${l.pages} — ${heading}`, '')
        for (const page of await marketingPages(event, locale)) {
            const title = page.title ?? page.path
            lines.push(`- [${title}](${SITE_URL}${page.path}): ${page.description ?? ''}`.trimEnd())
        }
        lines.push('')
    }

    lines.push(`## ${LABELS.nl.services}`, '')
    lines.push(...SERVICES.nl.map(service => `- ${service}`))
    lines.push('')

    const projects = await projectPages(event)
    lines.push(`## ${LABELS.nl.projects}`, '')
    for (const project of projects) {
        const tr = project.translations?.nl
        const title = tr?.title ?? project.title ?? project.path
        const location = tr?.location ? ` — ${tr.location}` : ''
        lines.push(`- [${title}${location}](${localeUrl(project.path, 'nl')}): ${tr?.description ?? ''}`.trimEnd())
    }
    lines.push('')

    lines.push(`## ${LABELS.nl.contact}`, '', contactBlock('nl', false), '')
    lines.push('## Optional', '', `- [Volledige inhoud (llms-full.txt)](${SITE_URL}/llms-full.txt)`, '')

    return lines.join('\n')
}

/** The long form: every indexable page and project, both locales. */
export async function renderLlmsFull(event: H3Event): Promise<string> {
    const lines: string[] = [
        `# ${BUSINESS.fullName} — ${'Volledige site-inhoud'}`,
        '',
        `> ${TAGLINE.nl}`,
        '',
        '---',
        '',
    ]

    for (const locale of ['nl', 'en'] as const) {
        const l = LABELS[locale]
        lines.push(locale === 'nl' ? '# Nederlands' : '# English', '')
        lines.push(`> ${TAGLINE[locale]}`, '')

        for (const page of await marketingPages(event, locale)) {
            lines.push(`## ${page.title ?? page.path} (${SITE_URL}${page.path})`, '')
            if (page.description) lines.push(page.description, '')
        }

        lines.push(`### ${l.services}`, '')
        lines.push(...SERVICES[locale].map(service => `- ${service}`))
        lines.push('')

        lines.push(`### ${l.projects}`, '')
        for (const project of await projectPages(event)) {
            const tr = project.translations?.[locale] ?? project.translations?.nl
            lines.push(`#### ${tr?.title ?? project.path} (${localeUrl(project.path, locale)})`, '')
            if (tr?.description) lines.push(tr.description, '')
            const facts: string[] = []
            if (tr?.location) facts.push(`- **${l.location}:** ${tr.location}`)
            if (tr?.category) facts.push(`- **${locale === 'nl' ? 'Categorie' : 'Category'}:** ${tr.category}`)
            if (tr?.services) facts.push(`- **${l.scope}:** ${tr.services}`)
            if (facts.length) lines.push(...facts, '')
        }

        lines.push(`### ${l.contact}`, '', contactBlock(locale, true), '')
        lines.push(`- **${l.area}:** ${AREA_SERVED[locale]}`, '')
        lines.push('---', '')
    }

    return lines.join('\n')
}
