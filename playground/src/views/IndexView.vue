<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
</script>
<template>
  <div v-highlight>
    <pre
      class="language-bash"
    ><code>yarn add @karpeleslab/fyvue@alpha</code></pre>
  </div>
  <p>Then activate <b>fyvue</b> plugin in <code>main.ts</code></p>

  <div v-highlight>
    <pre
      class="language-javascript"
    ><code>import { createFyvue } from "@karpeleslab/fyvue";
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from "vue";
const app = createApp(App);
const fyvue = createFyvue();
app.use(head);
app.use(pinia);
app.use(fyvue);
//...
app.mount('#app')</code></pre>
  </div>
</template>
