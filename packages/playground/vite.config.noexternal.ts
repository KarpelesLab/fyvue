import config from './vite.config.bundle';
import { SchemaOrg } from '@vueuse/schema-org-vite';
import vue from '@vitejs/plugin-vue';
//import sitemapPlugin from '../fy-sitemap';

export default Object.assign(config, {
  plugins: [
    vue({
      template: {
        ssr: true,
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
    /*sitemapPlugin({
      outDir: './dist/server/',
    }),*/
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
