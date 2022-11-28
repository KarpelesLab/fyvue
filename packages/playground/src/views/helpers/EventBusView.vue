<script setup></script>
<template>
  <KlbPage
    pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
    :showFooter="false"
    forceSlug="helpers-eventBus"
    :breadcrumbBase="$route.meta.breadcrumb ? $route.meta.breadcrumb : []"
  />
  <div class="fv-typo doc-contained margins flex-1">
    <h2>Usage</h2>
    <!-- prettier-ignore --><FvHL><pre>// composition API
import { useEventBus } from "@karpeleslab/fyvue"
const eventBus = useEventBus();
eventBus.emit('xxx',()=>{});
eventBus.on('xxx',()=>{});

// option API
this.$eventBus.emit('xxx',()=>{});
this.$eventBus.on('xxx'),()=>{});</pre></FvHL>
    <p>Don't forget to unregister events!</p>
    <!-- prettier-ignore --><FvHL><pre>const yo = () => { console.log('Yo world!'); }
onMounted(() => {
  eventBus.on('yo', yo)
})
onUnmounted(() => {
  eventBus.off('yo', yo)
})</pre></FvHL>
    <p>Or the lazy way...</p>
    <!-- prettier-ignore --><FvHL><pre>router.afterEach(() => { eventBus.all.clear() }) // ** mesad **</pre></FvHL>
  </div>
</template>
