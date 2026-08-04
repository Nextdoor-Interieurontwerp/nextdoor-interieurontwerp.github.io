/**
 * Single source of truth for the company's name, address and profiles (NAP).
 *
 * These values are consumed by the structured data and geo meta in nuxt.config.ts,
 * the footer, and the generated llms.txt / llms-full.txt. Keeping them in one place
 * is what stops the address drifting apart across surfaces again.
 *
 * Prose in content/*.md still repeats the address by hand — markdown cannot import
 * this module — so those pages need updating alongside any change here.
 */

export const SITE_URL = 'https://nextdoorinterieurontwerp.nl'

export const BUSINESS = {
    /** Legal / registered name, used in the terms and conditions. */
    legalName: 'NEXTDOOR B.V.',
    /** Trading name as written on the site. */
    name: 'NEXTDOOR Interieur Ontwerp',
    /** Long-form trading name used in the footer and legal pages. */
    fullName: 'NEXTDOOR interieurontwerp en -advies',
    kvk: '75743914',
    url: SITE_URL,
    email: 'info@nextdoorinterieurontwerp.nl',
    /** E.164, for tel: links and structured data. */
    telephone: '+31638894042',
    /** Human-readable phone number as displayed. */
    telephoneDisplay: '06 388 940 42',
    address: {
        streetAddress: 'St. Leonardusstraat 4',
        postalCode: '5341 AN',
        addressLocality: 'Oss',
        addressRegion: 'Noord-Brabant',
        addressCountry: 'NL',
    },
    /** Rooftop coordinates of the address node in OpenStreetMap. */
    geo: {
        latitude: 51.768747,
        longitude: 5.517910,
    },
    socials: {
        instagram: 'https://www.instagram.com/nextdoorinterieurontwerp',
        linkedin: 'https://www.linkedin.com/company/nextdoor-interieurontwerp',
        facebook: 'https://www.facebook.com/nextdoorinterieurontwerp',
    },
} as const

/**
 * The service list, in the client's own words — these are the same six lines
 * that have always appeared in llms.txt. Kept here so the structured data and
 * the generated text files cannot describe the business differently.
 */
export const SERVICES_BY_LOCALE = {
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
} as const

/** Dutch service names, used for the schema.org offer catalogue. */
export const SERVICES = SERVICES_BY_LOCALE.nl.map(name => ({ name }))

/** "St. Leonardusstraat 4, 5341 AN Oss, Nederland" */
export const formattedAddress = [
    BUSINESS.address.streetAddress,
    `${BUSINESS.address.postalCode} ${BUSINESS.address.addressLocality}`,
    'Nederland',
].join(', ')

/** "St. Leonardusstraat 4, 5341 AN Oss" — the short form used in the footer. */
export const shortAddress = [
    BUSINESS.address.streetAddress,
    `${BUSINESS.address.postalCode} ${BUSINESS.address.addressLocality}`,
].join(', ')

export const socialProfiles = Object.values(BUSINESS.socials)
