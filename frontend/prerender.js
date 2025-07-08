import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'

const baseUrl = 'https://hurry-scurry.com'
const routes = ['/', '/catalog', '/contact']
const outputDir = './dist'

const renderPage = async (browser, route) => {
  const page = await browser.newPage()
  const url = `${baseUrl}${route}`

  console.log(`🌐 Opening ${url}...`)
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 })
  
await new Promise(resolve => setTimeout(resolve, 3000))

  try {
    // ⏳ Ждём появление <title> и заполнения #root
    await page.waitForSelector('title', { timeout: 5000 })
    await page.waitForFunction(() => {
      const el = document.querySelector('#root')
      return el && el.innerText.trim().length > 0
    }, { timeout: 5000 })
  } catch (err) {
    console.warn(`⚠️ Возможно, контент не успел загрузиться на ${route}: ${err.message}`)
  }

  const html = await page.content()

  if (!html || !html.includes('<title>')) {
    console.warn(`⚠️ Empty or incomplete HTML for ${route}`)
  }

  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  const filePath = path.join(outputDir, filename)

  await fs.writeFile(filePath, html)
  console.log(`✅ Saved: ${filePath}`)
}

const main = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    for (const route of routes) {
      await renderPage(browser, route)
    }
  } catch (e) {
    console.error('❌ Error rendering:', e)
  } finally {
    await browser.close()
  }
}

main()