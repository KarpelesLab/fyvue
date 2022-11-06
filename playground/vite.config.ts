import { fileURLToPath, URL } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
const pkgRoot = path.resolve('../dist');

export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: /^@karpeleslab\/fyvue(\/(es|lib))?$/,
        replacement: path.resolve(pkgRoot, 'fyvue.mjs'),
      },
      {
        find: /^@karpeleslab\/fyvue\/fyvue.scss(\/(es|lib))?$/,
        replacement: path.resolve(pkgRoot, 'fyvue.scss'),
      },
    ]
  }
})
