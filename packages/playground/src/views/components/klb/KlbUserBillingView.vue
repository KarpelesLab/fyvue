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
  <div class="fv-typo mb-2">
    <h1>KlbUserBilling</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUserBilling />
    </template>
  </FyDocPreview>
</template>
