<template>
  <div class="fv-typo">
    <h1>Klb <b>SSR</b></h1>
    <p>
      Let's start by editing the vite config <small>(vite.config.js)</small>
    </p>
    <FvHL><pre>{
  //...
  plugins: [
    vue({
      template: {
        ssr: true,
        compilerOptions: {},
        transformAssetUrls: {
          img: ["src"],
        },
      },
    }),
  ],
}</pre></FvHL>

    <p>Create a <b>vite.config.noexternal.js</b> in your vue directory.</p>
    <FvHL><pre>const config = require("./vite.config.js"); // Base vite config file
module.exports = Object.assign(config.default, {
  ssr: {
    noExternal: /./,
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});</pre></FvHL>
  <p>Wrap your createApp in <b>main.js</b> into a function, for example:</p>
  <FvHL><pre>import { createSSRApp, createApp as createRegularApp } from 'vue';
import { createFyvue } from '@karpeleslab/fyvue';
import { getPrefix } from '@karpeleslab/klbfw';
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
// Import routes, plugins, css etc...

import App from './AppSuspender.vue';

export const createApp = async (isSSR = false) => {
  const head = createHead();
  const pinia = createPinia();
  const fyvue = createFyvue();
  const app = isSSR ? createSSRApp(App) : createRegularApp(App);
  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(getPrefix())
      : createWebHistory(getPrefix()),
    routes,
  });

  app.use(router);
  app.use(head);
  app.use(pinia);
  app.use(fyvue);
  // ...
  return { app, router, head, pinia };
};</pre></FvHL>
  <p>Create a <b>entry-client.js</b> in src/</p>
<FvHL><pre>import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';

createApp(helpersSSR.isSSRRendered()).then(({ app, router, pinia }) => {
  router.isReady().then(() => {
    helpersSSR.setupClient(router, pinia); // This will restore pinia state & hydrate if SSR.
    app.mount('#app');
  });
});</pre></FvHL>
  <p>Create a <b>entry-server.js</b> in src/</p>
<FvHL><pre>import { helpersSSR } from '@karpeleslab/fyvue';
import { createApp } from './main';

export async function render(cb) {
  await helpersSSR.handleSSR(createApp, cb, {});
}</pre></FvHL>
<p>Add this to your <b>etc/registry.ini</b></p>
<FvHL lang="ini"><pre>Javascript_Dist_Dir=dist/client
Javascript_SSR_Bundle=dist/server/entry-server.js
Javascript_SSR_Endpoint=exports.render
Javascript_Manifest=dist/client/ssr-manifest.json</pre></FvHL>
<p>and this to you <b>etc/registry_dev.ini</b></p>
<FvHL lang="ini"><pre>Javascript_Manifest=</pre></FvHL>
<p>Change your <b>package.json</b> scripts accordingly, this is what I use:</p>
<FvHL><pre>{
  //...
  "scripts": {
    "dev": "vite --force --port 3000",
    "build": "yarn run build:client && yarn run build:server:noExternal",
    "build:client": "vue-tsc --noEmit && vite build --ssrManifest --outDir dist/client",
    "build:server": "vue-tsc --noEmit && vite build --ssr src/entry-server.js --outDir dist/server",
    "build:server:noExternal": "vue-tsc --noEmit && vite build --config vite.config.noexternal.ts --ssr src/entry-server.js --outDir dist/server",
    "typecheck": "vue-tsc --noEmit",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore"
  }
}</pre></FvHL>
</div>

</template>
