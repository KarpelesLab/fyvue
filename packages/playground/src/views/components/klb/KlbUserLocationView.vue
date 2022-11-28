<script setup>
const klbLogin = `
<KlbUserLocation />
`;
const props = [
  {
    name: 'login',
    def: '/login',
    info: 'Login URL',
    type: 'string',
  },
];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUserLocation />
    </template>
  </FyDocPreview>
</template>
