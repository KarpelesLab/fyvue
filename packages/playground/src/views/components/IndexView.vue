<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <div class="fv-typo">
    <h1 class="font-bold mt-2">Components Index</h1>

    <h2 class="font-bold">
      <router-link to="/components/ui">UI Components</router-link>
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <router-link
        v-for="(c, i) in ComponentIndex.ui"
        :key="`${i.toString()}_${c}`"
        :to="`/components/ui/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
    <h2 class="font-bold mt-4">
      <router-link to="/components/klb">Klb Components</router-link>
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <router-link
        v-for="(c, i) in ComponentIndex.klb"
        :key="`${i.toString()}_${c}`"
        :to="`/components/klb/${c}`"
      >
        {{ c }}
      </router-link>
    </div>
    <h2 class="font-bold mt-4">
      <router-link to="/components/css">CSS Components</router-link>
    </h2>
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
