# fyvue

Vue lib for KLB systems

## Install

```shell
    yarn add @karpeleslab/fyvue
```

In main.ts or main.js:
```ts
    import { createFyvue } from "@karpeleslab/fyvue";
    import { createApp } from "vue";
    const app = createApp(App);
    const fyvue = createFyvue();
    app.use(fyvue);
    //...
    app.mount('#app')
```
