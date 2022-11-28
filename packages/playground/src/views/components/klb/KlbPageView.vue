<script setup>
const klbLogin = `
<KlbPage pagesAlias="@pages" />
`;
const props = [];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <p>Nothing to see here.</p>
    </template>
  </FyDocPreview>
</template>
