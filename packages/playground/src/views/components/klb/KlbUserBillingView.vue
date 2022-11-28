<script setup>
const klbLogin = `
<KlbUserBilling />
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
      <KlbUserBilling />
    </template>
  </FyDocPreview>
</template>
