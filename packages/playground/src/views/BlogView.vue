<script setup>
import { useFyHead } from '@fy/head';
import { useHead } from '@vueuse/head';
useHead({ meta: { property: 'ccccccccc', content: 'azeazeze' } });
useFyHead().addMeta('bbbbbbbbbbbbb', 'tazeawhatzezz');
</script>
<template>
  <Suspense>
    <KlbBlog
      siteName="fyvue"
      :breadcrumbBase="[{ name: 'fyvue', to: '/' }]"
      class="is-blog"
    />
  </Suspense>
</template>
