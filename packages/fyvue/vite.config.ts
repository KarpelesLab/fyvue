import type { UserConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

const path = require('path');

const config: UserConfig = {
  plugins: [
    vue(),
    Components({ dts: 'src/components.d.ts' }),
    // @ts-ignore
    copy({
      targets: [
        {
          src: 'package.json',
          dest: 'dist/',
          rename: 'package.json',
          transform: (contents) => {
            // @ts-ignore
            let _contents = contents.toString().replaceAll('./dist/', './');
            _contents = _contents.replaceAll('dist/', '');
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
          '@fy-/head': 'fh',
        },
      },
    },
    emptyOutDir: false,
  },
};

export default config;
