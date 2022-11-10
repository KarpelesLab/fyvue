# KLB SSR

Edit your ```vite.config.(ts|js)``` and configure ```vue``` options:
```ts
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
```

Create a ```vite.config.noexternal.(ts|js)``` in your working directory.
```ts
const config = require("./vite.config.ts"); // <-- Base vite config file

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
});

```
Wrap your createApp in ```main.(ts|js)``` into a function, for example:
```ts
import { createSSRApp, createApp as createRegularApp } from "vue";
import { createFyvue, helpers } from "@karpeleslab/fyvue";
import {
    createRouter,
    createWebHistory,
    createMemoryHistory,
} from "vue-router";
import { getPrefix } from "@karpeleslab/klbfw";
// < Import routes, styles, App, plugins etc...

export const createApp = async (isSSR = false) => {
    const fyvue = createFyvue();
    const app = isSSR ? createSSRApp(App) : createRegularApp(App);
    const router = createRouter({
        history: import.meta.env.SSR
          ? createMemoryHistory(getPrefix())
          : createWebHistory(getPrefix()),
        routes,
      });
      
    app.use(router);
    app.use(fyvue);
    
    return { app, router, head: helpers.head };
}
```

Create a ```entry-client.js``` in ```src/```
```js
import { createApp } from "./main.ts";
import { getInitialState } from "@karpeleslab/klbfw";

const isSSRRendered = () => {
  const state = getInitialState()
  return !!(state && state.isSSRRendered == true)
}

createApp(isSSRRendered()).then(({ app, router }) => {  
  router.isReady().then(() => {
    app.mount("#app");
  });
});
```

Create a ```entry-server.js``` in ```src/```
```js
import { handleSSR } from "@karpeleslab/fyvue";
import { createApp } from "./main.ts";

export async function render(cb) {
  await handleSSR(createApp, cb, { 
    'routerNotFound': 'notFound', // <- 404 router route name
    'router404Route': '/404' // <- Default 404 path
    }
  );
}
```

Add this to your ```registry.ini```
```ini
; ssr
Javascript_Dist_Dir=dist/client
Javascript_SSR_Bundle=dist/server/entry-server.js
Javascript_SSR_Endpoint=exports.render
Javascript_Manifest=dist/client/ssr-manifest.json
```
and this to you ```registry_dev.ini```
```ini
; ssr
Javascript_Manifest=
```

Change your package.json scripts accordingly, this is what I use:
```json
"scripts": {
  "dev": "vite --force --port 3000",
  "build": "yarn run build:client && yarn run build:server:noExternal",
  "build:client": "vue-tsc --noEmit && vite build --ssrManifest --outDir dist/client",
  "build:server": "vue-tsc --noEmit && vite build --ssr src/entry-server.js --outDir dist/server",
  "build:server:noExternal": "vue-tsc --noEmit && vite build --config vite.config.noexternal.ts --ssr src/entry-server.js --outDir dist/server",
  "typecheck": "vue-tsc --noEmit",
  "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore"
},
```


**SSR should be active /o/**
