<template>
    <div class="fv-typo">
      <h1>EventBus</h1>
      <p>Shortcut to <a href="https://github.com/developit/mitt" target="_blank">mitt</a> (event emitter / pubsub)</p>
      <FvHL><pre>// composition API
import { useEventBus } from "@karpeleslab/fyvue"
const eventBus = useEventBus();
eventBus.emit('xxx',()=>{});
eventBus.on('xxx',()=>{});

// option API
this.$eventBus.emit('xxx',()=>{});
this.$eventBus.on('xxx'),()=>{});</pre></FvHL>
<p>Don't forget to unregister events!</p>
<FvHL><pre>const yo = () => { console.log('Yo world!'); }
onMounted(() => {
  eventBus.on('yo', yo)
})
onUnmounted(() => {
  eventBus.off('yo', yo)
})</pre></FvHL>
<p>Or the lazy way...</p>
<FvHL><pre>router.afterEach(() => { eventBus.all.clear() }) // ** mesad **</pre></FvHL>
</div>
</template>
