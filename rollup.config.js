import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
//import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'
import cleanup from 'rollup-plugin-cleanup';
import dts from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/fyvue.scss',
    plugins: [
      scss({
        output: 'dist/fyvue.scss',
      }),
    ]
  },
  {
    input: "./src/dts/index.d.ts",
    output: [{ file: "dist/dts/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
  {
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
      resolve(),
      peerDepsExternal(),
      vue(),
      typescript({
        tsconfig: 'src/tsconfig.json',
        tsconfigOverride: {
          "compilerOptions": {
            "noUnusedLocals": false,
          },
          include: [
            "../typings/env.d.ts",
            "../typings/components.d.ts",
          ]
        }
      }),
      copy({
        targets: [
          { src: 'src/package.fyvue.json', dest: 'dist/', rename: "package.json" },
          { src: 'typings/components.d.ts', dest: 'dist/dts', transform: (contents, filename) =>
          {
            return contents.toString().replaceAll('../src/', '@karpeleslab/fyvue')
          }
        },
        ]
      }),
      cleanup()
    ],
  }];
