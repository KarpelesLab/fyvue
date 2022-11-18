<script setup>
const klbLogin = `
<KlbBillingHistory />
`;
const props = [];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbBillingHistory</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <KlbBillingHistory />
    </template>
  </FyDocPreview>
</template>
