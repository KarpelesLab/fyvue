# fyvue

Vue lib for KLB systems

## Install

```shell
    yarn add @karpeleslab/fyvue
```

## Activate plugin in Vue

In main.ts\/js:

```ts
    import { createFyvue } from "@karpeleslab/fyvue";
    import { createApp } from "vue";
    const app = createApp(App);
    const fyvue = createFyvue();
    app.use(fyvue);
    //...
    app.mount('#app')
```

## With style ;)
Add this to your ```tailwind.config```:
```js
const fyvueColors = require('@karpeleslab/fyvue').tailwindColors
module.exports = {
  //...
  theme: {
    extend: {
      colors: fyvueColors
    },
  },
  //...
}
```

**[Or you can customize the colors yourself](/fyvue/helpers/style.html)** <3
