<script setup>
import { useSeo, useTranslation } from '@karpeleslab/fyvue';
import { ref } from 'vue';
const translate = useTranslation();
useSeo(ref({ title: 'Contact - Fyvue' }));
</script>
<template>
  <div class="doc-contained flex-1 fv-typo mt-4">
    <FyBreadcrumb :nav="$route.meta.breadcrumb" />
    <div class="card-container card-defaults mt-4">
      <h1 class="font-bold">Contact</h1>
      <KlbSupport to="@support" />
    </div>
  </div>
</template>
<script setup></script>
