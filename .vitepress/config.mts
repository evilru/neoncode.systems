import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NEONCODE!",
  description: "//neoncode.systems",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '//proto.labs', link: '/proto.labs/index.md' },
      { text: '//prompt.forge', link: '/prompt.forge/index.md' }
    ],

    sidebar: [
      {
        text: 'Navigation',
        items: [
          { text: '//proto.labs', link: '/proto.labs/index.md' },
          { text: '//prompt.forge', link: '/prompt.forge/index.md' }
        ]
      },
      {
        text: 'Legal',
        items: [
          { text: 'Imprint', link: '/imprint.md' },
          { text: 'Privacy', link: '/privacy.md' },
          { text: 'License', link: 'LICENSE.md' }
        ]
      }
    ],

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
