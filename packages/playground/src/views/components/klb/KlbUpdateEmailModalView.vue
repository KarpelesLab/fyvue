<script setup>
const klbLogin = `
<KlbUpdateEmailModal />
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
  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbUpdateEmailModal />
    </template>
  </FyDocPreview>
</template>
