<script setup>
const klbLogin = `
<KlbBillingHistory />
`;
const props = [];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbBillingHistory />
    </template>
  </FyDocPreview>
</template>
