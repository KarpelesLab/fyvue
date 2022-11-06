import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss'

export default {
  input: './src/index.ts',
  output: [
    /*{
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
    vue({ css: true, compileTemplate: true }),
    resolve(),
    peerDepsExternal(),
    typescript({
      check: false // disable typechecks if necessary
    }),
    scss({
      output: './dist/fyvue.scss',
      //include: ['./src/**/*.scss'],
    })
  ],
};