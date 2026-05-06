// Live verification against the deployed site. gtag.js loading is blocked so
// no test events flow into the customer's real Google Ads account — but the
// browser still tries to load it, and our code still pushes into dataLayer,
// which is exactly what we want to assert.

import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'https://nextdoorinterieurontwerp.nl'

const results = []
function pass(step, detail = '') { results.push({ step, ok: true, detail }); console.log(`✓ ${step}${detail ? ' — ' + detail : ''}`) }
function fail(step, detail) { results.push({ step, ok: false, detail }); console.log(`✗ ${step} — ${detail}`) }

const dataLayer = (page) =>
  page.evaluate(() => Array.from(window.dataLayer || []).map(e => Array.from(e)))

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })

// Block any actual call to Google's tag servers — we never want to fire real
// conversions during automated checks.
const blockedRequests = []
await context.route(/googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net/i, (route) => {
  blockedRequests.push(route.request().url())
  route.abort()
})

const page = await context.newPage()
page.on('console', m => {
  if (m.type() === 'error' || m.type() === 'warning') console.log(`[browser ${m.type()}]`, m.text())
})
page.on('pageerror', err => console.log('[page error]', err.message))

console.log(`\n=== 1. Live page loads + banner shows ===`)
await page.goto(BASE, { waitUntil: 'domcontentloaded' })
try {
  await page.waitForSelector('.consent-banner', { timeout: 8000 })
  pass('1. Banner visible on first visit')
} catch {
  fail('1. Banner visible on first visit', 'consent-banner not found')
  await browser.close()
  process.exit(1)
}

console.log(`\n=== 2. Consent Mode default-deny stub present ===`)
const dl0 = await dataLayer(page)
const hasDefault = dl0.some(e => e[0] === 'consent' && e[1] === 'default' && e[2]?.ad_storage === 'denied')
if (hasDefault) pass('2. dataLayer has Consent Mode v2 default-deny entry')
else fail('2. dataLayer has Consent Mode v2 default-deny entry', `dl=${JSON.stringify(dl0).slice(0, 150)}`)

console.log(`\n=== 3. Accept all triggers gtag.js load attempt + Consent Mode update ===`)
await page.screenshot({ path: '/tmp/live-before-accept.png' })
const acceptBtn = page.locator('.consent-banner__btn--primary')
console.log(`   button text: "${(await acceptBtn.textContent())?.trim()}"`)
console.log(`   button visible: ${await acceptBtn.isVisible()}`)
await acceptBtn.click()
await page.waitForTimeout(1000)
await page.screenshot({ path: '/tmp/live-after-accept.png' })
const stillVisible = await page.locator('.consent-banner').isVisible().catch(() => false)
console.log(`   banner still visible after click: ${stillVisible}`)
if (stillVisible) {
  const dlNow = await dataLayer(page)
  console.log(`   dataLayer entries: ${dlNow.length}`)
  console.log(`   last 3 entries: ${JSON.stringify(dlNow.slice(-3))}`)
}
await page.waitForSelector('.consent-banner', { state: 'hidden', timeout: 5000 })
await page.waitForTimeout(500) // give @nuxt/scripts a beat to inject the gtag.js script tag

const gtagAttempted = blockedRequests.some(u => u.includes('googletagmanager.com/gtag/js') && u.includes('AW-1048537913'))
if (gtagAttempted) pass('3a. gtag.js for AW-1048537913 was requested (and blocked by test)')
else fail('3a. gtag.js for AW-1048537913 was requested', `blocked=${JSON.stringify(blockedRequests)}`)

const dl1 = await dataLayer(page)
const lu1 = dl1.filter(e => e[0] === 'consent' && e[1] === 'update').pop()
if (lu1?.[2]?.ad_storage === 'granted' && lu1?.[2]?.analytics_storage === 'granted') {
  pass('3b. Consent Mode update granted all')
} else {
  fail('3b. Consent Mode update granted all', `lu=${JSON.stringify(lu1)}`)
}

console.log(`\n=== 4. Home page view conversion fires ===`)
const dl2 = await dataLayer(page)
const hasHomeView = dl2.some(e =>
  e[0] === 'event' && e[1] === 'conversion' && e[2]?.send_to?.endsWith('De97CO64yKgcELnW_fMD')
)
if (hasHomeView) pass('4. homePageView conversion in dataLayer')
else fail('4. homePageView conversion in dataLayer', 'no matching event found')

console.log(`\n=== 5. Phone tap conversion fires on tel: click ===`)
await page.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(300)
const telLink = await page.locator('a[href^="tel:"]').first()
if (!(await telLink.count())) {
  fail('5. Phone tap conversion fires', 'no tel: link found on /contact')
} else {
  await telLink.click({ trial: false })
  await page.waitForTimeout(300)
  const dl3 = await dataLayer(page)
  const hasPhone = dl3.some(e =>
    e[0] === 'event' && e[1] === 'conversion' && e[2]?.send_to?.endsWith('Y7OwCNWxyKgcELnW_fMD')
  )
  if (hasPhone) pass('5. phoneTap conversion in dataLayer')
  else fail('5. phoneTap conversion in dataLayer', `dl=${JSON.stringify(dl3.slice(-3))}`)
}

console.log(`\n=== 6. Email click conversion fires on mailto: click ===`)
const mailtoLink = await page.locator('a[href^="mailto:"]').first()
if (!(await mailtoLink.count())) {
  fail('6. Email click conversion fires', 'no mailto: link found on /contact')
} else {
  await mailtoLink.click({ modifiers: ['Alt'] }) // alt-click prevents OS handler
  await page.waitForTimeout(300)
  const dl4 = await dataLayer(page)
  const hasEmail = dl4.some(e =>
    e[0] === 'event' && e[1] === 'conversion' && e[2]?.send_to?.endsWith('G8W_COu4yKgcELnW_fMD')
  )
  if (hasEmail) pass('6. emailClick conversion in dataLayer')
  else fail('6. emailClick conversion in dataLayer', `dl=${JSON.stringify(dl4.slice(-3))}`)
}

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
