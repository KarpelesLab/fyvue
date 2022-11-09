import { defaultTheme, defineUserConfig } from 'vuepress'
import { tocPlugin } from '@vuepress/plugin-toc'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

let klbComps = [
  '/components/KlbLogin.md',
]
klbComps.sort()
let comps = [
  '/components/FyModal.md',
  '/components/FyCirclePercent.md',
  '/components/FySteps.md',
  '/components/FyBreadcrumb.md',
  '/components/FyConfirm.md',
  '/components/FyDatatable.md',
  '/components/FyTable.md',
  '/components/FyLoader.md',
  '/components/FyInput.md',
  '/components/FyPaging.md'
]
comps.sort()
let helpers = [
  '/helpers/eventBus.md',
  '/helpers/style.md',
  '/helpers/KLBi18next.md',
//  '/helpers/KLBCountries.md',
  '/helpers/KLBtemplate.md',
  '/helpers/KLBTypes.md',
  '/helpers/KLBSSR.md'
]
helpers.sort()

export default  defineUserConfig({
  head: [['link', { rel: 'icon', href: '/fyvue/fyvue.svg' }]],
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
        children: helpers
      },
      {
        text: 'KLB Components',
        collapsable: false,
        children: klbComps
      },
      {
        text: 'Components',
        collapsable: false,
        children: comps,
      },
    ],
  }),
  plugins: [
    tocPlugin(),
    searchPlugin(),
    backToTopPlugin(),
  ]
})
