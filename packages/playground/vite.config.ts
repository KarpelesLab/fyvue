import { fileURLToPath, URL } from 'url';
//import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import nodePolyfills from "rollup-plugin-node-polyfills";

const fyvueRoot = '../fyvue/src';

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
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      //'@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
});
