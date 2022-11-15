<script setup>
const klbLogin = `
<KlbUpdateBillingLocation />
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
    <h1>KlbUpdateBillingLocation</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUpdateBillingLocation />
    </template>
  </FyDocPreview>
</template>
