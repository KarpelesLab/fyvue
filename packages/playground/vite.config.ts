import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { SchemaOrg } from '@vueuse/schema-org-vite';

const fyvueRoot = '../fyvue/src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        //ssr: true,
        compilerOptions: {
          whitespace: 'preserve',
          // https://github.com/vuejs/vue-next/issues/3298
          // Used so that the compiler doesn't complain about v-maska during SSR transform
          // directiveTransforms: {
          //     'maska': () => { console.log("Nothing in maska") }
          // }
        },
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
    },
  },
});
