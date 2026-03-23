import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Helper function to generate sidebar items from directory
function getSidebarItems(dir: string, basePath: string) {
  const files = fs.readdirSync(dir)
    .filter((name) => name.endsWith('.md') && name !== 'index.md')
    .map((name) => {
      const title = name
        .replace('.md', '')
        .replace(/\.prompt$/, '')
        .split(/[-.]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return {
        text: title,
        link: `${basePath}${name}`
      }
    })
  
  return files
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NEONCODE!",
  description: "LLMs don't follow instructions. They resonate with fields.",
  base: '/',
  cleanUrls: true,
  appearance: 'dark',
  srcExclude: ['discovery/**', 'tmp_cv/**', 'tmp_prompt.forge/**', 'draft/**'],
  head: [
    ['meta', { name: 'author', content: 'Martin Haberfellner' }],
    ['meta', { name: 'keywords', content: 'behaviour priming, AI, prompt engineering, semantic fields, systems thinking, LLM' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'neoncode.systems' }],
    ['meta', { property: 'og:title', content: 'neoncode.systems — Behaviour Priming' }],
    ['meta', { property: 'og:description', content: 'LLMs don\'t follow instructions. They resonate with fields. Behaviour Priming by Martin Haberfellner.' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'neoncode.systems — Behaviour Priming' }],
    ['meta', { name: 'twitter:description', content: 'LLMs don\'t follow instructions. They resonate with fields. Behaviour Priming by Martin Haberfellner.' }],
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
    // siteTitle: 'NC!',
    siteTitle: 'NEONCODE!',
    externalLinkIcon: true,
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
      { text: '//behaviour.priming', link: '/behaviour.priming/index.md' },
      // { text: '//thinking', link: '/thinking/index.md' },
      { text: '//proto.labs', link: '/proto.labs/index.md' },
      { text: '//prompt.forge', link: '/prompt.forge/index.md' },
    ],
    footer: {
      message: '<a href="/martin-haberfellner">About</a> | <a href="/legal/imprint">Imprint</a> | <a href="/legal/privacy">Privacy</a> | <a href="/legal/license">License</a>',
      copyright: '&copy; 2026 Martin Haberfellner · All Rights Reserved'
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
          link: '/proto.labs/index.md',
          items: [
            ...getSidebarItems('proto.labs', '/proto.labs/')
          ]
        }
      ],
      '/prompt.forge/': [
        {
          text: '//prompt.forge',
          items: [
            ...getSidebarItems('prompt.forge', '/prompt.forge/')
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
