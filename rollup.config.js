import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'
import cleanup from 'rollup-plugin-cleanup';
import path from "path"
export default {
  input: 'src/index.ts',
  output: [
    {
      inlineDynamicImports: true,
      format: 'cjs',
      sourcemap: true,
      file: "dist/fyvue.js",
      name: "fyvue",
      globals: {
        '@vueuse/head': 'vhead',
        'vue': 'vue',
        '@headlessui/vue': "hlui",
        '@karpeleslab/klbfw': "klbfw",
        'i18next': 'i18next',
        '@heroicons/vue/24/solid': 'hisol'
      }
    },
    {
      inlineDynamicImports: true,
      format: 'es',
      sourcemap: true,
      file: "dist/fyvue.mjs",
      globals: {
        '@vueuse/head': 'vhead',
        'vue': 'vue',
        '@headlessui/vue': "hlui",
        '@karpeleslab/klbfw': "klbfw",
        'i18next': 'i18next',
        '@heroicons/vue/24/solid': 'hisol'
      }
    },
  ],
  plugins: [
    scss({
      output: 'dist/fyvue.scss',
    }),
    vue(),
    resolve(),
    peerDepsExternal(),
    typescript({
     tsconfig: 'src/tsconfig.json'
    }),
    copy({
      targets: [
        { src: 'src/package.fyvue.json', dest: 'dist/', rename:"package.json" },
      ]
    }),
    cleanup()
  ],
};
