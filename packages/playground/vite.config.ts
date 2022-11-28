import { fileURLToPath, URL } from 'url';
//import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { SchemaOrg } from '@vueuse/schema-org-vite';
import Vue from 'unplugin-vue/vite';

const fyvueRoot = '../fyvue/src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
    },
  },
});
