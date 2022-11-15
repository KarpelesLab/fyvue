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
  <div class="fv-typo mb-2">
    <h1>KlbDeleteAccount</h1>
    <p>Create a button with a link to /login passing the correct action.</p>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbDeleteAccount />
    </template>
  </FyDocPreview>
</template>
