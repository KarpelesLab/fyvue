<script setup>
/*
import { useFyHead } from '@fy-/head';
useFyHead().addMeta('bbbbbbbbbbbbb', 'tazeawhatzezz');*/
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
