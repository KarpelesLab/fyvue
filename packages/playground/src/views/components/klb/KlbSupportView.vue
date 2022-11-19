<script setup>
const klbLogin = `
<KlbSupport to="@support" />
`;
const props = [];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbSupport</h1>
  </div>

  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <div><KlbSupport to="fyvue@naka.atonline.com" /></div>
    </template>
  </FyDocPreview>
</template>
