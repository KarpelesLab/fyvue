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

**[Styling Fyvue](/fyvue/helpers/style.html)**
