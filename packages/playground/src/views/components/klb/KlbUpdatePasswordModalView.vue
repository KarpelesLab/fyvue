<script setup>
const klbLogin = `
<KlbUpdatePasswordModal />
`;
const props = [
  {
    name: 'showValueButton?',
    type: 'boolean',
    info: 'Show value and button (in case you want to do the template youself)',
    def: 'true',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbUpdatePasswordModal</h1>
    <p>Opens a modal to change user password.</p>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUpdatePasswordModal />
    </template>
  </FyDocPreview>
</template>
