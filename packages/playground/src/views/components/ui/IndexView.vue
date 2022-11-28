<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <RouterView />
  <div class="doc-contained fv-typo my-5 flex-1">
    <h1 v-if="$route.path == '/components/ui'" class="font-bold mt-2">
      UI Components
    </h1>
    <h2 v-else class="font-bold mt-2">UI Components</h2>

    <nav class="bg-fv-neutral-100 rounded p-2 dark:bg-fv-neutral-900 w-full">
      <ul class="flex flex-wrap !list-none items-center justify-start w-full">
        <li v-for="(c, i) in ComponentIndex.ui" :key="`${i.toString()}_${c}`">
          <router-link :to="`/components/ui/${c}`"> {{ c }} </router-link
          ><span v-if="i != ComponentIndex.ui.length - 1">,&nbsp;</span>
        </li>
      </ul>
    </nav>
  </div>
</template>
