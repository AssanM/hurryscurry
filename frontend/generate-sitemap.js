import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const sitemap = new SitemapStream({ hostname: 'https://hurry-scurry.com' })
const writeStream = createWriteStream('./dist/sitemap.xml')

sitemap.pipe(writeStream)

// добавь сюда все нужные маршруты
sitemap.write({ url: '/' })
sitemap.write({ url: '/collection' })
sitemap.write({ url: '/contact' })

sitemap.end()

writeStream.on('finish', () => {
  console.log('✅ sitemap.xml сгенерирован в /dist')
})