<script setup lang="ts">
import App from './App.vue';
</script>
<template>
  <Suspense>
    <template #default><App /></template>
    <template #fallback><div>Loading...</div></template>
  </Suspense>
</template>
