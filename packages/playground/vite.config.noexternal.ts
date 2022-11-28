import config from './vite.config.bundle';
//import sitemapPlugin from '../fy-sitemap';
import { SchemaOrg } from '@vueuse/schema-org-vite';
import Vue from 'unplugin-vue/vite';
export default Object.assign(config, {
  plugins: [
    Vue({
      ssr: true,
      template: {
        compilerOptions: {},
        transformAssetUrls: {
          img: ['src'],
        },
      },
    }),
    SchemaOrg({
      mock: false,
      full: false,
      dts: true,
    }),
  ],
  ssr: {
    noExternal: /./,
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true,
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
