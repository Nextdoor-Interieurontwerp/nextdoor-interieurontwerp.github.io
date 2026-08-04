/**
 * End-to-end check of the URL-addressable lightbox against the built site.
 *
 * The requirement: a visitor clicking a project tile must NOT navigate to the
 * project page — the lightbox opens over the grid — while crawlers still see a
 * real <a href> to a real page.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOT = new URL('./.output/public', import.meta.url).pathname
const TYPES = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
    '.txt': 'text/plain', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml',
}

const server = createServer(async (req, res) => {
    const path = decodeURIComponent(req.url.split('?')[0])
    for (const candidate of [join(ROOT, path), join(ROOT, path, 'index.html')]) {
        try {
            if (!(await stat(candidate)).isFile()) continue
            const body = await readFile(candidate)
            res.writeHead(200, { 'content-type': TYPES[extname(candidate)] ?? 'application/octet-stream' })
            return res.end(body)
        } catch { /* try next */ }
    }
    res.writeHead(404, { 'content-type': 'text/html' })
    res.end('not found')
})

await new Promise(resolve => server.listen(0, resolve))
const base = `http://localhost:${server.address().port}`

const results = []
const check = (name, pass, detail = '') => {
    results.push({ name, pass, detail })
    console.log(`  ${pass ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage()
const errors = []
page.on('pageerror', e => errors.push(e.message))
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })

try {
    // --- The grid page and its links -------------------------------------
    await page.goto(`${base}/particulier`, { waitUntil: 'networkidle' })

    const tiles = page.locator('a.project-item')
    const tileCount = await tiles.count()
    check('grid renders project tiles as <a>', tileCount > 0, `${tileCount} tiles`)

    const firstHref = await tiles.first().getAttribute('href')
    check('tile href points at a project page', /^\/projects\/[a-z0-9-]+$/.test(firstHref ?? ''), firstHref)

    // --- Plain click opens the lightbox, does not navigate ----------------
    await tiles.first().click()
    await page.waitForTimeout(400)

    const lightboxVisible = await page.locator('.lightbox-overlay').isVisible().catch(() => false)
    check('plain click opens the lightbox', lightboxVisible)

    const gridStillPresent = await page.locator('.project-grid').count() > 0
    check('visitor stays on the grid page (no navigation)', gridStillPresent)

    const urlAfterClick = new URL(page.url()).pathname
    check('URL becomes the project URL', urlAfterClick === firstHref, urlAfterClick)

    const lightboxTitle = await page.locator('.lightbox-info h2').textContent().catch(() => null)
    check('lightbox shows the project title', Boolean(lightboxTitle?.trim()), lightboxTitle?.trim())

    // --- Back button closes it and restores the grid URL ------------------
    await page.goBack()
    await page.waitForTimeout(400)
    const lightboxClosed = !(await page.locator('.lightbox-overlay').isVisible().catch(() => false))
    check('browser back closes the lightbox', lightboxClosed)
    check('browser back restores the grid URL', new URL(page.url()).pathname === '/particulier', new URL(page.url()).pathname)

    // --- Close button ------------------------------------------------------
    await tiles.first().click()
    await page.waitForTimeout(300)
    await page.locator('.close-btn').click()
    await page.waitForTimeout(400)
    check('close button closes the lightbox',
        !(await page.locator('.lightbox-overlay').isVisible().catch(() => false)))
    check('close button restores the grid URL', new URL(page.url()).pathname === '/particulier', new URL(page.url()).pathname)

    // --- Modified click must NOT hijack ------------------------------------
    await page.locator('a.project-item').first().click({ modifiers: ['Meta'] })
    await page.waitForTimeout(300)
    check('cmd+click does not open the lightbox (leaves new-tab intact)',
        !(await page.locator('.lightbox-overlay').isVisible().catch(() => false)))

    // --- Direct entry renders the standalone page --------------------------
    const direct = await page.goto(`${base}${firstHref}`, { waitUntil: 'networkidle' })
    check('project URL responds 200 for a direct visit', direct?.status() === 200, String(direct?.status()))
    const h1 = await page.locator('h1').first().textContent()
    check('standalone project page renders a heading', Boolean(h1?.trim()), h1?.trim())
    const hasImg = await page.locator('img.project-image').count() > 0
    check('standalone page renders the project photo', hasImg)
    const altText = await page.locator('img.project-image').getAttribute('alt')
    check('photo carries descriptive alt text', (altText?.length ?? 0) > 30, altText?.slice(0, 60) + '…')
    const backHref = await page.locator('a.back-link').getAttribute('href')
    check('standalone page links back to the overview', Boolean(backHref), backHref)

    // --- EN locale ---------------------------------------------------------
    await page.goto(`${base}/en/zakelijk`, { waitUntil: 'networkidle' })
    const enHref = await page.locator('a.project-item').first().getAttribute('href')
    check('EN grid links to EN project URLs', enHref?.startsWith('/en/projects/'), enHref)

    check('no JavaScript errors during the run', errors.length === 0, errors.slice(0, 2).join(' | '))
} finally {
    await browser.close()
    server.close()
}

const failed = results.filter(r => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
