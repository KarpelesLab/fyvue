import scss from 'rollup-plugin-scss';
import vue from '@vitejs/plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

const banner = `
/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} Florian "Fy" Gasquez
 * Released under the MIT License
 */
`;

function createEntry(options) {
  const { format, input } = options;

  const config = {
    input,
    external: [
      'vue',
      '@vue/compiler-dom',
      '@karpeleslab/klbfw',
      '@heroicons/vue/24/solid',
      '@headlessui/vue',
      'i18next',
      '@vue/server-renderer',
      '@vuelidate/core',
      '@vuelidate/validators',
      '@vueuse/core',
      'pinia',
      'vue-router',
    ],
    plugins: [
      vue({
        isProduction: true,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      scss({
        name: 'fyvue.scss',
        fileName: 'fyvue.css',
        sass: require('sass'),
        verbose: false,
      }),
      typescript(),
      esbuild({
        exclude: [],
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
        define: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        treeShaking: true,
        legalComments: 'eof',
        tsconfig: 'tsconfig.json', // default
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
              _contents = _contents
                .toString()
                .replaceAll(/"scripts": {([\S\s]+)}/gm, '"scripts": {}\n}');
              return _contents;
            },
          },
          { src: '../../README.md', dest: 'dist/', rename: 'README.md' },
          {
            src: 'src/dts/components.d.ts',
            dest: 'dist/dist/',
            transform: (contents, filename) => {
              let _contents = contents
                .toString()
                .replaceAll('../index', '@karpeleslab/fyvue');
              _contents = _contents.replaceAll(
                '../utils/helpers',
                '@karpeleslab/fyvue'
              );

              return _contents;
            },
          },
        ],
      }),
      cleanup(),
    ],
    output: {
      banner,
      name: 'fyvue',
      file: 'dist/fyvue.js',
      format,
      globals: {
        vue: 'Vue',
        '@vue/compiler-dom': 'VueCompilerDOM',
        '@headlessui/vue': 'headlessUI',
        '@karpeleslab/klbfw': 'klbfw',
        i18next: 'i18next',
        '@heroicons/vue/24/solid': 'heroIcons',
        '@vuelidate/core': 'vValidateC',
        '@vuelidate/validators': 'vValidateV',
        '@vueuse/core': 'vueuseC',
        pinia: 'pinia',
        'vue-router': 'vr',
      },
    },
  };

  if (format === 'es') {
    config.output.file = 'dist/dist/fyvue.mjs';
  }
  if (format === 'cjs') {
    config.output.file = 'dist/dist/fyvue.js';
  }
  console.log(`Building ${format}: ${config.output.file}`);

  return config;
}

export default [
  createEntry({ format: 'es', input: 'src/index.ts' }),
  createEntry({ format: 'cjs', input: 'src/index.ts' }),
  /*
  {
    input: './src/index.ts',
    output: [{ file: 'dist/dist/index.d.ts', format: 'es' }],
    external: [
      'vue',
      '@vue/compiler-dom',
      '@karpeleslab/klbfw',
      '@heroicons/vue/24/solid',
      '@headlessui/vue',
      'i18next',
      '@vue/server-renderer',
      '@vuelidate/core',
      '@vuelidate/validators',
      '@vueuse/core',
      'pinia',
    ],
    globals: {
      vue: 'Vue',
      '@vue/compiler-dom': 'VueCompilerDOM',
      '@headlessui/vue': 'headlessUI',
      '@karpeleslab/klbfw': 'klbfw',
      i18next: 'i18next',
      '@heroicons/vue/24/solid': 'heroIcons',
      '@vuelidate/core': 'vValidateC',
      '@vuelidate/validators': 'vValidateV',
      '@vueuse/core': 'vueuseC',
      pinia: 'pinia',
    },
    plugins: [
      vue({
        isProduction: true,
      }),
      scss({
        name: 'fyvue.scss',
        fileName: 'fyvue.css',
        sass: require('sass'),
        verbose: false,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      typescript(),
    ],
  },*/
];
