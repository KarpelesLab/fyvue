<script setup>
const fvComponent = `<ClientOnly><p>This is not render via SSR</p></ClientOnly>`;
const props = [];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <div class="flex">
        <ClientOnly><p>This is not render via SSR</p></ClientOnly>
      </div>
    </template>
  </FyDocPreview>
</template>
