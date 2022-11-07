import { defaultTheme, defineUserConfig } from 'vuepress'
import { tocPlugin } from '@vuepress/plugin-toc'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default  defineUserConfig({
  lang: 'en-US',
  title: 'fyvue',
  description: 'Vue lib for KLB systems',
  base: "/fyvue/",
  theme: defaultTheme({
    logo: '/fyvue.svg',
    colorMode: "dark",
    colorModeSwitch: false,
    repo: 'KarpelesLab/fyvue',
    editLink: false,
    navbar: [
      /*{
        text: 'Helpers',
        link: '/helpers',
      },*/
    ],
    sidebar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Helpers',
        collapsable: false,
        children: [
          '/helpers/eventBus.md',
          '/helpers/style.md',
          '/helpers/i18next.md',
          '/helpers/KLBCountries.md',
          '/helpers/klb-template.md'
        ]
      },
      {
        text: 'Components',
        collapsable: false,
        children: [
          '/components/FyModal.md',
          '/components/FyCirclePercent.md',
          '/components/FySteps.md',
          '/components/FyBreadcrumb.md',
          '/components/FyConfirm.md',
          '/components/FyDatatable.md',
          '/components/FyTable.md'
        ],
      },
      {
        text: 'KLB Components',
        collapsable: false,
      },
      {
        text: 'SSR',
        collapsable: false
      }
    ],
  }),
  plugins: [
    tocPlugin(),
    searchPlugin(),
    backToTopPlugin(),
  ]
})
