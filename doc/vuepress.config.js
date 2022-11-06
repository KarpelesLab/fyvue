import { defaultTheme, defineUserConfig } from 'vuepress'

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
          '/helpers/i18next.md',
          '/helpers/KLBCountries.md'
        ]
      },
      {
        text: 'Components',
        collapsable: false,
        children: [
          '/components/FyModal.md',
          '/components/FyCirclePercent.md',
          '/components/FySteps.md',
        ]
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
})
