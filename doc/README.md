# Get started with fyvue

Fyvue is a Vue Plugin for KLB systems

## Install

```shell
    yarn add @karpeleslab/fyvue@alpha
```

Then activate fyvue plugin in ```main.(ts|js)```

```ts
    import { createFyvue } from "@karpeleslab/fyvue";
    import { createApp } from "vue";
    const app = createApp(App);
    const fyvue = createFyvue();
    app.use(fyvue);
    //...
    app.mount('#app')
```

Add this to your ```tailwind.config.(js|cjs)```:
```js
// for fyvue theme: const fyvueColors = require('@karpeleslab/fyvue')['helpers']['tailwindColors']
const colors = require('tailwindcss/colors')

module.exports = {
  //...
  theme: {
    extend: {
      // fyvue theme > colors: fyvueColors
      colors: {
        "fv-primary": colors.blue,
        "fv-neutral": colors.neutral,
      }
    },
  },
  //...
}
```

For typescript support add ```@karpeleslab/fyvue/dist/components``` to types in your ```tsconfig.json```
```json
    "types": ["vite/client", "@karpeleslab/fyvue/dist/components"],
```

