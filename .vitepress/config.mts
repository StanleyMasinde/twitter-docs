import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Twitter CLI',
  description: 'Tweet without going to twitter.com. Install, configure, and use Twitter CLI from your terminal.',
  lang: 'en-US',
  cleanUrls: true,
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
