import Vue from 'unplugin-vue/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import cleanup from 'rollup-plugin-cleanup';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const pkg = require('./package.json');
const name = pkg.name;

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Florian Gasquez <m@fy.to>
  * @license MIT
  */`;

const globals = {};

export default [
  {
    input: './src/index.ts',
    output: [{ file: 'dist/dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        inlineDynamicImports: true,
        format: 'cjs',
        sourcemap: true,
        file: 'dist/dist/fyhead.js',
        name: 'fyhead',
        globals: globals,
        banner: banner,
      },
      {
        inlineDynamicImports: true,
        format: 'es',
        sourcemap: true,
        file: 'dist/dist/fyhead.mjs',
        globals: globals,
        banner: banner,
      },
    ],
    plugins: [
      peerDepsExternal(),
      Vue({
        isProduction: true,
        sourceMap: false,
        template: {
          ssr: true,
        },
      }),
      esbuild({
        tsconfig: 'tsconfig.json',
        minifySyntax: true,
        target: 'es2018',
        platform: 'neutral',
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
        ],
      }),
      cleanup(),
      resolve(),
    ],
  },
];
