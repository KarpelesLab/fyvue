import { fileURLToPath, URL } from 'url';
//import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { SchemaOrg } from '@vueuse/schema-org-vite';
import vue from '@vitejs/plugin-vue';

const fyvueRoot = '../fyvue/src';
const fyHeadRoot = '../fyhead/src/';

// https://vitejs.dev/config/
export default defineConfig({
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
      '@fy/head': fileURLToPath(new URL(fyHeadRoot, import.meta.url)),
    },
  },
});
