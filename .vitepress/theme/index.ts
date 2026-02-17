// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VersionBadge from './components/VersionBadge.vue'
import './style.css'

// Read version once at module level
const APP_VERSION = `v${import.meta.env.VITE_APP_VERSION || 'dev'}`

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-content-before': () => h(VersionBadge, { version: APP_VERSION })
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Provide version globally for any component to use
    app.config.globalProperties.$version = APP_VERSION
  }
} satisfies Theme
