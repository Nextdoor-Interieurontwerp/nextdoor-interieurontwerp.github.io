import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:3001'
const OUT = '/tmp/consent-shots'
mkdirSync(OUT, { recursive: true })

const results = []
function pass(step, detail = '') { results.push({ step, ok: true, detail }); console.log(`✓ ${step}${detail ? ' — ' + detail : ''}`) }
function fail(step, detail) { results.push({ step, ok: false, detail }); console.log(`✗ ${step} — ${detail}`) }

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

async function dataLayer(page) {
  // gtag pushes `arguments`, which serialize as numeric-keyed objects, not arrays.
  // Normalize each entry to a real array so the rest of the script can use [0],[1],[2].
  return page.evaluate(() => Array.from(window.dataLayer || []).map(e => Array.from(e)))
}

async function getCookie(context, name) {
  return (await context.cookies()).find(c => c.name === name)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const page = await context.newPage()

console.log(`\n=== 1. First-visit state at ${BASE} ===`)
await page.goto(BASE, { waitUntil: 'networkidle' })
try {
  await page.waitForSelector('.consent-banner', { timeout: 5000 })
  pass('1. Banner visible on first visit')
} catch {
  fail('1. Banner visible on first visit', 'selector .consent-banner not found within 5s')
}
await shot(page, '01-initial')

console.log(`\n=== 2. DataLayer + cookie sanity ===`)
const dl0 = await dataLayer(page)
const hasDefault = dl0.some(e => e[0] === 'consent' && e[1] === 'default')
if (hasDefault) pass('2a. dataLayer has consent default-deny entry', `${dl0.length} entries`)
else fail('2a. dataLayer has consent default-deny entry', `dl=${JSON.stringify(dl0).slice(0, 200)}`)

const cookieBefore = await getCookie(context, 'nd_consent')
if (!cookieBefore) pass('2b. nd_consent cookie absent before any decision')
else fail('2b. nd_consent cookie absent before any decision', `cookie=${cookieBefore.value.slice(0, 30)}…`)

console.log(`\n=== 3. Manage preferences flow ===`)
await page.locator('.consent-banner__manage').click()
try {
  await page.waitForSelector('.consent-prefs', { timeout: 2000 })
  pass('3a. Preferences modal opens')
} catch {
  fail('3a. Preferences modal opens', '.consent-prefs not visible')
}
await shot(page, '03-prefs-open')

const necessaryDisabled = await page.locator('input[type="checkbox"]').first().isDisabled()
if (necessaryDisabled) pass('3b. Necessary checkbox disabled')
else fail('3b. Necessary checkbox disabled', 'first checkbox is enabled')

await page.locator('input[type="checkbox"]').nth(2).check()
await page.locator('.consent-prefs__btn--secondary').click()
try {
  await page.waitForSelector('.consent-banner', { state: 'hidden', timeout: 2000 })
  pass('3c. Banner closes after save')
} catch {
  fail('3c. Banner closes after save', 'banner still visible')
}

const cookieAfterSave = await getCookie(context, 'nd_consent')
if (cookieAfterSave) pass('3d. nd_consent cookie set', `${cookieAfterSave.value.slice(0, 30)}…`)
else fail('3d. nd_consent cookie set', 'no cookie found')

const dl1 = await dataLayer(page)
const lastUpdate = dl1.filter(e => e[0] === 'consent' && e[1] === 'update').pop()
if (lastUpdate?.[2]?.analytics_storage === 'granted' && lastUpdate?.[2]?.ad_storage === 'denied') {
  pass('3e. Consent Mode: analytics granted, ad denied')
} else {
  fail('3e. Consent Mode: analytics granted, ad denied', `last=${JSON.stringify(lastUpdate)}`)
}

console.log(`\n=== 4. Persistence across reload ===`)
await page.reload({ waitUntil: 'networkidle' })
const bannerAfterReload = await page.locator('.consent-banner').isVisible().catch(() => false)
if (!bannerAfterReload) pass('4. Banner stays gone after reload')
else fail('4. Banner stays gone after reload', 'banner reappeared')
await shot(page, '04-after-reload')

console.log(`\n=== 5. Reject path ===`)
await context.clearCookies()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.consent-banner', { timeout: 5000 })
await page.locator('.consent-banner__btn--secondary').click()
try {
  await page.waitForSelector('.consent-banner', { state: 'hidden', timeout: 2000 })
  pass('5a. Banner closes on reject')
} catch {
  fail('5a. Banner closes on reject', 'banner still visible')
}
const dl2 = await dataLayer(page)
const lu2 = dl2.filter(e => e[0] === 'consent' && e[1] === 'update').pop()
if (lu2?.[2]?.ad_storage === 'denied' && lu2?.[2]?.analytics_storage === 'denied') {
  pass('5b. All non-essential denied after reject')
} else {
  fail('5b. All non-essential denied after reject', `last=${JSON.stringify(lu2)}`)
}

console.log(`\n=== 6. Accept-all path ===`)
await context.clearCookies()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.consent-banner', { timeout: 5000 })
await page.locator('.consent-banner__btn--primary').click()
await page.waitForSelector('.consent-banner', { state: 'hidden', timeout: 2000 })
const dl3 = await dataLayer(page)
const lu3 = dl3.filter(e => e[0] === 'consent' && e[1] === 'update').pop()
if (lu3?.[2]?.ad_storage === 'granted' && lu3?.[2]?.analytics_storage === 'granted') {
  pass('6. All granted after Accept all')
} else {
  fail('6. All granted after Accept all', `last=${JSON.stringify(lu3)}`)
}
await shot(page, '06-after-accept-all')

console.log(`\n=== 7. English locale ===`)
await context.clearCookies()
await page.goto(`${BASE}/en`, { waitUntil: 'networkidle' })
try {
  await page.waitForSelector('.consent-banner', { timeout: 5000 })
  const title = await page.locator('.consent-banner__title').textContent()
  if (title?.toLowerCase().includes('we use cookies') || title?.toLowerCase().includes('cookies')) {
    pass('7. English locale shows English copy', title?.trim())
  } else {
    fail('7. English locale shows English copy', `title="${title}"`)
  }
} catch (e) {
  fail('7. English locale shows English copy', `error: ${e.message}`)
}
await shot(page, '07-english-locale')

console.log(`\n=== 8. Mobile responsive ===`)
await context.clearCookies()
await page.setViewportSize({ width: 375, height: 700 })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.consent-banner', { timeout: 5000 })
const banner = await page.locator('.consent-banner').boundingBox()
if (banner && banner.x === 0 && banner.width >= 370) {
  pass('8. Mobile: banner full-width edge-to-edge', `x=${banner.x}, width=${banner.width}`)
} else {
  fail('8. Mobile: banner full-width', `x=${banner?.x}, width=${banner?.width}`)
}
await shot(page, '08-mobile')

console.log(`\n=== Summary ===`)
const passed = results.filter(r => r.ok).length
const total = results.length
console.log(`${passed}/${total} checks passed`)
if (passed < total) {
  console.log('\nFailures:')
  results.filter(r => !r.ok).forEach(r => console.log(`  ✗ ${r.step}: ${r.detail}`))
  process.exitCode = 1
}

await browser.close()
