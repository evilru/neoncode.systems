import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NEONCODE!",
  description: "//neoncode.systems",
  base: '/',
  cleanUrls: true,
  srcExclude: ['discovery/**'],
  head: [
    ['meta', { name: 'author', content: 'Martin Haberfellner' }],
    ['meta', { name: 'keywords', content: 'AI, prompts, prompt engineering, experiments, systems engineering, organizational systems' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'neoncode.systems' }],
    ['meta', { property: 'og:title', content: 'neoncode.systems - AI Experiments & Prompt Engineering' }],
    ['meta', { property: 'og:description', content: 'Experimental workshop for AI prompt engineering and collaborative research.' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'neoncode.systems - AI Experiments & Prompt Engineering' }],
    ['meta', { name: 'twitter:description', content: 'Experimental workshop for AI prompt engineering and collaborative research.' }],
    ['link', { rel: 'canonical', href: 'https://neoncode.systems/' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  rewrites: {
  'LICENSE.md': 'legal/license.md',
  'CHANGELOG.md': 'version/changelog.md',
  'RELEASE_NOTES.md': 'version/releasenotes.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/evilru/neoncode.systems/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    nav: [
      { text: '//proto.labs', link: '/proto.labs/index.md' },
      { text: '//prompt.forge', link: '/prompt.forge/index.md' },
      // {
      //   text: 'Legal',
      //   items: [
      //     { text: 'Imprint', link: '/imprint.md' },
      //     { text: 'Privacy', link: '/privacy.md' },
      //     { text: 'License', link: '/LICENSE.md' }
      //   ]
      // }
    ],
    footer: {
      message: 'Human 🤝 AI collaboration',
      copyright: '&copy; 2025 Martin Haberfellner · All Rights Reserved | <a href="/legal/imprint">Imprint</a> | <a href="/legal/privacy">Privacy</a> | <a href="/legal/license">License</a>'
    },
    sidebar: {
      '/version': [
        {
          text: 'Version',
          items: [
            { text: 'Release Notes', link: '/version/releasenotes.md' },
            { text: 'Changelog', link: '/version/changelog.md' }
          ]
        }
      ],
      '/legal/': [
        {
          text: 'Legal',
          items: [
            { text: 'Imprint', link: '/legal/imprint.md' },
            { text: 'Privacy', link: '/legal/privacy.md' },
            { text: 'License', link: '/legal/license.md' }
          ]
        }
      ],
      '/proto.labs/': [
        {
          text: '//proto.labs',
          items: [
            { text: 'Overview', link: '/proto.labs/index.md' },
          ]
        }
      ],
      '/prompt.forge/': [
        {
          text: '//prompt.forge',
          items: [
            { text: 'Overview', link: '/prompt.forge/index.md' },
          ]
        }
      ]
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/evilru/neoncode.systems' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/martin-haberfellner-b3119515a/' }
    ]
  }
})
