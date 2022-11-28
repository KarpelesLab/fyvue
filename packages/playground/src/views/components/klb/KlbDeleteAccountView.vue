<script setup>
const klbLogin = `
<KlbDeleteAccount />
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
      <KlbDeleteAccount />
    </template>
  </FyDocPreview>
</template>
