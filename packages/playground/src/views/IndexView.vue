<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
</script>
<template>
  <div class="fv-typo">
    <h1>Getting started</h1>
    <p>First you'll need to install <b>fyvue</b>.</p>
    <div v-highlight>
      <pre class="language-bash"><code>yarn add @karpeleslab/fyvue@alpha</code></pre>
    </div>
    <p>Then activate <b>fyvue</b> plugin in <code>main.ts</code></p>

    <div v-highlight>
      <pre class="language-javascript"><code>import { createFyvue } from "@karpeleslab/fyvue";
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

    <p>A little bit of <b>Tailwind</b> config is required for <b>fyvue</b> to work correctly.</p>
    <div v-highlight>
      <pre class="language-javascript"><code>const colors = require("tailwindcss/colors");
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
};</code></pre>
    </div>
    <p>For <b>typescript</b> you can add the following to your <code>tsconfig.json</code></p>
    <div v-highlight>
      <pre class="language-json"><code>"types": ["vite/client", "@karpeleslab/fyvue/dist/components"],
</code></pre>
    </div>
  </div>
  <!--
  <div class="fv-typo">
    <h1>This is a h1</h1>
    <p>This is a p. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec tellus metus. Aenean vel libero blandit lorem rhoncus lacinia. Phasellus feugiat metus sit amet magna vulputate viverra. Nam efficitur dapibus sodales.</p>
    <h2>This is a h2</h2>
    <blockquote>What Is Grief, If Not Love Persevering (blockquote)</blockquote>
    <h3>This is a h3</h3>
    <ul>
      <li>
          This is a list
      </li>
      <li>
          And this is an element
      </li>
      <li>
          Form that list
      </li>
    </ul>
    <h4>This is a h4</h4>
    <p>This is a p with links. Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit. Nulla nec tellus metus. Aenean <a href="#">vel</a> libero blandit lorem rhoncus lacinia. <a href="#">Phasellus</a> feugiat metus sit amet magna vulputate viverra. Nam efficitur dapibus sodales.</p>
    <h5>This is a h5</h5>
    <p>This is a with a hr after. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec tellus metus. Aenean vel libero blandit lorem rhoncus lacinia. Phasellus feugiat metus sit amet magna vulputate viverra. Nam efficitur dapibus sodales.</p>
    <hr />
    <p>This is a p. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec tellus metus. Aenean vel libero blandit lorem rhoncus lacinia. Phasellus feugiat metus sit amet magna vulputate viverra. Nam efficitur dapibus sodales.</p>

    <h6>This is a h6</h6>
  </div>-->
</template>
