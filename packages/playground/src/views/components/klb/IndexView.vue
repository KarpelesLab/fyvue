<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <div class="fv-typo">
    <h1 class="font-bold mt-2">Klb Components</h1>
    <div class="link-group">
      <router-link
        v-for="(c, i) in ComponentIndex.klb"
        :key="`${i.toString()}_${c}`"
        :to="`/components/klb/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
  </div>
</template>
