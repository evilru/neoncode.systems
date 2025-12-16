import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NEONCODE!",
  description: "//neoncode.systems",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
      copyright: '&copy; 2025 Martin Haberfellner · All Rights Reserved | <a href="/imprint">Imprint</a> | <a href="/privacy">Privacy</a> | <a href="/LICENSE">License</a>'
    },
    sidebar: {
      // '/': [
      //   {
      //     text: 'Legal',
      //     items: [
      //       { text: 'Imprint', link: '/imprint.md' },
      //       { text: 'Privacy', link: '/privacy.md' },
      //       { text: 'License', link: '/LICENSE.md' }
      //     ]
      //   }
      // ],
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
