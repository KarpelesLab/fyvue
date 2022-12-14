<script setup lang="ts">
import IndexViewVue from './components/IndexView.vue';
import { useFVStore, useSeo } from '@karpeleslab/fyvue';
import { ref } from 'vue';
useSeo(
  ref({
    description:
      'fyvue is a Vue Plugin providing components, helpers for Vue, Tailwind, vite-ssr, KLB APIs, and more. At some point in the future, it will do my job for me.',
  })
);
</script>
<template>
  <KlbPage
    pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
    :showFooter="false"
    forceSlug="getting-started"
  />
  <div class="fv-typo doc-contained margins">
    <div
      class="font-medium p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100"
      role="alert"
    >
      <p class="text-lg">
        This documentation is not up to date. You should check starters
        templates instead:
        <br />fyvue ->
        <a href="https://github.com/fyvue/fyvue" class="a" target="_blank"
          >https://github.com/fyvue/fyvue</a
        >
        <br />fyvue + klb ->
        <a href="https://github.com/fyvue/klb-starter" class="a" target="_blank"
          >https://github.com/fyvue/klb-starter</a
        >
      </p>
    </div>
    <h2>Getting started</h2>
    <p>First you'll need to install <b>fyvue</b>.</p>
    <!-- prettier-ignore --><FvHL lang="bash"><pre>yarn add @karpeleslab/fyvue</pre></FvHL>
    <p>Then activate <b>fyvue</b> plugin in <code>main.ts</code></p>

    <!-- prettier-ignore --><FvHL><pre>import { createFyvue } from "@karpeleslab/fyvue";
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
    <!-- prettier-ignore --><FvHL><pre>const colors = require("tailwindcss/colors");
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
    <!-- prettier-ignore --><FvHL><pre>"types": ["vite/client", "@karpeleslab/fyvue/dist/components"],</pre></FvHL>
  </div>
  <div class="fv-typo doc-contained">
    <h2>Components List</h2>
    <p>List of all documented fyvue components.</p>
    <IndexViewVue />
  </div>
</template>
