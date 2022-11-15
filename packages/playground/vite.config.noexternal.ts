import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { SchemaOrg } from '@vueuse/schema-org-vite';

const fyvueRoot = '../fyvue/dist';

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    noExternal: /./,
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [
    vue({
      template: {
        ssr: true,
        compilerOptions: {
        },
        transformAssetUrls: {
          img: ['src'],
        },
      },
    }),
    SchemaOrg(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@karpeleslab/fyvue': fileURLToPath(new URL(fyvueRoot, import.meta.url)),
    },
  },
});
