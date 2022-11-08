import { fileURLToPath, URL } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const fyvueRoot = path.resolve('../src');



export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    "process.env": {live: true},
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: /^@karpeleslab\/fyvue(\/(es|lib))?$/,
        replacement: path.resolve(fyvueRoot, 'index.ts'),
      },
      {
        find: /^@karpeleslab\/fyvue\/fyvue.scss(\/(es|lib))?$/,
        replacement: path.resolve(fyvueRoot, 'fyvue.scss'),
      },
    ]
  }
})
