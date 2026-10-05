import { defineConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const siteUrl = 'https://twitter.stanleymasinde.com'
const legacyPages = new Set(['api-examples.md', 'markdown-examples.md'])

export default defineConfig({
  title: 'Twitter CLI',
  description: 'Tweet without going to twitter.com. Install, configure, and use Twitter CLI from your terminal.',
  lang: 'en-US',
  cleanUrls: true,
  srcExclude: ['README.md'],
  buildEnd({ outDir }) {
    writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
  },
  sitemap: {
    hostname: siteUrl,
    transformItems: (items) => items.filter((item) => !legacyPages.has(`${item.url}.md`))
  },
  transformHead({ page, title, description }) {
    const isNotFound = page === '404.md'
    const isLegacyPage = legacyPages.has(page)
    const path = page === 'index.md' ? '/' : `/${page.replace(/\.md$/, '')}`
    const canonicalUrl = !isNotFound && !isLegacyPage ? `${siteUrl}${path}` : undefined

    return [
      ...(isNotFound ? [] : [
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Twitter CLI' }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:image', content: `${siteUrl}/og-image.png` }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }],
        ['meta', { property: 'og:image:type', content: 'image/png' }],
        ['meta', { property: 'og:image:alt', content: 'Twitter CLI documentation: Tweet without going to twitter.com.' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: title }],
        ['meta', { name: 'twitter:description', content: description }],
        ['meta', { name: 'twitter:image', content: `${siteUrl}/og-image.png` }],
        ['meta', { name: 'twitter:image:alt', content: 'Twitter CLI documentation: Tweet without going to twitter.com.' }]
      ] as const),
      ...(canonicalUrl ? [
        ['link', { rel: 'canonical', href: canonicalUrl }],
        ['meta', { property: 'og:url', content: canonicalUrl }]
      ] as const : []),
      ...(isNotFound || isLegacyPage ? [
        ['meta', { name: 'robots', content: 'noindex,follow' }]
      ] as const : [])
    ]
  },
  appearance: false,
  head: [
    ['meta', { name: 'theme-color', content: '#f7f9fc' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap' }]
  ],
  themeConfig: {
    siteTitle: 'Twitter CLI',
    nav: [
      { text: 'Get started', link: '/guide/get-started' },
      { text: 'Tweet', link: '/guide/tweet' },
      { text: 'Examples', link: '/guide/examples' },
      { text: 'Schedule', link: '/guide/schedule' },
      { text: 'Commands', link: '/guide/commands' },
      { text: 'GitHub ↗', link: 'https://github.com/StanleyMasinde/twitter' }
    ],
    sidebar: [
      { text: 'Start here', items: [
        { text: 'Get started', link: '/guide/get-started' },
        { text: 'Configuration and authentication', link: '/guide/configuration' }
      ] },
      { text: 'Write', items: [
        { text: 'Tweet and write threads', link: '/guide/tweet' },
        { text: 'Unix examples', link: '/guide/examples' },
        { text: 'Schedule tweets', link: '/guide/schedule' }
      ] },
      { text: 'Read and manage', items: [
        { text: 'Read and search tweets', link: '/guide/read' },
        { text: 'Account actions', link: '/guide/account' },
        { text: 'Lists', link: '/guide/lists' },
        { text: 'Direct messages', link: '/guide/messages' },
        { text: 'Filtered streams', link: '/guide/streams' }
      ] },
      { text: 'Help', items: [
        { text: 'Command reference', link: '/guide/commands' },
        { text: 'Troubleshooting', link: '/guide/troubleshooting' }
      ] }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/StanleyMasinde/twitter' }],
    footer: { message: 'Tweet without going to twitter.com.', copyright: 'Twitter CLI · MIT License' },
    search: { provider: 'local' }
  }
})
