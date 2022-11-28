<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import Error404View from '@/views/Error404View.vue';
import ComponentIndex from '@/componentIndex';

const route = useRoute();

const allowedCompos = import.meta.glob('./**/*.vue');

const getInnerComponent = computed(() => {
  const src = `./${route.meta.category}/${route.params.slug}View.vue`;
  console.log(src);
  const comp = defineAsyncComponent({
    loader: allowedCompos[src],
    errorComponent: Error404View,
    timeout: 3000,
  });

  return comp;
});
</script>
<template>
  <main class="comp-view flex-grow">
    <KlbPage
      pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
      :showFooter="false"
      :breadcrumbBase="[
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        {
          name: $route.meta.category.toUpperCase(),
          to: '/components/' + $route.meta.category,
        },
        { name: $route.params.slug },
      ]"
    />

    <div class="doc-contained">
      <component :is="getInnerComponent" />
    </div>
  </main>
</template>
