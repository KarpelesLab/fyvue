<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <div>
    <RouterView v-slot="{ Component }">
      <Suspense timeout="0">
        <template #default><component :is="Component" /></template>
        <template #fallback><div>Loading...</div></template>
      </Suspense>
    </RouterView>
  </div>
  <div class="fv-typo mt-5">
    <h1 class="font-bold mt-2">UI</h1>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <router-link
        v-for="(c, i) in ComponentIndex.ui"
        :key="`${i.toString()}_${c}`"
        :to="`/components/ui/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
  </div>
</template>
