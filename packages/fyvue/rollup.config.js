import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
//import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import cleanup from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');
const name = pkg.name;

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Florian Gasquez <m@fy.to>
  * @license MIT
  */`;

const globals = {
  '@vueuse/head': 'vhead',
  vue: 'vue',
  '@headlessui/vue': 'hlui',
  '@karpeleslab/klbfw': 'klbfw',
  i18next: 'i18next',
  '@heroicons/vue/24/solid': 'hisol',
};

export default [
  {
    input: 'src/fyvue.scss',
    plugins: [
      scss({
        output: 'dist/dist/fyvue.scss',
        sass: require('sass'),
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        inlineDynamicImports: true,
        format: 'cjs',
        sourcemap: true,
        file: 'dist/dist/fyvue.js',
        name: 'fyvue',
        globals: globals,
        banner: banner,
      },
      {
        inlineDynamicImports: true,
        format: 'es',
        sourcemap: true,
        file: 'dist/dist/fyvue.mjs',
        globals: globals,
        banner: banner,
      },
    ],
    plugins: [
      resolve(),
      peerDepsExternal(),
      vue(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      copy({
        targets: [
          {
            src: 'package.json',
            dest: 'dist/',
            rename: 'package.json',
            transform: (contents, filename) => {
              let _contents = contents
                .toString()
                .replaceAll('dist/dist', 'dist');
              _contents = _contents
                .toString()
                .replaceAll(
                  /"devDependencies": {([\S\s]+)}/gm,
                  '"devDependencies": {}\n}'
                );
              return _contents;
            },
          },
          { src: 'README.md', dest: 'dist/', rename: 'README.md' },
          {
            src: 'typings/components.d.ts',
            dest: 'dist/dist/',
            transform: (contents, filename) => {
              let _contents = contents
                .toString()
                .replaceAll('../src', '@karpeleslab/fyvue');
              _contents = _contents.replaceAll(
                '@karpeleslab/fyvue/utils/helpers',
                '@karpeleslab/fyvue/dist/utils/helpers'
              );

              return _contents;
            },
          },
        ],
      }),
      cleanup(),
    ],
  },
];

/*
    "main": "dist/fyvue.js",
  "module": "dist/fyvue.mjs",
  "typings": "dist/index.d.ts",*/
