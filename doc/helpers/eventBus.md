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

## Unregister events

```ts
  //...
  const yo = () => { console.log('Yo world!'); }
  onMounted(() => {
    eventBus.on('yo', yo)
  })
  onUnmounted(() => {
    eventBus.off('yo', yo)
  })
```
Or to be safe you could just do:

```ts
  router.afterEach(() => { eventBus.all.clear() })
  // ** but it's ugly **
```
