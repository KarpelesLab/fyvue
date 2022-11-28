<script setup>
import ComponentIndex from '@/componentIndex';
</script>
<template>
  <RouterView />
  <div class="doc-contained fv-typo my-5 flex-1">
    <FyBreadcrumb
      :nav="$route.meta.breadcrumb"
      v-if="$route.path == '/components/ui'"
    />
    <div
      :class="
        $route.path == '/components/ui'
          ? 'card-container card-defaults mt-4'
          : ''
      "
    >
      <h1 v-if="$route.path == '/components/ui'" class="font-bold">
        UI Components
      </h1>
      <h2 v-else class="font-bold">
        <RouterLink to="/components/ui">UI Components</RouterLink>
      </h2>
      <p>Collection of Vue components (using TailwindCSS).</p>
      <nav class="bg-fv-neutral-100 rounded p-2 dark:bg-fv-neutral-900 w-full">
        <ul class="flex flex-wrap !list-none items-center justify-start w-full">
          <li v-for="(c, i) in ComponentIndex.ui" :key="`${i.toString()}_${c}`">
            <router-link :to="`/components/ui/${c}`"> {{ c }} </router-link
            ><span v-if="i != ComponentIndex.ui.length - 1">,&nbsp;</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
