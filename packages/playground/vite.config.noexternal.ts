import config from './vite.config.bundle';
import { SchemaOrg } from '@vueuse/schema-org-vite';
import vue from '@vitejs/plugin-vue';

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
