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
  <div class="fv-typo mb-2">
    <h1>KlbUserLocation</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUserLocation />
    </template>
  </FyDocPreview>
</template>
