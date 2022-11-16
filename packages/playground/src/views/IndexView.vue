<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
</script>
<template>
  <div class="fv-typo">
    <h1>About <b>fyvue</b></h1>
    <p>
      <b>fyvue</b> is a Vue Plugin providing components, helpers for Vue,
      Tailwind, vite-ssr, <b>KLB</b> APIs, and more.
      <small>At some point in the future, it will do my job for me.</small>
    </p>
    <h2>Getting started</h2>
    <p>First you'll need to install <b>fyvue</b>.</p>
    <div v-highlight>
      <pre
        class="language-bash"
      ><code>yarn add @karpeleslab/fyvue@alpha</code></pre>
    </div>
    <p>Then activate <b>fyvue</b> plugin in <code>main.ts</code></p>

    <FvHL><pre>import { createFyvue } from "@karpeleslab/fyvue";
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from "vue";
const app = createApp(App);
const fyvue = createFyvue();
app.use(head);
app.use(pinia);
app.use(fyvue);
//...
app.mount('#app')</pre></FvHL>

    <p>
      A little bit of <b>Tailwind</b> config is required for <b>fyvue</b> to
      work correctly.
    </p>
    <FvHL><pre>const colors = require("tailwindcss/colors");
module.exports = {
  // add darkMode:"" if you want dark mode support,
  // if not just add class="light" to your index.html.
  darkMode: "class",
  //...
  theme: {
    extend: {
      //...
      colors: {
        "fv-primary": colors.blue, // main color, blue is a good choice ^^
        "fv-neutral": colors.slate, // neutral color slate/gray/bronze/neutral for example
      },
    },
  },
  //...
};</pre></FvHL>

    <p>
      For <b>typescript</b> you can add the following to your
      <code>tsconfig.json</code>
    </p>
    <div v-highlight>
      <pre
        class="language-json"
      ><code>"types": ["vite/client", "@karpeleslab/fyvue/dist/components"],
</code></pre>
    </div>
  </div>
</template>
