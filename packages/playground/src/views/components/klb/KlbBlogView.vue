<script setup>
const klbLogin = `
<KlbBlog siteName="fyvue" :breadcrumbBase="[{ name: 'fyvue', to: '/' }]" />
`;
const props = [];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <div class="fv-typo">
        <p>
          Check <RouterLink to="/blog">fyvue's blog</RouterLink> for example.
        </p>
      </div>
    </template>
  </FyDocPreview>
</template>
