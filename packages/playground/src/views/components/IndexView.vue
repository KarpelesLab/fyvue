<script setup>
import IndexViewKlb from './klb/IndexView.vue';
import IndexViewUI from './ui/IndexView.vue';
import IndexViewMisc from './misc/IndexView.vue';
</script>
<template>
  <div class="doc-contained flex-1 fv-typo mt-4">
    <FyBreadcrumb :nav="$route.meta.breadcrumb" v-if="$route.meta.breadcrumb" />
    <div
      :class="$route.meta.breadcrumb ? 'card-container card-defaults mt-4' : ''"
    >
      <h1 v-if="$route.meta.breadcrumb" class="font-bold">Components Index</h1>
      <IndexViewUI />
      <IndexViewKlb />
      <IndexViewMisc />
    </div>
  </div>
</template>
