import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CliVersion from './CliVersion.vue'
import VersionBadge from './VersionBadge.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-top': () => h(VersionBadge)
    })
  },
  enhanceApp({ app }) {
    app.component('CliVersion', CliVersion)
  }
}
