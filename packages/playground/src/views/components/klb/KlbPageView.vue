<script setup>
const klbLogin = `
<KlbPage  />
`;
const props = [];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbPage</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <KlbPage />
    </template>
  </FyDocPreview>
</template>
