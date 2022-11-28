<script setup>
const klbLogin = `
<KlbSupport to="@support" />
`;
const props = [];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <div><KlbSupport to="fyvue@naka.atonline.com" /></div>
    </template>
  </FyDocPreview>
</template>
