# EventBus

Shortcut to **[mitt](https://github.com/developit/mitt)** (event emitter / pubsub)

## Composition API

```ts
    import { useEventBus } from "@karpeleslab/fyvue"
    const eventBus = useEventBus();
    eventBus.emit('xxx',()=>{});
    eventBus.on('xxx',()=>{});
```

## Standard API

```ts
    this.$eventBus.emit('xxx',()=>{});
    this.$eventBus.on('xxx'),()=>{});
```
