<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <div class="fv-typo">
    <h1 class="font-bold mt-2">Components Index</h1>

    <h2 class="font-bold">UI Components</h2>
    <div class="link-group">
      <router-link
        v-for="(c, i) in ComponentIndex.ui"
        :key="`${i.toString()}_${c}`"
        :to="`/components/ui/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
    <h2 class="font-bold mt-2">Klb Components</h2>
    <div class="link-group">
      <router-link
        v-for="(c, i) in ComponentIndex.klb"
        :key="`${i.toString()}_${c}`"
        :to="`/components/klb/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
    <h2 class="font-bold mt-2">CSS Components</h2>
    <div class="link-group">
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
