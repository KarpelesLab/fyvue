<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <div class="fv-typo">
    <h1 class="font-bold mt-2">CSS Components</h1>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <router-link
        v-for="(c, i) in ComponentIndex.css"
        :key="`${i.toString()}_${c}`"
        :to="`/components/css/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
  </div>
</template>
