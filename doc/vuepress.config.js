import { defaultTheme, defineUserConfig } from 'vuepress'

export default  defineUserConfig({
  lang: 'en-US',
  title: 'fyvue',
  description: 'Vue lib for KLB systems',
  theme: defaultTheme({
    base: "/",
    logo: '/fyvue.svg',
    colorMode: "dark",
    colorModeSwitch: false,
    repo: 'KarpelesLab/fyvue',

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
        ]
      },
      {
        text: 'Components',
        collapsable: false,
        children: [
          '/components/FyModal.md',
          '/components/FyCirclePercent.md',
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
