import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'

export default {
  input: './src/index.ts',
  output: [
    /*
    {
      format: 'umd',
      sourcemap: true,
      file: "./dist/fyvue.umd.js",
      name: "fyvue",
    },*/
    {
      format: 'es',
      sourcemap: true,
      file: "./dist/fyvue.mjs",
    },
    {
      format: 'cjs',
      sourcemap: true,
      file: "./dist/fyvue.js",
    }
  ],
  plugins: [
    vue(),
    resolve(),
    peerDepsExternal(),
    typescript({
      check: false // disable typechecks if necessary
    }),
    scss({
      output: './dist/fyvue.scss',
    }),
    copy({
      targets: [
        { src: 'src/package.fyvue.json', dest: 'dist/', rename:"package.json" },
      ]
    })
  ],
};
