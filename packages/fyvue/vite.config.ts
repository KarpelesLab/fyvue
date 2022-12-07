import type { UserConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
import { fyuiResolver } from '@fy-/ui';
import { fycoreResolver } from '@fy-/core';
const config: UserConfig = {
  plugins: [
    vue(),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/klb/components'],
      resolvers: [fyuiResolver, fycoreResolver],
    }),
    // @ts-ignore
    copy({
      targets: [
        {
          src: 'package.json',
          dest: 'dist/',
          rename: 'package.json',
          transform: (contents) => {
            let _contents = contents.toString();

            //_contents = _contents.replace('"main": ""type": "module",\n', '');
            _contents = _contents.replace(
              '"main": "src/index.ts"',
              '"main": "fyvue.cjs.js"'
            );
            _contents = _contents.replace(
              '"module": "src/index.ts"',
              '"module": "fyvue.es.js"'
            );
            _contents = _contents.replace(
              '"typings": "src/index.ts"',
              '"typings": "index.d.ts"'
            );
            _contents = _contents.replace(
              '"types": "src/index.ts"',
              '"types": "index.d.ts"'
            );
            _contents = _contents.replace(
              '"import": "./src/index.ts"',
              '"import": "./fyvue.es.js"'
            );
            _contents = _contents.replace(
              '"require": "./src/index.ts"',
              '"require": "./fyvue.cjs.js"'
            );
            _contents = _contents.replace(
              '"types": "./src/index.ts"',
              '"types": "./index.d.ts"'
            );
            // @ts-ignore
            _contents = _contents.replaceAll(
              /"devDependencies": {([\S\s]+)}/gm,
              '"devDependencies": {}\n}'
            );
            // @ts-ignore
            _contents = _contents.replaceAll(
              /"scripts": {([\S\s]+)}/gm,
              '"scripts": {}\n}'
            );
            return _contents;
          },
        },
        { src: 'README.md', dest: 'dist/', rename: 'README.md' },
      ],
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@karpeleslab/fyvue',
      formats: ['es', 'cjs'],
      fileName: (format) => `fyvue.${format}.js`,
    },
    rollupOptions: {
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
        '@fy-/head',
        '@fy-/core',
        '@fy-/ui',
      ],
      output: {
        exports: 'named',
        sourcemap: true,
        dir: './dist/',
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
          '@fy-/head': 'fyhead',
          '@fy-/ui': 'fyui',
          '@fy-/core': 'fycore',
        },
      },
    },
    emptyOutDir: false,
  },
};

export default config;
